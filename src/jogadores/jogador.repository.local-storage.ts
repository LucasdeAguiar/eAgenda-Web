import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Jogador } from "./jogador.model.js";


export class JogadorRepositoryLocalStorage implements IRepositorio<Jogador>, IRepositorioSerializavel {
  private readonly localStorage: Storage;

  private jogadores: Jogador[];

  constructor() {
    this.localStorage = window.localStorage;

    this.jogadores = this.selecionarTodos();
  }

  public gravar(): void {
    const jogadoresJsonString = JSON.stringify(this.jogadores);

    this.localStorage.setItem("jogadores", jogadoresJsonString);
  }

  public inserir(registro: Jogador): void {

    registro.id = new Guid().gerarNovoId();

    this.jogadores.push(registro);
    this.gravar();
  }

  public editar(id: string, registroEditado: Jogador): void {
    const indexSelecionado = this.jogadores.findIndex(x => x.id === id);

    this.jogadores[indexSelecionado] = {
      id: id,
      nome: registroEditado.nome,
      peso: registroEditado.peso,
      altura: registroEditado.altura,
      time: registroEditado.time,
      posicao: registroEditado.posicao
    }

    this.gravar();
  }

  public excluir(id: string): void {
    this.jogadores = this.jogadores.filter(x => x.id !== id);

    this.gravar();
  }

  public selecionarTodos(): Jogador[] {
    const dados = this.localStorage.getItem("jogadores");

    if (!dados)
      return [];

    return JSON.parse(dados);
  }

  public selecionarPorId(id: string): Jogador | undefined {
    return this.jogadores.find(x => x.id === id);
  }

}