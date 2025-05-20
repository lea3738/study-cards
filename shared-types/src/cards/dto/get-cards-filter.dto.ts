import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CardStatus } from '../../enums';



export class GetCardsFilterDto {
  @IsOptional()
  @IsEnum(CardStatus)
  status?: CardStatus;

  @IsOptional()
  @IsString()
  tagName?: string;
}
