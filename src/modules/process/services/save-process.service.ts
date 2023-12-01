import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { FetchProcessService } from './fetch-process.service';
import { SaveItemProcessService } from '../../../modules/process-item/services/save-item-process.service';
import { getDeleteDate } from '../helpers';
import { Cron } from '@nestjs/schedule';
import { ExtractLockService } from '../../../shared/services/extract-lock/extract-lock.service';

@Injectable()
export class SaveProcessService {
  constructor(
    private readonly fetchProcessService: FetchProcessService,
    private readonly processRepository: ProcessRepository,
    private readonly saveItemProcessService: SaveItemProcessService,
    private readonly extractLockService: ExtractLockService,
  ) {}

  @Cron('0 6,12,18,0 * * *')
  async saveProcess(): Promise<void> {
    const isLocked = await this.extractLockService.isLocked();
    const deleteDate = getDeleteDate();

    if (!isLocked) {
      const lockExtract = await this.extractLockService.lock();

      if (lockExtract) {
        await this.processRepository.deleteProcessByDate(deleteDate);

        const process = await this.fetchProcessService.fetchProcess();

        for (const item of process) {
          const processAlreadyExists = await this.processRepository.findByCode(
            item.codigoLicitacao,
          );
          if (!processAlreadyExists) {
            await this.processRepository.saveProcess(item);
          } else if (processAlreadyExists) {
            await this.saveItemProcessService.saveItemProcess();
          }
          await this.extractLockService.unlock();
          return;
        }
      } else {
        throw new NotFoundException('Não foi possível obter status do lock');
      }
    } else {
      throw new ConflictException('Já existe uma extração em execução');
    }
  }
}
