export interface Tag {
    id: string;
    name: string;
};

export interface Card {
    id: string;
    code: string;
    note: string;
    status?: string;
    tags?: Tag[] | [];
}

export interface CardData {
    note: string;
    code: string;
    tags?: Tag[];
}