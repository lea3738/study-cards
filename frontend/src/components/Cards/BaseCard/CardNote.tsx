'use client';

type CardNoteProps = {
  note: string; 
} 

function CardNote({ note }: CardNoteProps ) {

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-2">Note</h2>
      <div className="grow bg-white border rounded shadow-lg text-sm p-2 overflow-auto">
        <p className="text-gray-700 overflow-y-auto text-sm">{note}</p>
      </div>
    </div>    

  );
}

export default CardNote;
