import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Jogador } from "./jogador.model.js";
import { JogadorRepositoryLocalStorage } from "./jogador.repository.local-storage.js";

class JogadorPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtPeso: HTMLInputElement;
  private txtAltura: HTMLInputElement;
  private txtTime: HTMLInputElement;
  private txtPosicao: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private idSelecionado : string;

  constructor(private repositorioJogadores: IRepositorio<Jogador>,id?: string) {

    this.configurarElementos();

    if(id){
      this.idSelecionado = id;

      const jogadorSelecionado = this.repositorioJogadores.selecionarPorId(id);

      if(jogadorSelecionado){
        this.preencherFormulario(jogadorSelecionado);
      }
    }
  }


  private preencherFormulario(jogadorSelecionado: Jogador){
    this.txtNome.value = jogadorSelecionado.nome;
    this.txtPeso.value = jogadorSelecionado.peso;
    this.txtAltura.value = jogadorSelecionado.altura;
    this.txtTime.value = jogadorSelecionado.time;
    this.txtPosicao.value = jogadorSelecionado.posicao;
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtPeso = document.getElementById("txtPeso") as HTMLInputElement;
    this.txtAltura = document.getElementById("txtAltura") as HTMLInputElement;
    this.txtTime = document.getElementById("txtTime") as HTMLInputElement;
    this.txtPosicao = document.getElementById("txtPosicao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    // operador discard _
    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    
    const jogador = this.obterDadosFormulario();

    if(!this.idSelecionado){
      this.repositorioJogadores.inserir(jogador);
    }else{
      this.repositorioJogadores.editar(jogador.id, jogador);
    }


    
    // método para redirecionar usuario
    window.location.href = "jogador.list.html";
  }

  private obterDadosFormulario(): Jogador {
    const nome = this.txtNome.value;
    const peso = this.txtPeso.value;
    const altura = this.txtAltura.value;
    const time = this.txtTime.value;
    const posicao = this.txtPosicao.value;

    
    let jogador = null;

    if(!this.idSelecionado){
       jogador = new Jogador(nome,peso,altura,time,posicao);
    }else{
     jogador = new Jogador(nome, peso,altura,time,posicao, this.idSelecionado);
    }

    return jogador;
 }


}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new JogadorPaginaCadastro(new JogadorRepositoryLocalStorage(), id);