import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessEntity } from '../entities/process.entity';
import { Between, Repository } from 'typeorm';
import { getDeleteDateInterval } from '../helpers';
import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';
import { PageMetaDto } from '../../../shared/dtos/page-meta.dto';
import { PageDto } from '../../../shared/dtos/page.dto';
import { ProcessDto } from '../dtos/process.dto';
import { mapDtoProcess } from '../helpers';

@Injectable()
export class ProcessRepository {
  constructor(
    @InjectRepository(ProcessEntity)
    private readonly processRepository: Repository<ProcessEntity>,
  ) {}
  async saveProcess(process: ProcessEntity) {
    await this.processRepository.save(process);
  }

  async findAllProcesses(
    pageOptionsDto: PageOptionsDto,
    filterOptions?: { resumo?: string },
  ): Promise<PageDto<ProcessDto>> {
    const queryBuilder = this.processRepository.createQueryBuilder('processos');

    queryBuilder
      .orderBy('processos.codigo_licitacao', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    if (filterOptions.resumo) {
      queryBuilder.andWhere('UPPER(processos.resumo) LIKE UPPER(:resumo)', {
        resumo: `%${filterOptions.resumo}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(mapDtoProcess(entities), pageMetaDto);
  }

  async findByCode(code: number) {
    return await this.processRepository.findOne({
      where: { codigoLicitacao: code },
    });
  }

  async findAllCodes() {
    const processCodes = [];
    const processes = await this.processRepository.find();
    for (const item of processes) {
      processCodes.push(item.codigoLicitacao);
    }
    return processCodes;
  }

  async deleteProcessByDate(date: Date) {
    const deleteDateInterval = getDeleteDateInterval(date);

    await this.processRepository.delete({
      inicioLances: Between(
        deleteDateInterval.starOfDeleteDate,
        deleteDateInterval.endOfDeleteDate,
      ),
    });
  }
}
