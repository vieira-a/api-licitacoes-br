import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { FetchProcessService } from './fetch-process.service';

@Injectable()
export class SaveProcessService {
  constructor(
    private readonly fetchProcessService: FetchProcessService,
    private readonly processRepository: ProcessRepository,
  ) {}

  async saveProcess() {
    const process = await this.fetchProcessService.fetchProcess();
    return await this.processRepository.saveProcess(process);
  }
}
