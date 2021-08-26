export interface Atividade {
  idAtividade: number;
  titulo: string;
  descAtividade: string;
  descTipo: string;
  finalizada: boolean;
  idTipo?: number;
}

export type Atividades = Array<Atividade>;
