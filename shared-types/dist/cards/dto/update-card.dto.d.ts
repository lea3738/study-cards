import { CardStatus } from '../../enums';
export declare class UpdateCardDto {
    code?: string;
    note?: string;
    status?: CardStatus;
    tagNames?: string[];
}
