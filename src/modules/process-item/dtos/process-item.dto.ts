import { ApiProperty } from '@nestjs/swagger';

export class ProcessItemDto {
  @ApiProperty({
    example: 999999,
    description: 'Código do processo licitatório',
  })
  public processo: number;

  @ApiProperty({
    example: 999,
    description: 'Quantidade do item',
  })
  public quantidade: string;

  @ApiProperty({
    example: 'Aquisição de objeto para finalidade especificada',
    description: 'Descrição do item',
  })
  public descricao: string;

  @ApiProperty({
    example: '99.99',
    description: 'Valor de custo estimado do item',
  })
  public valorReferencia: string;
}
