import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { TagsRepository } from 'src/tags/tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, TagsRepository],
})
export class CardsModule {}
