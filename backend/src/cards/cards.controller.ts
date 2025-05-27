import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  CreateCardDto,
  GetCardsFilterDto,
  UpdateCardDto,
} from '@your-org/shared-types';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  getCards(@Query() filterDto: GetCardsFilterDto): Promise<Card[]> {
    return this.cardsService.getCards(filterDto);
  }

  @Get('/:id')
  getCardById(@Param('id') id: string): Promise<Card> {
    return this.cardsService.getCardById(id);
  }

  @Get('/:id/tags')
  getCardTagsByCardId(@Param('id') id: string): Promise<Tag[]> {
    return this.cardsService.getCardTagsByCardId(id);
  }

  @Post()
  createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(createCardDto);
  }

  @Patch('/:id')
  updateCard(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @Delete('/:id')
  deleteCard(@Param('id') id: string): Promise<void> {
    return this.cardsService.deleteCard(id);
  }

  @Post('/reset-status')
  resetCardsStatus(): Promise<void> {
    return this.cardsService.resetCardsStatus();
  }
}
