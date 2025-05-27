import { generateNoteFromCodeWithAi as generateNoteFromCodeWithAiAPI } from '@/lib/api';
import { useState } from 'react';

export function useAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateNoteFromCodeWithAi(
    code: string,
  ): Promise<string | null> {
    setIsGenerating(true);
    try {
      const note = await generateNoteFromCodeWithAiAPI(code);
      return note;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate note');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }

  return { generateNoteFromCodeWithAi, isGenerating, error };
}
