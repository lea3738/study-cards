import { Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { Card } from './card.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  CardStatus,
  CreateCardDto,
  GetCardsFilterDto,
  UpdateCardDto,
} from '@your-org/shared-types';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  getCards(filterDto: GetCardsFilterDto): Promise<Card[]> {
    return this.cardsRepository.getCards(filterDto);
  }

  getCardById(id: string): Promise<Card> {
    return this.cardsRepository.getCardById(id);
  }

  getCardTagsByCardId(id: string): Promise<Tag[]> {
    return this.cardsRepository.getCardTagsByCardId(id);
  }

  createCard(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsRepository.createCard(createCardDto);
  }

  async updateCardStatus(id: string, status: CardStatus): Promise<Card> {
    const card = await this.getCardById(id);

    card.status = status;
    await this.cardsRepository.save(card);

    return card;
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardsRepository.updateCard(id, updateCardDto);
  }

  async deleteCard(id: string): Promise<void> {
    const result = await this.cardsRepository.delete(id); // we can use remove but it uses more resources
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }

  async resetCardsStatus(): Promise<void> {
    await this.cardsRepository.resetCardsStatus();
  }
}
