import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available app-wide
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // change if needed
      password: 'postgres', // change if needed
      database: 'devnotes', // you can name it as you wish
      autoLoadEntities: true,
      synchronize: true, // true for dev only!
    }),
    CardsModule,
    TagsModule,
    AiModule,
  ],
})
export class AppModule {}
