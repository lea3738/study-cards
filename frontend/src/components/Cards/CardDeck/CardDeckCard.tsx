'use client';
import { Card } from '@/types/components';
import CardDeckDismissButton from './CardDeckDismissButton';
import BaseCard from '../BaseCard/BaseCard';

interface CardDeckCardProps extends Card {
  handleDismiss: (data: boolean) => void;
}

function CardDeckCard(cardDeckCardProps: CardDeckCardProps) {
  const { id, code, note, tags, handleDismiss } = cardDeckCardProps;
  const baseCardProps = { id, code, note, tags };

  return (
    <div className="flex flex-col items-center h-screen">
      <BaseCard {...baseCardProps} />
      <CardDeckDismissButton handleDismiss={handleDismiss} />
    </div>
  );
}

export default CardDeckCard;
