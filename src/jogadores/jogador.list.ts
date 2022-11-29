import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IPaginaListagem } from "../shared/pagina.list.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Jogador } from "./jogador.model.js";
import { JogadorRepositoryLocalStorage } from "./jogador.repository.local-storage.js";

class JogadorPaginaListagem implements IPaginaHTML, IPaginaListagem{
  tabela : HTMLTableElement;

    constructor(private repositorioJogadores: IRepositorio<Jogador>){
      this.configurarElementos();
      this.atualizarTabela();
    }

    configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
    }

    atualizarTabela(): void {
      const jogadores = this.repositorioJogadores.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      jogadores.forEach(jogador => {
        const novaLinha = corpoTabela.insertRow(); 

        Object.values(jogador).forEach((valor: any) =>{
           const novaCelula = novaLinha.insertCell();   

           novaCelula.innerText = valor;
        })

        const celulaBotoes = novaLinha.insertCell();

        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-primary me-2";

        btnEditar.addEventListener("click", ()=>{
          const idSelecionado = jogador.id;

          window.location.href = `jogador.create.html?id=${idSelecionado}`
        })

        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-warning me-2";

        btnExcluir.addEventListener("click", ()=>{
          const idSelecionado = jogador.id;

          this.repositorioJogadores.excluir(idSelecionado);

          window.location.reload();
        })

        celulaBotoes.appendChild(btnEditar);
        celulaBotoes.appendChild(btnExcluir);

      })
    }

}

new JogadorPaginaListagem(new JogadorRepositoryLocalStorage());