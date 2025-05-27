import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-note')
  generateNoteFromCode(@Body('code') code: string): Promise<string> {
    if (!code) {
      throw new Error('Code is required');
    }

    return this.aiService.generateNoteFromCode(code);
  }
}
