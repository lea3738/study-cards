'use client';

import { useCallback, useRef, useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { UpdateCardDto } from 'shared-types';
import UpdateCardTags from './UpdateCardTags';
import { Tag } from '@/types/components';

interface UpdateCardFormProps {
  id: string;
  code: string;
  note: string;
  tags: Tag[];
}

function UpdateCardForm({ id, code, note, tags }: UpdateCardFormProps) {
  const [updatedCode, setUpdatedCode] = useState<string>(code);
  const [updatedNote, setUpdatedNote] = useState<string>(note);

  const tagNames = tags.map(tag => tag.name);
   
  const updatedTagsRef = useRef<string[]>(tagNames);

  const handleUpdateTagNames = useCallback((tagNames: string[]) => {
    updatedTagsRef.current = tagNames; 
  }, []);

  const { updateCard } = useCards();

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    const updateCardDto: Partial<UpdateCardDto> = {
      code: updatedCode,
      note: updatedNote,
      tagNames: updatedTagsRef.current,
    };
    await updateCard(id, updateCardDto);
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center border rounded shadow-lg border-gray-200 p-4 h-screen bg-white"
      >
        <UpdateCardTags tags={tags} handleUpdateTagNames={handleUpdateTagNames} />
        <div className="flex gap-4 grow">
          <div className="flex flex-col h-full w-64">
            <label htmlFor="code" className="text-lg font-bold mb-2">
              Code
            </label>
            <textarea
              id="code"
              value={updatedCode}
              onChange={(e) => setUpdatedCode(e.target.value)}
              className="grow bg-gray-100 text-sm p-2 rounded overflow-auto resize-none font-mono"
              style={{ fontFamily: 'monospace' }}
            />
          </div>

          <div className="flex flex-col h-full w-64">
            <label htmlFor="note" className="text-lg font-bold mb-2">
              Note
            </label>
            <textarea
              id="note"
              value={updatedNote}
              onChange={(e) => setUpdatedNote(e.target.value)}
              className="grow bg-white border rounded text-sm p-2 overflow-auto resize-none text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Update card
        </button>
      </form>
    </div>
  );
}

export default UpdateCardForm;
