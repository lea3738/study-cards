'use client';

import TagsDropDown from '@/components/DropDown/TagsDropDown/TagsDropdown';
import DeletableTag from '@/components/Tag/DeletableTag';
import { useTags } from '@/hooks/useTags';
import { Tag } from '@/types/components';
import { useCallback, useEffect, useState } from 'react';

interface UpdateCardTagsProps {
  tags: Tag[];
  handleUpdateTagNames: (tagNames: string[]) => void;
}

export default function UpdateCardTags({ tags, handleUpdateTagNames }: UpdateCardTagsProps) {
  const [updatedTagNames, setUpdatedTagNames] = useState<string[]>([]);
  const [unassignedTagNames, setUnassignedTagNames] = useState<string[]>([]);
  const [allTagNames, setAllTagNames] = useState<string[]>([]);
  const { getTags } = useTags();

// !!!! Need to modifiy the function where it's called
const handleDeleteTagName = useCallback((deletedTagName: string) => {
    setUpdatedTagNames(prev => prev.filter(tagName => tagName !== deletedTagName));
}, []);

// !!!! Need to modifiy the function where it's called
const handleAddTagName = useCallback((tagName: string) => {
    setUpdatedTagNames(prev => [...prev, tagName]);
}, []);
    
  // Get all existing tagNames and assigns them to allTagNames state
  useEffect(() => {
    async function loadAllTags() {
      const tags: Tag[] = await getTags();
      const tagNames = tags.map(tag => tag.name);
      setAllTagNames(tagNames);
    }

    loadAllTags();
  }, [getTags]);

  // Give initial tagNames to UpdatedTagsNames state
  useEffect(() => {
      const tagNames = tags.map(tag => tag.name);  
      setUpdatedTagNames(tagNames)
  }, []);

  // when updatedTags change, it recalculates udpdated and dismissed tag lists
  useEffect(() => {
    if (!allTagNames || allTagNames.length === 0) return;

    const tagNamesUnassigned = allTagNames.filter(
      (tagName) => !updatedTagNames.includes(tagName),
    );
    setUnassignedTagNames(tagNamesUnassigned);
    handleUpdateTagNames(updatedTagNames)
  }, [updatedTagNames, allTagNames]);

  return (
    <div className="w-full flex justify-between items-center border rounded-lg p-2">
      <div className="flex flex-col">
        <p className="text-xs text-gray-600">Tags</p>
        <div className="gap-2 flex flex-wrap mt-2">
          {updatedTagNames.map((tagName) => {
            return (
              <DeletableTag
                key={`key-${tagName}`}
                tagName={tagName}
                handleDeleteTagName={handleDeleteTagName}
              />
            );
          })}
        </div>
      </div>
      <TagsDropDown tagNames={unassignedTagNames} handleAddTagName={handleAddTagName}/>
    </div>
  );
}
