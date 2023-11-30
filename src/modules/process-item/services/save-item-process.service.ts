import { Injectable } from '@nestjs/common';
import { ItemProcessRepository } from '../repositories/process-item.repository';
import { FetchItemProcessService } from './fetch-item-process.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SaveItemProcessService {
  constructor(
    private readonly itemProcessRepository: ItemProcessRepository,
    private readonly fetchItemProcessService: FetchItemProcessService,
  ) {}

  @Cron('0 7,13,19,1 * * *')
  async saveItemProcess() {
    const itemProcess = await this.fetchItemProcessService.fetchItemProcess();

    const existingItems = await Promise.all(
      itemProcess.map(async (item) => {
        return await this.itemProcessRepository.findItemByProcess(
          item.processo,
          item.codigo,
        );
      }),
    );
    for (const [index, item] of itemProcess.entries()) {
      if (!existingItems[index]) {
        await this.itemProcessRepository.saveItemProcess(item);
      }
    }
  }
}
