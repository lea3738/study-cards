import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './card.entity';
import { TagsRepository } from 'src/tags/tags.repository';
import { Tag } from 'src/tags/tag.entity';
import {
  UpdateCardDto,
  GetCardsFilterDto,
  CreateCardDto,
  CardStatus,
} from '@your-org/shared-types';

@Injectable()
export class CardsRepository extends Repository<Card> {
  constructor(
    private dataSource: DataSource,
    private tagsRepository: TagsRepository,
  ) {
    super(Card, dataSource.createEntityManager());
  }

  async getCards(filterDto: GetCardsFilterDto): Promise<Card[]> {
    const { status, tagName } = filterDto;
    // leftJoinAndSelect fait un leftJoin en ajoutant les tags aux cards
    const query = this.createQueryBuilder('card').leftJoinAndSelect(
      'card.tags',
      'tag',
    );

    if (status) {
      query.andWhere('card.status = :status', { status }); // {status: status}
    }

    if (tagName) {
      query.andWhere('tag.name = :tagName', { tagName });
    }

    const cards = await query.getMany();
    return cards;
  }

  async getCardById(id: string): Promise<Card> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return found;
  }

  async getCardTagsByCardId(id: string): Promise<Tag[]> {
    const found = await this.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!found) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return found.tags;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { note, code, tagNames } = createCardDto;

    const card = this.create({
      note,
      code,
      status: CardStatus.READY,
    });

    if (tagNames && tagNames.length > 0) {
      const tags = await this.tagsRepository.getOrCreateTags(tagNames);
      card.tags = tags;
    }

    await this.save(card);
    return card;
  }

  async updateCard(
    id: string,
    updateCardDto: Partial<UpdateCardDto>,
  ): Promise<Card> {
    const { code, note, status, tagNames } = updateCardDto;
    const card = await this.getCardById(id);

    if (code) {
      card.code = code;
    }

    if (note) {
      card.note = note;
    }

    if (status) {
      card.status = status;
    }

    if (tagNames) {
      const tags = await this.tagsRepository.getOrCreateTags(tagNames);

      card.tags = tags;
    }

    await this.save(card);

    return card;
  }

  async resetCardsStatus(): Promise<void> {
    const cards: Card[] = await this.getCards({ status: CardStatus.DISMISSED });
    if (cards.length === 0) {
      return;
    }

    try {
      await Promise.all(
        cards.map((card) =>
          this.updateCard(card.id, { status: CardStatus.READY }),
        ),
      );
    } catch (e) {
      console.log('Unable to reset card status', e);
    }
  }
}
