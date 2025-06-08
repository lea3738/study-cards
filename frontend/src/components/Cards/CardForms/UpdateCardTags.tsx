'use client';

import TagsDropDown from '@/components/DropDown/TagsDropDown/TagsDropdown';
import DeletableTag from '@/components/Tag/DeletableTag';
import { useTags } from '@/hooks/useTags';
import { useCallback, useEffect, useState } from 'react';

interface UpdateCardTagsProps {
  tagNames: string[];
  handleUpdateTagNames: (tagNames: string[]) => void;
}

export default function UpdateCardTags({
  tagNames,
  handleUpdateTagNames,
}: UpdateCardTagsProps) {
  const [unassignedTagNames, setUnassignedTagNames] = useState<string[]>([]);
  const [allTagNames, setAllTagNames] = useState<string[]>([]);
  const { getAllTagNames, deleteTagByName } = useTags();

  const handleDeleteTagName = useCallback(
    (deletedTagName: string) => {
      const newTagNames = tagNames.filter(
        (tagName) => tagName !== deletedTagName,
      );
      handleUpdateTagNames(newTagNames);
      console.log('tagNames after change', newTagNames);
    },
    [tagNames, handleUpdateTagNames],
  );

  const handleAddTagName = useCallback(
    (addedTagName: string) => {
      const newTagNames = [...tagNames, addedTagName];
      handleUpdateTagNames(newTagNames);
    },
    [tagNames, handleUpdateTagNames],
  );

  const handleDeleteTag = useCallback(
    async (deletedTagName: string) => {
      try {
        await deleteTagByName(deletedTagName);
        setAllTagNames((prev) =>
          prev.filter((tagName) => tagName !== deletedTagName),
        );
      } catch (e) {
        console.log('enable to delete tag', e);
      }
    },
    [deleteTagByName],
  );

  // Get all existing tagNames and assigns them to allTagNames state
  useEffect(() => {
    async function loadAllTags() {
      const tagNames: string[] = await getAllTagNames();
      setAllTagNames(tagNames);
    }

    loadAllTags();
  }, [getAllTagNames]);

  // when updatedTags change, it recalculates udpdated and dismissed tag lists
  useEffect(() => {
    if (!allTagNames || allTagNames.length === 0) return;

    const tagNamesUnassigned = allTagNames.filter(
      (tagName) => !tagNames.includes(tagName),
    );
    setUnassignedTagNames(tagNamesUnassigned);
  }, [allTagNames, tagNames]);

  return (
    <div className="relative z-0 w-full flex justify-between items-start border rounded-lg p-2 mb-2">
      <div className="flex flex-col flex-1 min-w-0 mr-2">
        <p className="text-xs text-gray-600 flex-shrink-0">Tags</p>
        <div className="gap-1 flex flex-wrap mt-1">
          {tagNames.map((tagName) => {
            return (
              <DeletableTag
                key={`key-${tagName}`}
                tagName={tagName}
                handleDeleteTagName={handleDeleteTagName}
              />
            );
          })}
          <TagsDropDown
            tagNames={unassignedTagNames}
            handleAddTagName={handleAddTagName}
            handleDeleteTag={handleDeleteTag}
          />
        </div>
      </div>
    </div>
  );
}
