import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }

  @Patch('/:id')
  updateTagName(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, name);
  }

  @Delete('/:id')
  deleteTag(@Param('id') id: string): Promise<void> {
    return this.tagsService.deleteTag(id);
  }
}
