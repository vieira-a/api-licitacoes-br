import { Controller, Get, Query } from '@nestjs/common';
import { LoadItemProcessService } from '../services/load-item-process.service';
import { PageDto, PageOptionsDto } from '../../../shared/dtos';
import { ProcessItemDto } from '../dtos/process-item.dto';

@Controller('items')
export class LoadItemProcessController {
  constructor(
    private readonly loadItemProcessService: LoadItemProcessService,
  ) {}

  @Get()
  async load(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProcessItemDto>> {
    return await this.loadItemProcessService.findAll(pageOptionsDto);
  }
}
