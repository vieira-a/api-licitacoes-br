import { Injectable } from '@nestjs/common';
import { mapProcess } from '../helpers/process.mapper';
import { fetchApi } from '../helpers/fetch-api';

@Injectable()
export class FetchProcessService {
  private processUrl: string = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos`;

  async fetchProcess() {
    const result = [];
    let currentPage = 1;
    const quantidadePaginas = 20;

    while (currentPage <= quantidadePaginas) {
      const newUrl = `${this.processUrl}?pagina=${currentPage}`;

      const newData = await fetchApi(newUrl);
      const mappedData = mapProcess(newData);
      result.push(...mappedData);
      currentPage++;
    }
    return result;
  }
}
