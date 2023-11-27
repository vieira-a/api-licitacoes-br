import { Injectable } from '@nestjs/common';
import { mapProcess } from '../helpers/process.mapper';
import { fetchApi } from '../helpers/fetch-api';
import { ProcessEntity } from '../entities/process.entity';

@Injectable()
export class FetchProcessService {
  private processUrl: string = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos`;

  async fetchProcess(): Promise<ProcessEntity[]> {
    const currentDate = new Date();
    let currentPage = 1;
    const intervalDate = new Date();
    intervalDate.setDate(currentDate.getDate() + 1);

    const data = await fetchApi(
      `${
        this.processUrl
      }?pagina=${currentPage}&dataInicial=${currentDate.toISOString()}&dataFinal=${intervalDate.toISOString()}&tipoData=1`,
    );

    console.log('Página corrente', currentPage);
    console.log('Quantidade de páginas', data.pageCount);

    const result = [];

    const quantidadePaginas = data.pageCount;

    while (currentPage <= quantidadePaginas) {
      const newUrl = `${
        this.processUrl
      }?pagina=${currentPage}&dataInicial=${currentDate.toISOString()}&dataFinal=${intervalDate.toISOString()}&tipoData=1`;
      console.log(newUrl);

      const newData = await fetchApi(newUrl);
      const mappedData = await mapProcess(newData);
      result.push(...mappedData);

      currentPage++;
    }
    return result;
  }
}
