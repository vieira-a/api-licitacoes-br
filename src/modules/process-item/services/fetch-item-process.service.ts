import { Injectable } from '@nestjs/common';
import { ItemProcessRepository } from '../repositories/process-item.repository';
import { ProcessRepository } from '../../process/repositories/process.repository';
import { fetchApi } from 'src/modules/process/helpers/fetch-api';
import { mapProcessItem } from '../helpers/item-process-mapper';

@Injectable()
export class FetchItemProcessService {
  private processItemUrl: string = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao`;
  constructor(
    private readonly itemProcessRepository: ItemProcessRepository,
    private readonly processRepository: ProcessRepository,
  ) {}

  async fetchItemProcess() {
    const codes = await this.processRepository.findAllCodes();
    const allPromises = [];

    for (const code of codes) {
      const initialData = await fetchApi(
        `${this.processItemUrl}/${code}/itens`,
      );

      let quantidadePaginas = 1;

      if (initialData.isLote === false) {
        quantidadePaginas = initialData.itens.pageCount;
      } else if (initialData.isLote === true) {
        quantidadePaginas = initialData.lotes.pageCount;
      }

      const promiseUrl = [];
      for (
        let currentPage = 1;
        currentPage <= quantidadePaginas;
        currentPage++
      ) {
        const newUrl = `${this.processItemUrl}/${code}/itens?pagina=${currentPage}`;
        promiseUrl.push(fetchApi(newUrl));
      }

      allPromises.push(
        Promise.all(promiseUrl).then((allPagesData) => {
          const result = allPagesData.flatMap((data) =>
            mapProcessItem(data, code),
          );
          return result;
        }),
      );
    }

    const flatAllPromises = await Promise.all(allPromises);
    const flatResult = flatAllPromises.flat();
    return flatResult;
  }
}
