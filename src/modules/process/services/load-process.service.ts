import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';
import { PageDto } from '../../../shared/dtos/page.dto';
import { ProcessDto } from '../dtos/process.dto';

@Injectable()
export class LoadProcessService {
  constructor(private readonly processRepository: ProcessRepository) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
    filter: any,
  ): Promise<PageDto<ProcessDto>> {
    return await this.processRepository.findAllProcesses(
      pageOptionsDto,
      filter,
    );
  }
}
