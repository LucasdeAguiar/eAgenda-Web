import { EntidadeBase } from "../shared/entidade.model.js";
//extends: Herança -- Implements: Interface
export class Contato extends EntidadeBase {
    constructor(nome, email, telefone, empresa, cargo, id) {
        super();
        if (id) {
            this.id = id;
        }
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.empresa = empresa;
        this.cargo = cargo;
    }
}
