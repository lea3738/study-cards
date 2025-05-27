import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  updateTag(id: string, name: string): Promise<Tag> {
    return this.tagsRepository.updateTagName(id, name);
  }

  deleteTag(id: string): Promise<void> {
    return this.tagsRepository.deleteTag(id);
  }
}
