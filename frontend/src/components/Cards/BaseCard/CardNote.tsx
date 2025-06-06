'use client';

type CardNoteProps = {
  note: string; 
} 

function CardNote({ note }: CardNoteProps ) {

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-lg font-bold mb-2">Note</h2>
      <div className="bg-white border rounded shadow-lg text-sm p-2 overflow-x-auto flex-1 min-h-0">
        <p className="text-gray-700 text-sm whitespace-pre-wrap break-words h-full">{note}</p>
      </div>
    </div>    

  );
}

export default CardNote;
