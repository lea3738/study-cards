'use client';

import CardsResetButton from '@/components/Cards/CardsResetButton';
import NewCardButton from '@/components/Cards/NewCardButton';
import StudyButton from '@/components/Cards/StudyButton';
import { resetCardsStatus } from '@/lib/api';
import { useCards } from '@/hooks/useCards';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '@/types/components';
import PreviewCard from '@/components/Cards/BaseCard/PreviewCard';

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const { getCards } = useCards();


  const loadCards = useCallback(async () => {
    try {
      const filteredCards: Card[] = await getCards();
      setCards(filteredCards);
    } catch(e) {
      console.error('Error when getting cards', e);
    }
  }, [getCards]);

  // when cards status is reset  
  const handleReset = async function (): Promise<void> {
    try {
      await resetCardsStatus();
    } catch (error) {
      console.error('Error when getting the cards:', error);
    }
  };

  // get Carddeck when the page first loads
  useEffect(() => {
    loadCards();
  }, [loadCards, cards]);


  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        <StudyButton />
        <CardsResetButton handleReset={handleReset} />
        <NewCardButton />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {cards.map((card) => {
          const cardProps: Card = {
            id: card.id,
            note: card.note,
            code: card.code,
            status: card.status,
            tags: card.tags || [],
          };
          return <PreviewCard key={card.id} {...cardProps} />;
        })}
      </div>
    </div>
  );
}
