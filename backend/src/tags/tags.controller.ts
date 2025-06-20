import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAllTagNames(): Promise<string[]> {
    return this.tagsService.getAllTagNames();
  }

  @Patch('/:id')
  updateTagName(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, name);
  }

  @Delete('/:name')
  deleteTagByName(@Param('name') name: string): Promise<void> {
    return this.tagsService.deleteTagByName(name);
  }
}
