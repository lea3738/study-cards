'use client';
import CardCode from './CardCode';
import MiniTag from '../../Tag/MiniTag';
import Link from 'next/link';
import { Tag } from '@/types/components';
import { CardStatus } from 'shared-types';

interface PreviewCardProps {
  id: string;
  code: string;
  status: CardStatus;
  tags: Tag[];
}

function PreviewCard({ id, code, status, tags }: PreviewCardProps) {
  return (
    <Link href={`/cards/${id}`} className="block">
      <div className="w-64 bg-white border rounded-md p-4 shadow-md flex flex-col h-72">
        <div>
          {tags?.map((tag) => (
            <MiniTag key={`key-${tag.name}`} tag={tag.name} />
          ))}
        </div>
        <div className="grow">
          <div className="flex flex-col h-full">
            <CardCode code={code} />
            {status === CardStatus.DISMISSED && (
              <div className="text-sm bg-green-300 h-10 flex items-center px-2">
                <p>🥳 You know it!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PreviewCard;
