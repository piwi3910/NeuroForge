import { OpenAI } from 'openai';
import { ProjectConfig } from '../types/project';
import { BacklogItem } from '../types/backlog';

export class AIArchitectService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateProjectDescription(projectDetails: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert software architect. Generate a detailed project description in markdown format based on the provided details."
        },
        {
          role: "user",
          content: projectDetails
        }
      ]
    });

    return response.choices[0].message.content || "";
  }

  async generateSystemPrompt(projectDescription: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert software architect. Generate a system prompt that will guide the development of the project based on the provided project description."
        },
        {
          role: "user",
          content: projectDescription
        }
      ]
    });

    return response.choices[0].message.content || "";
  }

  async generateBacklogItems(
    projectDescription: string,
    systemPrompt: string
  ): Promise<BacklogItem[]> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert in agile project management. Based on the project description and system prompt, generate a structured backlog with epics, user stories, and tasks. Format the response as JSON.`
        },
        {
          role: "user",
          content: `Project Description:\n${projectDescription}\n\nSystem Prompt:\n${systemPrompt}`
        }
      ]
    });

    try {
      return JSON.parse(response.choices[0].message.content || "[]");
    } catch (error) {
      console.error("Failed to parse backlog items:", error);
      return [];
    }
  }

  async chat(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert software architect helping to define and structure a software project."
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ]
    });

    return response.choices[0].message.content || "";
  }
}
