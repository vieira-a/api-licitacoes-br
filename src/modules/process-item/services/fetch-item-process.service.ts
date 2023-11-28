import { Injectable } from '@nestjs/common';
//import { ItemProcessEntity } from '../entities/item-process.entity';
import { mapProcessItem } from '../helpers/item-process-mapper';

@Injectable()
export class FetchItemProcessService {
  private processUrl: string = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao`;

  async fetchItemProcess() {
    const codigoLicitacao = 256752;
    const request = await fetch(`${this.processUrl}/${codigoLicitacao}/itens`);
    const data = await request.json();
    console.log(mapProcessItem(data, codigoLicitacao));
  }
}
