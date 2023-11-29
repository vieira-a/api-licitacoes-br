import { Controller, Get, Query } from '@nestjs/common';
import { LoadProcessService } from '../services/load-process.service';
import { ProcessDto } from '../dtos/process.dto';
import { PageDto, PageOptionsDto } from '../../../shared/dtos';

@Controller('process')
export class LoadProcessController {
  constructor(private readonly loadProcessService: LoadProcessService) {}

  @Get()
  async load(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProcessDto>> {
    return await this.loadProcessService.findAll(pageOptionsDto);
  }
}
