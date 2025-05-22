import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CardStatus } from '../../enums';

export class UpdateCardDto {
  @IsOptional()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsNotEmpty()
  note?: string;

  @IsOptional()
  @IsNotEmpty()
  status?: CardStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];
}
