import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemProcessEntity } from '../entities/item-process.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemProcessRepository {
  constructor(
    @InjectRepository(ItemProcessEntity)
    private readonly itemProcessRepository: Repository<ItemProcessEntity>,
  ) {}

  async saveItemProcess(itemProcess: any) {
    await this.itemProcessRepository.save(itemProcess);
  }

  async findItemByProcess(process: number, codeItem: number) {
    return await this.itemProcessRepository.findOne({
      where: { processo: process, codigo: codeItem },
    });
  }
}
