import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { OpenAIService, ChatMessage, AIResponse } from './types';

export class OpenAIServiceImpl implements OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async chat(messages: ChatMessage[], systemPrompt: string): Promise<AIResponse> {
    try {
      // Add instructions for JSON response format
      const jsonInstructions = `
Please provide your response in valid JSON format with the following structure:
{
  "name": "project name or null",
  "description": "project description or null",
  "stack": "technology stack or null",
  "status": {
    "name": "complete or incomplete",
    "description": "complete or incomplete",
    "stack": "complete or incomplete"
  },
  "message": "your response message here"
}`;

      // Prepare messages for OpenAI
      const openAiMessages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: systemPrompt + "\n" + jsonInstructions
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      console.log('Sending messages to OpenAI:', openAiMessages);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: openAiMessages,
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      console.log('Raw OpenAI response:', response);

      // Find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      // Parse the JSON response
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      // Extract project details and message
      const aiResponse: AIResponse = {
        message: parsedResponse.message,
        details: parsedResponse.status ? {
          name: parsedResponse.name,
          description: parsedResponse.description,
          stack: parsedResponse.stack,
          status: parsedResponse.status
        } : undefined
      };

      console.log('Processed AI response:', aiResponse);
      return aiResponse;
    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  async generateSystemPrompt(description: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI system prompt generator. Your task is to create a detailed system prompt based on the project description provided."
          },
          {
            role: "user",
            content: `Generate a system prompt for this project: ${description}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return response;
    } catch (error) {
      console.error('Error generating system prompt:', error);
      throw new Error('Failed to generate system prompt');
    }
  }
}
