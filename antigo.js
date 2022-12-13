CriarTodasTarefas();
VerificaConcluidas();

const form = document.getElementById("nova-tarefa");
const contador = document.getElementById("contadorTarefa");
const contadorConcluidas = document.getElementById("contador-concluidas");
const contadorC = document.getElementById("contadorCriada");
const checkbox = document.getElementById("checkbox");
const containerTarefa = document.getElementById("containerTarefas");
let listaVazia = document.getElementById("listaVazia");
const lista = document.getElementById("lista");
const filtro = document.getElementById("filtro");
var tarefa = document.querySelectorAll(".tarefa");
const itens = JSON.parse(localStorage.getItem("itens")) || []; //Verifica se tem itens amarzenados no localStorage, se não ele deixa o Array vazio;


let filtroAplicado = "todas";
//Iniciando o contador com '0'
let concluidas = 0;

// Garante que o 'DOM' esteja antes de qualquer código
// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     CriarTodasTarefas();
//     VerificaConcluidas();
//   },
//   false
// );

// Cria as tarefas no html
const CriarTodasTarefas = () => {
  LimparLista();

  //Responsavel por percorrer no Array e verificar o status dos meus itens  e aplicar o filtro
  itens.forEach((elemento) => {
    //Usando 'todas' como padrão;
    if (filtroAplicado == "todas") criaTarefa(elemento);
    //Se o status da tarefa for concluida ele aplica o fitro de tarefas 'feitas'
    else if (elemento.checked == true && filtroAplicado === "feitas")
      criaTarefa(elemento);
    //se o status da tarefa nao for marcado como checked ele aplica o filtro de tarefas 'ativas'
    else if (!elemento.checked && filtroAplicado == "ativas")
      criaTarefa(elemento);
  });  
};

// Limpa as tarefas no html// Sempre que marcava um item como feito, ele duplicava as tarefas ativas na pagina;
const LimparLista = () => {
  lista.innerHTML = "";
};

// Filtro aplicado;
const Filtro = (e) => {
  filtroAplicado = e;
  CriarTodasTarefas();
};

//Adicionando evento de submit ao formulário;
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //Interrompe o comportamento padrão do evento;
  //location.reload();

  const nome = evento.target.elements["nome"]; //Pegando o alvo do evento;

  const existe = itens.find((elemento) => elemento.nome === nome.value);
  const tarefas = {    
    nome: nome.value,
    checked: false, //Inicia minha tarefa com o 'checked:false';
  };

  if (existe) {
    tarefas.id = existe.id;
    itens[itens.findIndex((elemento) => elemento.id === existe.id)] = tarefas;
  } else {
    tarefas.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    criaTarefa(tarefas); //Cria a tarefa;
    itens.push(tarefas); //Insere a tarefa no array;
  }

  localStorage.setItem("itens", JSON.stringify(itens)); //Mandando para o localStorage/So armazena 'string'(texto);

  nome.value = ""; //Mantendo o input vazio após adicionar uma tarefa;
});

//Adiciona as tarefas à lista
function criaTarefa(item) {
  // Responsavel por alterar o display da 'listaVazia' e do 'filtro';
  if (tarefa.lenght === 1) {
    listaVazia.style.display = "block";
    filtro.style.display = "none";
  } else {
    filtro.style.display = "block";
    listaVazia.style.display = "none";
  }  
 
  //Criação das 'div's' responsaveis por conter os conteudos das tarefas;
  const novaTarefa = document.createElement("div");
  novaTarefa.classList.add("tarefa");

  //Paragrafo responsavel por conter o conteudo da tarefa;
  const textoTarefa = document.createElement("p");
  textoTarefa.classList.add("decricao");
  textoTarefa.innerHTML = item.nome;
  textoTarefa.dataset.id = item.id;

  //Icones da lixeira responsavel para remover as tarefas;
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  //Responsavel por chamar toda a função que vai criar as tarefas;
  containerTarefa.appendChild(lista);
  lista.appendChild(novaTarefa);

  // Chamando a função de criar a 'div' que contem o checkbox, o conteudo da tarefa e o icone da lixeira;
  //Função 'marcar' recebe o id o item, vai no array e muda o status
  novaTarefa.innerHTML = `<label class="containerCheck"><input type="checkbox" class="checkbox" id="checkbox"><span class="check ${
    item.checked ? "checked" : ""
  }" checked=${item.checked} onclick="marcar(${item.id});"></span></label>`; //Adicionando 'Template String" na tag 'span' para validar o checkbox;
  novaTarefa.appendChild(textoTarefa);
  novaTarefa.appendChild(botaoDeleta(deleteItem));

  //Atualiza o contador sempre que uma tarefa é adicionada a lista;
  let quantidadeItem = itens.length;
  const quantidade = quantidadeItem;
  contador.innerText = quantidade;
  contadorC.innerHTML = quantidade;
  

  localStorage.setItem("itens", JSON.stringify(itens)); //Armazena no localStorage;
}

// Função que a muda o status;
const marcar = (index) => { 
  // Altera a status
  itens[index].checked = !itens[index].checked; 
   

  if(itens[index].checked === true){

    console.log(itens[index].id) 
    
}

  // Salva no localstorage;
  localStorage.setItem("itens", JSON.stringify(itens)); //Armazena no localStorage;

  // Atualiza a lista e o contador na página;
  CriarTodasTarefas();
  VerificaConcluidas();  
};


// Faz a contagem de todas as tarefas que estão concluídas;
const VerificaConcluidas = () => {
  // Iniciando a variável ;
  concluidas = 0;

  itens.forEach((i) => {
    if (i.checked)
      // Somando ao contador se tiver marcado;
      concluidas += 1;
  });
  // Atualizando o contador de concluidas;
  if (contadorConcluidas) contadorConcluidas.innerHTML = concluidas;
};

//Aplicação da função 'deletaTarefa';
function botaoDeleta(id) {
  //Icones da lixeira responsavel para remover as tarefas;
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");
  //Evento de click no icone da lixeira;
  deleteItem.addEventListener("click", function () {
    deletaTarefa(this.parentNode, id); //Aplica a função 'deletaTarefa' no item selecionado.. 'this.parentNode': retorna o nome do nó pai do nó selecionado como um objeto;
    //location.reload(); //Responsavel por dar o Refresh na página;
  });
  //Retorno da Função;
  return deleteItem;
}

//Função para do botãto Deleta;
function deletaTarefa(tag, id) {
  tag.remove();
  //Remove o tarefa;
  itens.splice(
    itens.findIndex((elemento) => elemento.id === id),
    1
  );

  localStorage.setItem("itens", JSON.stringify(itens));
}