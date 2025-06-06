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
    <div className="flex flex-col flex-1 min-h-0 items-center">
      <BaseCard {...baseCardProps} />
      <CardDeckDismissButton handleDismiss={handleDismiss} />
    </div>
  );
}

export default CardDeckCard;
