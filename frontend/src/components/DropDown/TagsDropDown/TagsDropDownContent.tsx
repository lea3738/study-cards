'use-client';

import AddableTag from '@/components/Tag/AddableTag';
import TagArea from './TagArea/TagArea';

interface TagsDropDownContentProps {
  tagNames: string[];
  handleAddTagName: (tagName: string) => void;
}
export default function TagsDropDownContent({
  tagNames,
  handleAddTagName,
}: TagsDropDownContentProps) {

  return (
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right border rounded-md bg-white shadow-lg">
      <div className="p-2">
        <div className="mb-2">
          {tagNames.map((tagName) => {
            return (
              <AddableTag
                key={`key-${tagName}`}
                tagName={tagName}
                handleAddTagName={handleAddTagName}
              />
            );
          })}
        </div>
        <TagArea handleAddTagName={handleAddTagName}/>
      </div>
    </div>
  );
}
