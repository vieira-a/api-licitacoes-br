import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'itens_processos' })
export class ItemProcessEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: string;

  @Column({ name: 'valor_referencia', nullable: false })
  valorReferencia: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'participacao', nullable: false })
  participacao: number;

  @Column({ name: 'codigo', nullable: false })
  codigo: number;

  @Column({ name: 'processo', nullable: false })
  processo: number;

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
