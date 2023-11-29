import { Controller, Get, Query } from '@nestjs/common';
import { LoadProcessService } from '../services/load-process.service';
import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';
import { PageDto } from '../../../shared/dtos/page.dto';
import { ProcessDto } from '../dtos/process.dto';

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
