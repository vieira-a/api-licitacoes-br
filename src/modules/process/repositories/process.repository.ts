import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessEntity } from '../entities/process.entity';
import { Between, Repository } from 'typeorm';

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
    const starOfDeleteDate = new Date(date);
    starOfDeleteDate.setUTCHours(0, 0, 0, 0);

    const endOfDeleteDate = new Date(date);
    endOfDeleteDate.setUTCHours(23, 59, 59, 999);

    const result = await this.processRepository.delete({
      inicioLances: Between(starOfDeleteDate, endOfDeleteDate),
    });
    console.log('deleteProcessByDate', date, result);
  }
}
