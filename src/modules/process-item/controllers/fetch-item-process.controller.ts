import { Controller, Get } from '@nestjs/common';
import { SaveItemProcessService } from '../services/save-item-process.service';

@Controller('/fetch-process-itens')
export class FetchItemProcessController {
  constructor(
    private readonly saveItemProcessService: SaveItemProcessService,
  ) {}
  @Get()
  async fetchProcessItem() {
    await this.saveItemProcessService.saveItemProcess();
  }
}
