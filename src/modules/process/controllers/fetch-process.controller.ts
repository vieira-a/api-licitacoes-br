import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SaveProcessService } from '../services/save-process.service';

@Controller('/fetch-process')
export class FetchProcessController {
  constructor(private readonly saveProcessService: SaveProcessService) {}
  @Get()
  async fetchProcess() {
    try {
      await this.saveProcessService.saveProcess();

      // if (result === null) {
      //   return new UnprocessableEntityException('Não há dados para salvar');
      // }

      return {
        statusCode: HttpStatus.OK,
        message: 'Dados salvos com sucesso',
      };
    } catch (error) {
      if (error.cause.code === 'ENOTFOUND') {
        throw new NotFoundException('Houve um erro de conexão à API');
      }
      throw new InternalServerErrorException(
        'Houve um erro ao salvar os dados',
      );
    }
  }
}
