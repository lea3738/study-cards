'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCards } from '@/hooks/useCards';
import UpdateCardTags from './UpdateCardTags';
import { useAI } from '@/hooks/useAI';
import { useSearchParams } from 'next/navigation';

function NewCardForm() {
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');
  const searchParams = useSearchParams();
  const newTagsRef = useRef<string[]>([]);

  // get code from url if present  
  useEffect(() => {
        const codeFromUrl = searchParams.get('code');
        if (codeFromUrl) {
            setCode(decodeURIComponent(codeFromUrl));
        }
  }, [searchParams]);

  const { generateNoteFromCodeWithAi, isGenerating, error } = useAI();

  const handleUpdateTagNames = useCallback((tagNames: string[]) => {
    newTagsRef.current = tagNames;
  }, []);

  const { createCard } = useCards();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createCard({ code, note, tagNames: newTagsRef.current });
  }

  async function handleGenerateNote(): Promise<void> {
    if (code === '') {
      setNote('you must write your code first');
    }

    const generatedNote = await generateNoteFromCodeWithAi(code);
    if (generatedNote) {
      setNote(generatedNote);
    } else {
      setNote('Failed to generate note. Please try again.');
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center border rounded shadow-lg border-gray-200 p-4 h-screen bg-white"
      >
        <UpdateCardTags tags={[]} handleUpdateTagNames={handleUpdateTagNames} />
        <div className="flex gap-4 grow mt-2">
          <div className="flex flex-col h-full w-64">
            <label htmlFor="code" className="text-lg font-bold mb-2">
              Code
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="grow bg-gray-100 text-sm p-2 rounded overflow-auto resize-none font-mono"
              style={{ fontFamily: 'monospace' }}
            />
          </div>

          <div className="flex flex-col h-full w-64">
            <div className="flex justify-between items-start">
              <label htmlFor="note" className="text-lg font-bold mb-2">
                Note
              </label>
              <button
                className="text-xs bg-black text-white px-1 py-1 rounded hover:bg-gray-800"
                type="button"
                onClick={handleGenerateNote}
              >
                Generate with AI
              </button>
            </div>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="grow bg-white border rounded text-sm p-2 overflow-auto resize-none text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Create card
        </button>
      </form>
    </div>
  );
}

export default NewCardForm;
