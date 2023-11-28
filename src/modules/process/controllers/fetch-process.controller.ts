import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SaveProcessService } from '../services/save-process.service';
import { Response } from 'express';
import { serverError } from '../../../shared/exceptions/server-error';

@Controller('/fetch-process')
export class FetchProcessController {
  constructor(private readonly saveProcessService: SaveProcessService) {}
  @Get()
  async fetchProcess(@Res() res: Response) {
    try {
      const result = await this.saveProcessService.saveProcess();

      if (result === undefined) {
        throw new UnprocessableEntityException('Não há processos novos');
      } else {
        return res.json({
          statusCode: HttpStatus.OK,
          message: 'Processos salvos com sucesso',
        });
      }
    } catch (error) {
      return serverError(error, res, 'Houve uma falha ao salvar os processos');
    }
  }
}
