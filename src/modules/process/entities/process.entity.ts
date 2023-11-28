import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'processos' })
export class ProcessEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'codigo_licitacao', nullable: false })
  codigoLicitacao: number;

  @Column({ name: 'identificacao', nullable: false })
  identificacao: string;

  @Column({ name: 'numero', nullable: false })
  numero: string;

  @Column({ name: 'resumo', nullable: false })
  resumo: string;

  @Column({ name: 'situacao_edital', nullable: false })
  situacaoEdital: number;

  @Column({ name: 'status', nullable: false })
  status: number;

  @Column({ name: 'inicio_lances', nullable: false })
  inicioLances: Date;

  @CreateDateColumn({
    name: 'criado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  criado: Date;

  @UpdateDateColumn({
    name: 'atualizado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  atualizado: Date;
}
