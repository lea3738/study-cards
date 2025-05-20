import { Tag } from "./tag";
export interface Card {
    id: string;
    code: string;
    note: string;
    status: string;
    tags?: Tag[];
}
