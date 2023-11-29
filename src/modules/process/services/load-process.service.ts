import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';

@Injectable()
export class LoadProcessService {
  constructor(private readonly processRepository: ProcessRepository) {}

  async findAll() {
    return await this.processRepository.findAllProcesses();
  }
}
