import {
  getTags as getTagsAPI,
  deleteTagByName as deleteTagByNameAPI,
} from '@/lib/api';
import { useCallback } from 'react';

export function useTags() {
  const getTags = useCallback(async () => {
    try {
      const tags = await getTagsAPI();
      return tags;
    } catch (e) {
      console.log('Error when getting tags', e);
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

  return { getTags, deleteTagByName };
}
