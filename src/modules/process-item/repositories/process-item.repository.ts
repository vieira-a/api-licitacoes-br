import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemProcessEntity } from '../entities/item-process.entity';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../shared/dtos';
import { ProcessItemDto } from '../dtos/process-item.dto';
import { mapDtoProcessItem } from '../helpers';

@Injectable()
export class ItemProcessRepository {
  constructor(
    @InjectRepository(ItemProcessEntity)
    private readonly itemProcessRepository: Repository<ItemProcessEntity>,
  ) {}

  async findAllProcessesItems(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProcessItemDto>> {
    const queryBuilder = this.itemProcessRepository
      .createQueryBuilder('itens_processos')
      .leftJoinAndSelect('itens_processos.processo', 'processo');

    queryBuilder
      .orderBy('itens_processos.processo', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(mapDtoProcessItem(entities), pageMetaDto);
  }

  async saveItemProcess(itemProcess: any) {
    await this.itemProcessRepository.save(itemProcess);
  }

  async findItemByProcess(process: number, codeItem: number) {
    return await this.itemProcessRepository.findOne({
      where: { processo: process, codigo: codeItem },
    });
  }
}
