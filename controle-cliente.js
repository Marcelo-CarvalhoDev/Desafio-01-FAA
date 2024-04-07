

const URL = 'http://localhost:3400/clientes';

let listaClientes = [];
let btnAdicionar = document.querySelector('#btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"));

let formModal = {
    id: document.querySelector("#id"),
    nome: document.querySelector("#nome"),
    email: document.querySelector("#email"),
    telefone: document.querySelector("#telefone"),
    cpf: document.querySelector("#cpf"),
    dataCadastro: document.querySelector("#dataCadastro"),
    btnSalvar: document.querySelector("#btn-salvar"),
    btnCancelar: document.querySelector("#btn-cancelar"),
}

btnAdicionar.addEventListener("click", () => {
    limparModalCliente();
    modalCliente.show();
});

function obterClientes() {
    fetch(URL, {
        method: 'GET',
        headers: {
            "Authorization": obterToken()
        }
    })
        .then(response => response.json())
        .then(clientes => {
            listaClientes = clientes;
            popularTabela(clientes);
        })
        .catch((erro) => { });
}

obterClientes();

function popularTabela(clientes) {
    //Limpando a tabela para popular
    tabelaCliente.textContent = '';

    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente);
    });


}

function criarLinhaNaTabela(cliente) {

    // Criando uma linha na tabela
    let tr = document.createElement('tr');
    // Criar as tds dos conteudos da tabela
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');


    // Atualizar as tds com base no cliente
    tdId.textContent = cliente.id;
    tdNome.textContent = cliente.nome;
    tdCPF.textContent = cliente.cpfOuCnpj;
    tdEmail.textContent = cliente.email;
    tdTelefone.textContent = cliente.telefone;
    tdDataCadastro.textContent = new Date(cliente.dataCadastro).toLocaleDateString();
    


    // Adicionar as TDs à Tr
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    // Adicionar a tr na tabela

    tabelaCliente.appendChild(tr);

}

formModal.btnSalvar.addEventListener('Click', () => {

    // 1st Capturar os dados da tela do modal
    let cliente = obterClientedoModal();
    // 2nd Verificar se os campos obrigatorios foram preenchidos

    if (!cliente.validar()) {
        alert("E-mail e CPF são obrigatórios");
        return;
    }
    // 3th Adicionar na api - backend
    adicionarClienteNoBackEnd(cliente);
});


function obterClientedoModal() {
    return new Cliente({
        id: formModal.id.value,
        email: formModal.email.value,
        nome: formModal.nome.value,
        cpfOuCnpj: formModal.cpfOuCnpj.value,
        telefone: formModal.telefone.value,
        dataCadastro: (formModal.dataCadastro.value)
            ? new Date(formModal.dataCadastro.value).toISOString()
            : new Date().toISOString()
        //If e Else gourmet, se estiver certo me manda o ? se estiver errado, :

    });
}

function adicionarClienteNoBackEnd(cliente) {

    fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: obterToken(),
            'Contente-Type': "application/json"
        },
        body: JSON.stringify(cliente)
    })
        .then(response => response.json())
        .then(response => {
            let novoCliente = new Cliente(response);
            listaClientes.push(novoCliente);

            popularTabela(listaClientes);

            // Fechar o Modal

            modalCliente.hide();

            alert('Cliente ${cliente.nome}, foi cadastrado com sucesso!')
        })
}

function limparModalCliente() {
    formModal.id.value = "";
    formModal.nome.value = "";
    formModal.cpf.value = "";
    formModal.email.value = "";
    formModal.telefone.value = "";
    formModal.dataCadastro.value = "";
}