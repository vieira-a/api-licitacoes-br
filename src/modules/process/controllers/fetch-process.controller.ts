import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { SaveProcessService } from '../services/save-process.service';
import { Response } from 'express';
import { serverError } from '../../../shared/exceptions/server-error';

@Controller('/fetch-process')
export class FetchProcessController {
  constructor(private readonly saveProcessService: SaveProcessService) {}
  @Get()
  async fetchProcess(@Res() res: Response) {
    try {
      await this.saveProcessService.saveProcess();

      return res.json({
        statusCode: HttpStatus.OK,
        message: 'Extração de processos executada com sucesso',
      });
    } catch (error) {
      console.log(error);
      return serverError(error, res, 'Houve uma falha ao extrair processos');
    }
  }
}
