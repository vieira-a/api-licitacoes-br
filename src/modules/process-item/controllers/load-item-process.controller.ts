import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { LoadItemProcessService } from '../services/load-item-process.service';
import { PageDto, PageOptionsDto } from '../../../shared/dtos';
import { ProcessItemDto } from '../dtos/process-item.dto';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('items')
@ApiTags('itens dos processos')
export class LoadItemProcessController {
  constructor(
    private readonly loadItemProcessService: LoadItemProcessService,
  ) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ProcessItemDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Houve um erro ao carregar itens dos processos',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não há itens de processos cadastrados',
  })
  async load(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('processo') processo: number,
    @Query('descricao') descricao: string,
  ): Promise<PageDto<ProcessItemDto>> {
    try {
      const filter = { processo, descricao };
      const data = await this.loadItemProcessService.findAll(
        pageOptionsDto,
        filter,
      );
      if (!data) {
        throw new NotFoundException('Não há itens de processos cadastrados');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Houve um erro ao carregar itens dos processos',
      );
    }
  }
}
