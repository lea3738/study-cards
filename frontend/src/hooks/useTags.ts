import { getTags as getTagsAPI } from '@/lib/api';
import { useCallback } from 'react';

export function useTags() {

  const getTags= useCallback(async () => {
    try {
        const tags = await getTagsAPI();
        return tags;
    } catch (e) {
        console.log('Error when getting tags', e);
        return [];
    }
  }, [])

  return { getTags };
}
