import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatMessage } from './types';
import { ResponseParser } from './ResponseParser';

export class ChatService {
  constructor(
    private openai: OpenAI,
    private responseParser: ResponseParser
  ) {}

  async chat(messages: ChatMessage[], systemPrompt: string) {
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

      return this.responseParser.parseResponse(response);
    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }
}
