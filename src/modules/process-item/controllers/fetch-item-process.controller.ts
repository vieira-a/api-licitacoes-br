import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SaveItemProcessService } from '../services/save-item-process.service';
import { Response } from 'express';
import { serverError } from '../../../shared/exceptions/server-error';

@Controller('/fetch-process-itens')
export class FetchItemProcessController {
  constructor(
    private readonly saveItemProcessService: SaveItemProcessService,
  ) {}
  @Get()
  async fetchProcessItem(@Res() res: Response) {
    try {
      const result = await this.saveItemProcessService.saveItemProcess();

      if (result === undefined) {
        throw new UnprocessableEntityException(
          'Não há itens de processos novos',
        );
      } else {
        return res.json({
          statusCode: HttpStatus.OK,
          message: 'Itens de processos salvos com sucesso',
        });
      }
    } catch (error) {
      return serverError(
        error,
        res,
        'Houve uma falha ao salvar itens dos processos',
      );
    }
  }
}
