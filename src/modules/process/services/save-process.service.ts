import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { FetchProcessService } from './fetch-process.service';

@Injectable()
export class SaveProcessService {
  constructor(
    private readonly fetchProcessService: FetchProcessService,
    private readonly processRepository: ProcessRepository,
  ) {}

  async saveProcess(): Promise<void> {
    const process = await this.fetchProcessService.fetchProcess();

    for (const item of process) {
      const processAlreadyExists = await this.processRepository.findByCode(
        item.codigoLicitacao,
      );
      if (!processAlreadyExists) {
        return await this.processRepository.saveProcess(item);
      }
    }
  }
}
