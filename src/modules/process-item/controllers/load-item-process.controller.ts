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
    @Query('processo') processo: number,
    @Query('descricao') descricao: string,
  ): Promise<PageDto<ProcessItemDto>> {
    const filter = { processo, descricao };
    return await this.loadItemProcessService.findAll(pageOptionsDto, filter);
  }
}
