import { IsOptional } from 'class-validator';

export class ProcessFilterDto {
  @IsOptional()
  readonly numero: string;

  @IsOptional()
  readonly resumo: string;

  @IsOptional()
  readonly inicioLances: Date;
}
