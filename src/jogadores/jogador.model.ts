import { EntidadeBase } from "../shared/entidade.model.js";


//extends: Herança -- Implements: Interface

export class Jogador extends EntidadeBase{
  public nome: string;
  public peso: string;
  public altura: string;
  public time: string;
  public posicao: string;
  
  constructor(nome : string, peso: string, altura: string, time: string, posicao: string, id?: string){
    super();

    if(id){
      this.id = id;
     }

    this.nome = nome;
    this.peso = peso;
    this.altura = altura;
    this.time = time;
    this.posicao = posicao;
  }
  
}