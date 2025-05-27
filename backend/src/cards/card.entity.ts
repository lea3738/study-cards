import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from 'src/tags/tag.entity';
import { CardStatus } from '@your-org/shared-types';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid') // uuid is provided by typeOrm
  id: string;

  @Column()
  code: string;

  @Column()
  note: string;

  @Column()
  status: CardStatus;

  @ManyToMany(() => Tag, (tag) => tag.cards, { cascade: true, eager: false })
  @JoinTable() // This side owns the relation and creates the join table
  tags: Tag[];
}
