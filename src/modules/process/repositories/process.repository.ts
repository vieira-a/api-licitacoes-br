import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessEntity } from '../entities/process.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

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
    date.setUTCHours(0, 0, 0, 0);
    await this.processRepository.delete({
      inicioLances: LessThanOrEqual(date),
    });
  }
}
