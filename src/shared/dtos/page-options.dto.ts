import { IsEnum } from 'class-validator';
import { PageOrder } from '../enums/page-order';

export class PageOptionsDto {
  @IsEnum(PageOrder)
  readonly order?: PageOrder = PageOrder.ASC;

  readonly page?: number = 1;

  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
