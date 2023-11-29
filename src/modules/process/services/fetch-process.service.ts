import { Injectable } from '@nestjs/common';
import { mapProcess } from '../helpers/process.mapper';
import { fetchApi } from '../../../shared/helpers/fetch-api';
import { ProcessEntity } from '../entities/process.entity';

@Injectable()
export class FetchProcessService {
  private processUrl: string = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos`;

  async fetchProcess(): Promise<ProcessEntity[]> {
    const currentDate = new Date();
    const intervalDate = new Date();
    intervalDate.setDate(currentDate.getDate() + 0);

    const initialData = await fetchApi(
      `${
        this.processUrl
      }?pagina=1&dataInicial=${currentDate.toISOString()}&dataFinal=${intervalDate.toISOString()}&tipoData=1`,
    );

    const quantidadePaginas = initialData.pageCount;
    const promises = [];

    for (let currentPage = 1; currentPage <= quantidadePaginas; currentPage++) {
      const newUrl = `${
        this.processUrl
      }?pagina=${currentPage}&dataInicial=${currentDate.toISOString()}&dataFinal=${intervalDate.toISOString()}&tipoData=1`;

      promises.push(fetchApi(newUrl));
    }

    const allPagesData = await Promise.all(promises);
    const result = allPagesData.reduce((acc, data) => {
      const mappedData = mapProcess(data);
      return [...acc, ...mappedData];
    }, []);

    return result;
  }
}
