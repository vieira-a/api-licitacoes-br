import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessEntity } from '../entities/process.entity';
import { Between, Repository } from 'typeorm';
import { getDeleteDateInterval } from '../helpers';

@Injectable()
export class ProcessRepository {
  constructor(
    @InjectRepository(ProcessEntity)
    private readonly processRepository: Repository<ProcessEntity>,
  ) {}
  async saveProcess(process: ProcessEntity) {
    await this.processRepository.save(process);
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

    const result = await this.processRepository.delete({
      inicioLances: Between(
        deleteDateInterval.starOfDeleteDate,
        deleteDateInterval.endOfDeleteDate,
      ),
    });
    console.log('deleteProcessByDate', date, result);
  }
}
