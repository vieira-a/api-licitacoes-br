import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { LoadProcessService } from '../services/load-process.service';
import { ProcessDto } from '../dtos/process.dto';
import { PageDto, PageOptionsDto } from '../../../shared/dtos';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('process')
@ApiTags('visualização de dados')
export class LoadProcessController {
  constructor(private readonly loadProcessService: LoadProcessService) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ProcessDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Houve um erro ao carregar processos',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não há processos cadastrados',
  })
  async load(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('resumo') resumo: string,
    @Query('numero') numero: string,
    @Query('inicioLances') inicioLances: string,
  ): Promise<PageDto<ProcessDto>> {
    try {
      const filter = { resumo, numero, inicioLances };
      const data = await this.loadProcessService.findAll(
        pageOptionsDto,
        filter,
      );
      if (!data) {
        throw new NotFoundException('Não há processos cadastrados');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Houve um erro ao carregar processos',
      );
    }
  }
}
