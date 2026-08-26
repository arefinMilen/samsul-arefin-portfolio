import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  personalDetails,
  servicesData,
  projectsData,
  skillsCategoriesData,
  experienceData,
  certificationsData,
  leadershipData,
} from '@/data/portfolioData';

// Construct system prompt with full knowledge base about Samsul Arefin
const buildSystemInstruction = (): string => {
  const projectsList = projectsData
    .map(
      (p) =>
        `- **${p.title}** (${p.categoryLabel}): ${p.description} (Tech: ${p.tags.join(', ')}). Live URL: ${p.liveUrl || 'N/A'}, GitHub: ${p.githubUrl}`
    )
    .join('\n');

  const skillsList = skillsCategoriesData
    .map(
      (cat) =>
        `* ${cat.title}:\n  Proficient: ${cat.proficient.map((s) => s.name).join(', ')}\n  Familiar: ${cat.familiar.map((s) => s.name).join(', ')}`
    )
    .join('\n');

  const expList = experienceData
    .map(
      (e) =>
        `- **${e.role}** at **${e.company}** (${e.period}) [${e.location}]: ${e.description}. ${e.achievements ? `Key Achievements: ${e.achievements.join('; ')}` : ''}`
    )
    .join('\n');


  const certList = certificationsData
    .map((c) => `- **${c.title}** by ${c.issuer} (${c.period})`)
    .join('\n');

  const leaderList = leadershipData
    .map((l) => `- **${l.role}** - ${l.title} (${l.period}): ${l.highlights.join('; ')}`)
    .join('\n');

  const servicesList = servicesData
    .map((s) => `- **${s.title}**: ${s.shortDesc}`)
    .join('\n');

  return `You are "Arefin AI Assistant", an intelligent AI agent representing Samsul Arefin on his personal portfolio website.
Your role is to assist visitors, recruiters, potential clients, and fellow developers by answering questions about Samsul Arefin's background, expertise, projects, skills, and contact options.

--- SAMUL AREFIN'S PROFILE DATA ---
Name: ${personalDetails.name}
Role: ${personalDetails.role}
Location: ${personalDetails.location}
Bio: ${personalDetails.bio}
Email: ${personalDetails.email}
Phone: ${personalDetails.phone}
GitHub: ${personalDetails.github}
LinkedIn: ${personalDetails.linkedin}
YouTube: ${personalDetails.youtube}
Facebook: ${personalDetails.facebook}
Google Calendar Appointment Link: ${personalDetails.appointmentUrl}

--- SERVICES OFFERED ---
${servicesList}

--- KEY PROJECTS ---
${projectsList}

--- SKILLS & EXPERTISE ---
${skillsList}

--- WORK EXPERIENCE & EDUCATION ---
${expList}

--- CERTIFICATIONS ---
${certList}

--- LEADERSHIP & SOCIAL IMPACT ---
${leaderList}

--- INSTRUCTIONS FOR RESPONSE ---
1. Maintain a professional, welcoming, tech-savvy, and helpful tone.
2. Provide concise, direct answers using Markdown formatting (bullet points, bold text, code blocks when applicable).
3. If visitors ask about hiring, booking a meeting, or scheduling a consultation, highlight Samsul's Google Calendar appointment link: ${personalDetails.appointmentUrl} or email: ${personalDetails.email}.
4. Always present Samsul's achievements accurately according to the profile data above.
5. If asked something unrelated to Samsul, software engineering, web development, or tech, politely redirect the conversation back to Samsul's portfolio and expertise.
`;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback response if GEMINI_API_KEY is not set yet
    if (!apiKey || apiKey.trim() === '') {
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      return NextResponse.json({
        reply: getFallbackResponse(lastUserMsg),
        isFallback: true,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = buildSystemInstruction();

    // Initialize Gemini model (prefer gemini-1.5-flash)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
    });

    // Format chat history for Gemini SDK
    const formattedHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      reply: responseText,
      isFallback: false,
    });
  } catch (error: any) {
    console.error('Error in Gemini Chat Route:', error);
    
    // Provide a graceful error response instead of 500 failure
    return NextResponse.json({
      reply: `I encountered a temporary issue connecting to the AI service. Feel free to contact Samsul directly at **${personalDetails.email}** or schedule a call at [Google Calendar](${personalDetails.appointmentUrl}).`,
      error: error?.message || 'Failed to process request',
    }, { status: 200 });
  }
}

// Fallback logic when GEMINI_API_KEY is not provided
function getFallbackResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  
  if (p.includes('project') || p.includes('work') || p.includes('technova') || p.includes('koolaai') || p.includes('sirajtech')) {
    return `Samsul has built **18+ projects**, featuring high-impact applications like:
- 🛒 **TechnovaMartBD**: Full-stack gadget e-commerce with Next.js 14, Django REST, and PostgreSQL.
- ⚡ **Koolaai**: Multi-LLM AI SaaS combining ChatGPT, Gemini API, and custom image generation.
- 🛡️ **SirajTech**: Multi-role e-commerce platform with Next.js Edge Middleware RBAC.`;
  }

  if (p.includes('skill') || p.includes('stack') || p.includes('claude') || p.includes('mcp') || p.includes('react')) {
    return `Samsul specializes in **Full-Stack Development & Agentic AI Workflows**:
- 🤖 **AI & Agents**: Claude Agent, Antigravity, MCP Tool Calling, Multi-LLM Orchestration.
- 💻 **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion.
- ⚙️ **Backend & DB**: Node.js, Express, Django REST, PostgreSQL, MongoDB, Docker, Nginx.`;
  }

  if (p.includes('contact') || p.includes('hire') || p.includes('book') || p.includes('email') || p.includes('call')) {
    return `You can reach Samsul directly via:
- 📧 **Email**: [samsularefinmilen@gmail.com](mailto:samsularefinmilen@gmail.com)
- 📞 **Phone**: +880 1783076970
- 📅 **Book a Meeting**: [Google Calendar Appointment](${personalDetails.appointmentUrl})
- 🌐 **GitHub**: [github.com/arefinMilen](${personalDetails.github})`;
  }

  return `Hello! I am **Arefin AI Assistant**. Samsul Arefin is a **Software Engineer & Agentic AI Specialist** proficient in Next.js 14, TypeScript, Node.js, and Autonomous AI workflows.

Feel free to ask about his **projects**, **skills**, **work experience**, or **how to book a meeting**!`;
}

