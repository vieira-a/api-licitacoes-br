import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProcessEntity } from '../../process/entities/process.entity';

@Entity({ name: 'itens_processos' })
export class ItemProcessoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'valor_referencia', nullable: false })
  valorReferencia: number;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'participacao', nullable: false })
  participacao: number;

  @Column({ name: 'codigo', nullable: false })
  codigo: number;

  @OneToOne(() => ProcessEntity)
  @JoinColumn({ name: 'processo', referencedColumnName: 'codigoLicitacao' })
  processo: ProcessEntity;

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
