import { DataSource, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async getTagById(id: string): Promise<Tag> {
    const tag = await this.findOne({ where: { id } });

    if (!tag) {
      throw new NotFoundException(`The tag ${id} does not exist`);
    }

    return tag;
  }

  async getOrCreateTag(name: string): Promise<Tag> {
    let tag = await this.findOne({ where: { name } });

    if (!tag) {
      tag = this.create({ name });
      await this.save(tag);
    }

    return tag;
  }

  async getOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    const tags: Tag[] = [];

    for (const name of tagNames) {
      const tag = await this.getOrCreateTag(name);
      tags.push(tag);
    }

    return tags;
  }

  async updateTagName(id: string, name: string): Promise<Tag> {
    const tag = await this.getTagById(id);
    tag.name = name;
    return tag;
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await this.getTagById(id);

    await this.remove(tag);
  }
}
