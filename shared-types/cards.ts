import { Tag } from "./tags"

export interface Card {
    id: string;
    code: string;
    note: string;
    tags?: Tag[];
}

