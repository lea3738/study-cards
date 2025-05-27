'use client';

import CardDeckCard from '@/components/Cards/CardDeck/CardDeckCard';
import HomeButton from '@/components/Cards/HomeButton';
import NavBarMobile from '@/components/NavBar/NavBarMobile';
import { getCards, getCardTagsByCardId, updateCard } from '@/lib/api';
import { Card, Tag } from '@/types/components';
import { useEffect, useState } from 'react';
import { CardStatus, UpdateCardDto } from 'shared-types';

interface DisplayCardProps extends Card {
  handleDismiss: (data: boolean) => void;
}

export default function CardDeckPage() {
  const [cardDeck, setCardDeck] = useState<Card[]>([]);
  const [dismissed, setDismissed] = useState<boolean | null>(null);
  const [currentTags, setCurrentTags] = useState<Tag[]>([]);

  // function to load tags of selected card
  async function loadTagsForCurrentCard() {
    try {
      const tags = await getCardTagsByCardId(cardDeck[0].id);
      setCurrentTags(tags);
    } catch (error) {
      console.error('Error when getting the tags:', error);
    }
  }

  // load initial cardDeck
  useEffect(() => {
    async function loadInitialCards() {
      const initialFilter = { status: CardStatus.READY };

      try {
        const initialCardDeck: Card[] = await getCards(initialFilter);
        setCardDeck(initialCardDeck);
      } catch (e) {
        console.error('Error when getting cards', e);
      }
    }

    loadInitialCards();
  }, []);

  // charge tags everytime the first card changes
  useEffect(() => {
    if (cardDeck.length > 0) {
      loadTagsForCurrentCard();
    }
  }, [cardDeck]);

  // Manage card dismissal state
  // Use effect is called if dismissed status is changed
  useEffect(() => {
    async function handleCardAction() {
      if (
        cardDeck.length === 0 ||
        dismissed === null ||
        dismissed === undefined
      )
        return;
      const displayCard = cardDeck[0];

      if (dismissed === true) {
        // when user knows the card, set card status to dismissed
        try {
          await updateCard(displayCard.id, { status: CardStatus.DISMISSED});

          // Remove first card from the deck
          setCardDeck((prev) => prev.slice(1));
        } catch (error) {
          console.error('Error when updating the card:', error);
        }
      } else {
        // If the user doesn't know the card, move the card to the end
        setCardDeck((prev) => {
          const updatedDeck = [...prev];
          const firstCard = updatedDeck.splice(0, 1)[0];
          return [...updatedDeck, firstCard];
        });
      }

      // set dismissed to null when before next re-rendering
      setDismissed(null);
    }

    handleCardAction();
  }, [dismissed, cardDeck]);

  // sets callback to update dismiss state when the button of the card is clicked
  const handleDismiss = function (data: boolean): void {
    setDismissed(data);
  };

  if (cardDeck.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center">
        <div className="w-64 bg-white border rounded-md p-4 shadow-md flex flex-col justify-center items-center h-full">
          <p className="font-bold">🥳 Congrats, you know it all!</p>
        </div>
        <NavBarMobile />
      </div>
    );
  }

  // the first card in the deck is selected
  const displayCard: Card = cardDeck[0];
  // we compile the data for the compoment
  const displayCardProps: DisplayCardProps = {
    handleDismiss,
    id: displayCard.id,
    note: displayCard.note,
    code: displayCard.code,
    tags: currentTags || [],
  };

  // the card is loaded
  return (
    <div className="h-screen flex flex-col items-center">
      <CardDeckCard {...displayCardProps} />
      <NavBarMobile />
    </div>
  );
}
