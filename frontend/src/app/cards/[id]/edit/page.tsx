import UpdateCardForm from "@/components/Cards/CardForms/UpdateCardForm";
import { getCardById, getCardTagsByCardId } from "@/lib/api";
import { Card, Tag } from "@/types/components";

export default async function EditCardPage({ params: { id } }: { params: { id: string } }) {
    const card: Card = await getCardById(id);
    const tags: Tag[] = await getCardTagsByCardId(id)
    
    return (
        <UpdateCardForm 
                id={card.id}
                code={card.code}
                note={card.note}
                tags={tags}
        />
    ) 
}