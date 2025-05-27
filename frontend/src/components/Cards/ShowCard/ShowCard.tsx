'use client';
import { Card } from '@/types/components';
import BaseCard from '../BaseCard/BaseCard';
import ShowCardStatusBanner from './ShowCardStatusBanner';

function ShowCard(showCardProps: Card) {
  const { id, code, note, status, tags } = showCardProps;
  const baseCardProps = { id, code, note, tags };

  return (
    <div className="flex flex-col items-center h-screen">
      <BaseCard {...baseCardProps} />
      <ShowCardStatusBanner status={status} />
    </div>
  );
}

export default ShowCard;
