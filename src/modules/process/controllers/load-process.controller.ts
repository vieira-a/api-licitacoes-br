import { Controller, Get } from '@nestjs/common';
import { LoadProcessService } from '../services/load-process.service';

@Controller('/process')
export class LoadProcessController {
  constructor(private readonly loadProcessService: LoadProcessService) {}
  @Get()
  async load() {
    const result = this.loadProcessService.findAll();
    return result;
  }
}
