import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'processos' })
export class ProcessosEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'codigoLicitacao', nullable: false })
  codigoLicitacao: number;

  @Column({ name: 'identificacao', nullable: false })
  identificacao: string;

  @Column({ name: 'numero', nullable: false })
  numero: string;

  @Column({ name: 'resumo', nullable: false })
  resumo: string;

  @Column({ name: 'codigoSituacaoEdital', nullable: false })
  codigoSituacaoEdital: number;

  @Column({ name: 'status', nullable: false })
  status: number;

  @Column({ name: 'dataHoraInicioLances', nullable: false })
  dataHoraInicioLances: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
