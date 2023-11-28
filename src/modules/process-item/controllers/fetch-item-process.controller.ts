import { Controller, Get } from '@nestjs/common';
import { FetchItemProcessService } from '../services/fetch-item-process.service';

@Controller('/fetch-process-itens')
export class FetchItemProcessController {
  constructor(
    private readonly fetchItemProcessService: FetchItemProcessService,
  ) {}
  @Get()
  async fetchProcessItem() {
    await this.fetchItemProcessService.fetchItemProcess();
  }
}
