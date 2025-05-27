'use-client';

import Link from "next/link";

interface DropDownContentProps {
  handleDelete: () => void;
  cardId: string;
}
export default function DropDownContent({
  handleDelete, 
  cardId
}: DropDownContentProps) {
  return (
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right border rounded-md bg-white shadow-lg">
      <div className="py-1">
        <Link 
            href={`/cards/${cardId}/edit`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
            Modify Card
        </Link>
        <span
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
          onClick={handleDelete}
        >
          Delete Card
        </span>
      </div>
    </div>
  );
}
