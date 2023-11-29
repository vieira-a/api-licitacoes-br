
# Extrator de Processos Licitatórios
Status: em desenvolvimento

## Contexto

Este projeto (apenas backend) tem como objetivo criar um banco de dados abrangente contendo informações sobre os processos licitatórios no Brasil. Um dos sistemas essenciais para essa integração é o [Portal de Compras Públicas](https://www.portaldecompraspublicas.com.br/processos). Os dois prints exibidos na seção de Telas deste documento executam solicitações (requests) que carregam os dados na interface do site, e esses dados serão extraídos para nosso banco de dados.

## Requisitos

1. **Utilização de Transações**: Todas as operações no banco de dados selecionado devem ser realizadas dentro de transações.

2. **Tecnologias Utilizadas**:
   - NestJS
   - TypeScript
   - PostgreSQL

## Objetivo

O objetivo principal deste projeto é criar um sistema de extração automática de processos e itens licitatórios, com as seguintes funcionalidades:

1. **Extração Automática de Processos e Itens**:
   - 1.1. A extração deve ocorrer automaticamente quatro vezes por dia e deve incluir apenas os processos dos próximos 30 dias.
   - 1.2. Deve-se considerar as diferenças entre cada extração. Isso significa que, se houver extrações às 14h e às 18h, a segunda extração deve levar em conta os processos novos que foram cadastrados e atualizá-los se houver mudanças após a primeira extração, além de excluir os processos que não existem mais.

2. **Rota para Forçar Extração via Chamada HTTP**:
   - 2.1. Deve haver uma rota HTTP que permita forçar a extração de processos imediatamente quando chamada. Certifique-se de verificar se já não há uma extração em execução e não permitir extrações simultâneas.

3. **Rota de Busca de Processos Extraídos**:
   - 3.1. Deve existir uma rota de busca que permita consultar os processos extraídos. Essa rota deve retornar os itens do processo junto com a solicitação.
   - 3.2. A rota deve aceitar filtros, como data de início do processo, número do processo, uma busca textual no campo "resumo" e uma busca textual no campo "descrição do item".
   - 3.3. A rota deve suportar paginação.

## Campos Obrigatórios na Importação

### Campos Obrigatórios para a Importação de Processos:
- [Referência de API](https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos?)
   - codigoLicitacao
   - identificacao
   - numero (número do processo)
   - resumo
   - codigoSituacaoEdital
   - status.codigo
   - dataHoraInicioLances (Data de início do processo)

### Campos Obrigatórios para a Importação de Itens do Processo:
- [Referência de API](https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/252073/itens?filtro=&pagina=1)
   - quantidade
   - valorReferencia
   - descricao
   - participacao.codigo
   - codigo


Autor: [Anderson Vieira](https://linkedin/in/vieira-a)
