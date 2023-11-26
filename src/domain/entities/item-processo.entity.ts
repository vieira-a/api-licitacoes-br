import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'itens_processos' })
export class ProcessosEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'valorReferencia', nullable: false })
  valorReferencia: number;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'participacao', nullable: false })
  participacao: number;

  @Column({ name: 'codigo', nullable: false })
  codigo: number;

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
