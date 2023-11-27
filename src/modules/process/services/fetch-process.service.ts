import { Injectable } from '@nestjs/common';
import { ProcessEntity } from '../entities/process.entity';
import { mapProcess } from '../helpers/process.mapper';

@Injectable()
export class FetchProcessService {
  private readonly processUrl: string = 'http://localhost:5000/processos';

  async fetchProcess(): Promise<ProcessEntity> {
    const request = await fetch(this.processUrl);
    const data = await request.json();
    return mapProcess(data);
  }
}
