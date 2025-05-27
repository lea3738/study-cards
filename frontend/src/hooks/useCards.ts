import {
  deleteCard as deleteCardAPI,
  createCard as createCardAPI,
  updateCard as updateCardAPI,
  getCards as getCardsAPI,
} from '@/lib/api';
import { Card } from '@/types/components';
import { useRouter } from 'next/navigation';
import { CreateCardDto, UpdateCardDto } from 'shared-types';

export function useCards() {
  const router = useRouter();

  async function getCards() {
    try {
        const cards = await getCardsAPI();
        return cards;
    } catch (e) {
        console.log('Error when getting cards', e);
    }
  }

  async function deleteCard(cardId: string) {
    const confirmDelete = window.confirm('Are you sure?');

    if (confirmDelete) {
      try {
        await deleteCardAPI(cardId);
        alert('Card deleted!');
        router.push('/cards');
      } catch (e) {
        console.log('Got an error when deleting', e);
      }
    }
  }

  async function createCard({ note, code, tagNames }: CreateCardDto) {
    try {
      const card: Card = await createCardAPI({ note, code, tagNames });
      router.push(`/cards/${card.id}`);
    } catch (e) {
      console.log('Got an error when creating card', e);
    }
  }

  async function updateCard(id: string, { note, code, tagNames }: Partial<UpdateCardDto>) {
    try {
      const updateCardDto = { note, code, tagNames };
      const card = await updateCardAPI(id, updateCardDto);
      router.push(`/cards/${card.id}`);
    } catch (e) {
      console.log('Got an error when updating card', e);
    }
  }

  return { getCards, deleteCard, createCard, updateCard };
}
