import { ProcessDto } from '../dtos/process.dto';
import { ProcessEntity } from '../entities/process.entity';

export const mapDtoProcess = (data: ProcessEntity[]): ProcessDto[] => {
  const processes = data.map((field) => {
    const process = new ProcessDto();

    process.codigoLicitacao = field.codigoLicitacao;
    process.resumo = field.resumo;
    process.numero = field.numero;
    process.inicioLances = field.inicioLances;
    return process;
  });
  return processes;
};
