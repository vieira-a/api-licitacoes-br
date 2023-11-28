import { ItemProcessEntity } from '../entities/item-process.entity';

export const mapProcessItem = (data: any, processo: number) => {
  if (data.isLote === false) {
    const itemsProcesses = data.itens.result.map((field: any) => {
      const item = new ItemProcessEntity();

      item.quantidade = field.quantidade;
      item.valorReferencia = field.valorReferencia;
      item.descricao = field.descricao;
      item.participacao = field.participacao.codigo;
      item.codigo = field.codigo;
      item.processo = processo;

      return item;
    });
    return itemsProcesses;
  } else if (data.isLote === true) {
    const itemsProcesses = data.lotes.result[0].itens.map((field: any) => {
      const item = new ItemProcessEntity();

      item.quantidade = field.quantidade;
      item.valorReferencia = field.valorReferencia;
      item.descricao = field.descricao;
      item.participacao = field.participacao.codigo;
      item.codigo = field.codigo;
      item.processo = processo;

      return item;
    });
    return itemsProcesses;
  }
};
