'use client';
import { useState } from 'react';
import CardCode from './CardCode';
import { Card } from '@/types/components';
import MiniTag from '../../Tag/MiniTag';
import { useCards } from '@/hooks/useCards';
import CardNote from './CardNote';
import DropDown from '@/components/DropDown/CardDropDown/Dropdown';

function BaseCard({ code, note, tags, id }: Card) {
  const [flipped, setFlipped] = useState(false);
  const { deleteCard } = useCards();

  function handleFlip(): void {
    setFlipped(!flipped);
  }

  async function handleDelete(): Promise<void> {
    try {
      await deleteCard(id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }


  return (
    <div className="flex flex-col items-center h-full ">
      <div className="w-64 bg-white border rounded-md p-4 shadow-md flex flex-col h-full">
        <div className="flex justify-between">
          <div>
            {tags?.map((tag) => (
              <MiniTag key={`key-${tag.name}`} tag={tag.name} />
            ))}
          </div>
          < DropDown handleDelete={handleDelete} cardId={id}/>
        </div>
        <div className="grow">
          {flipped ? (
            <div className="flex flex-col h-full">
              <CardNote note={note} />
              <button
              onClick={handleFlip}
              className="mt-4 bg-blue-500 text-white px-4 py-1 w-full rounded hover:bg-blue-600"
              >
                See Code
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <CardCode code={code} />
              <button
              onClick={handleFlip}
              className="mt-4 bg-blue-500 text-white px-4 py-1 w-full rounded hover:bg-blue-600"
              >
                See Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BaseCard;
