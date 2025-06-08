import {
  getAllTagNames as getAllTagNamesAPI,
  deleteTagByName as deleteTagByNameAPI,
} from '@/lib/api';
import { useCallback } from 'react';

export function useTags() {
  const getAllTagNames = useCallback(async () => {
    try {
      const tagNames = await getAllTagNamesAPI();
      return tagNames;
    } catch (e) {
      console.log('Error when getting tag names', e);
      return [];
    }
  }, []);

  const deleteTagByName = useCallback(async (name: string) => {
    try {
      await deleteTagByNameAPI(name);
    } catch (e) {
      console.log('Error when deleting tag', e);
    }
  }, []);

  return { getAllTagNames, deleteTagByName };
}
