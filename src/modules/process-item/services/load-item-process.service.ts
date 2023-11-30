import { Injectable } from '@nestjs/common';
import { ItemProcessRepository } from '../repositories/process-item.repository';
import { PageDto, PageOptionsDto } from '../../../shared/dtos';
import { ProcessItemDto } from '../dtos/process-item.dto';

@Injectable()
export class LoadItemProcessService {
  constructor(private readonly itemProcessRepository: ItemProcessRepository) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
    filter: any,
  ): Promise<PageDto<ProcessItemDto>> {
    return await this.itemProcessRepository.findAllProcessesItems(
      pageOptionsDto,
      filter,
    );
  }
}
