import { ItemProcessEntity } from '../entities/item-process.entity';
import { ProcessItemDto } from '../dtos/process-item.dto';

export const mapDtoProcessItem = (
  data: ItemProcessEntity[],
): ProcessItemDto[] => {
  const itemProcesses = data.map((field) => {
    const itemProcess = new ProcessItemDto();

    itemProcess.processo = field.processo['codigoLicitacao'];
    itemProcess.quantidade = field.quantidade;
    itemProcess.descricao = field.descricao;
    itemProcess.valorReferencia = field.valorReferencia;

    return itemProcess;
  });
  return itemProcesses;
};
