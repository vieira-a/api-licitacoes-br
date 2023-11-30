import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { SaveItemProcessService } from '../services/save-item-process.service';
import { Response } from 'express';
import { serverError } from '../../../shared/exceptions/server-error';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller('/extract-items')
@ApiTags('extração de dados')
export class FetchItemProcessController {
  constructor(
    private readonly saveItemProcessService: SaveItemProcessService,
  ) {}
  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Extração de itens de processos executada com sucesso',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Houve uma falha ao salvar itens dos processos',
  })
  async fetchProcessItem(@Res() res: Response) {
    try {
      await this.saveItemProcessService.saveItemProcess();

      return res.json({
        statusCode: HttpStatus.OK,
        message: 'Extração de itens de processos executada com sucesso',
      });
    } catch (error) {
      return serverError(
        error,
        res,
        'Houve uma falha ao salvar itens dos processos',
      );
    }
  }
}
