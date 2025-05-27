import { getCardById, getCardTagsByCardId } from '../../../lib/api';
import { Card, Tag } from '@/types/components';
import NavBarMobile from '@/components/NavBar/NavBarMobile';
import ShowCard from '@/components/Cards/ShowCard/ShowCard';

export default async function CardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const card: Card = await getCardById(id);
  const tags: Tag[] = await getCardTagsByCardId(id);

  const cardData: Card = {
    id: card.id,
    note: card.note,
    code: card.code,
    status: card.status,
    tags: tags,
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <ShowCard {...cardData} />
      <NavBarMobile />
    </div>
  );
}
