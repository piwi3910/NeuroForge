import OpenAI from 'openai';

export class PromptService {
  constructor(private openai: OpenAI) {}

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
