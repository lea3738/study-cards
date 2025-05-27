import { Card } from 'src/cards/card.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Card, (card) => card.tags)
  // Note: No @JoinTable() here
  cards: Card[];
}
