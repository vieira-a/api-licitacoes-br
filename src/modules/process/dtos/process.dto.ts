import { ApiProperty } from '@nestjs/swagger';

export class ProcessDto {
  @ApiProperty({
    example: 999999,
    description: 'Código do processo licitatório',
  })
  public codigoLicitacao: number;

  @ApiProperty({
    example: '01/2023',
    description: 'Número do processo licitatório',
  })
  public numero: string;

  @ApiProperty({
    example: 'Registro de preço para aquisição',
    description: 'Resumo descritivo do processo licitatório',
  })
  public resumo: string;

  @ApiProperty()
  public inicioLances: Date;
}
