import { ProcessEntity } from '../entities/process.entity';

export const mapProcess = (data: any): any => {
  const processes = data.result.map((field: any) => {
    const process = new ProcessEntity();

    process.codigoLicitacao = field.codigoLicitacao;
    process.identificacao = field.identificacao;
    process.numero = field.numero;
    process.resumo = field.resumo;
    process.situacaoEdital = field.situacao.codigo;
    process.status = field.status.codigo;
    process.inicioLances = field.dataHoraInicioLances;
    return process;
  });
  return processes;
};
