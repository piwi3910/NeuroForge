import { AIResponse } from './types';

export class ResponseParser {
  parseResponse(response: string): AIResponse {
    try {
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
      console.error('Error parsing response:', error);
      throw new Error('Failed to parse AI response');
    }
  }
}
