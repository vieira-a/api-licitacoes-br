import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { SaveProcessService } from '../services/save-process.service';

@Controller('/fetch-process')
export class FetchProcessController {
  constructor(private readonly saveProcessService: SaveProcessService) {}
  @Get()
  async fetchProcess() {
    try {
      await this.saveProcessService.saveProcess();
      return {
        statusCode: HttpStatus.OK,
        message: 'Dados salvos com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Houve um erro ao salvar dados',
        error,
      );
    }
  }
}
