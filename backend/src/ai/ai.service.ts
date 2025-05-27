import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AiService {
  private anthropic: Anthropic;

  constructor() {
    const apiKey: string | undefined = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set.');
    }
    this.anthropic = new Anthropic({ apiKey: apiKey });
  }

  async generateNoteFromCode(code: string): Promise<string> {
    try {
      const systemPrompt = `You are an AI assistant helping developers create study cards for code snippets. Generate a clear, concise explanatory note (max 1000 chars) that explains what the code does, highlights key concepts, and uses educational language suitable for studying. Send your plain answer, no need to add a title at the beginning. You can format the text with \n`;

      const msg = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022', // Modèle plus stable
        max_tokens: 1000,
        temperature: 1,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate a note for this code: ${code}`,
              },
            ],
          },
        ],
      });

      if (
        msg.content[0] &&
        msg.content[0].type === 'text' &&
        msg.content[0].text
      ) {
        return msg.content[0].text;
      }

      throw new Error('Unexpected response format from AI');
    } catch (error) {
      console.error('Error in generateNoteFromCode:', error);
      throw error;
    }
  }
}
