import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getAllTagNames(): Promise<string[]> {
    const tags: Tag[] = await this.tagsRepository.find();
    return tags.map((tag) => tag.name);
  }

  updateTag(id: string, name: string): Promise<Tag> {
    return this.tagsRepository.updateTagName(id, name);
  }

  deleteTagByName(name: string): Promise<void> {
    return this.tagsRepository.deleteTagByName(name);
  }
}
