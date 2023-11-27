import { Controller, Get } from '@nestjs/common';
import { SaveProcessService } from '../services/save-process.service';

@Controller('/fetch-process')
export class FetchProcessController {
  constructor(private readonly saveProcessService: SaveProcessService) {}
  @Get()
  async fetchProcess() {
    return await this.saveProcessService.saveProcess();
  }
}
