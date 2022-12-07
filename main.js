const form = document.getElementById("nova-tarefa");
const contador = document.getElementById("contadorTarefa");
const contadorConcluidas= document.getElementById('contador-concluidas')
const contadorC = document.getElementById("contadorCriada");
const checkbox = document.getElementById("checkbox");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaTarefa(elemento);
});

var btn = document.querySelector("#refresh");
btn.addEventListener("click", function() {
    
    location.reload();
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  
  let quantidadeItem = itens.length;
  const quantidade = quantidadeItem;
  contador.innerText = quantidade;
  contadorC.innerHTML = quantidade;

  const nome = evento.target.elements["nome"];

  const existe = itens.find((elemento) => elemento.nome === nome.value);
  const tarefas = {
    nome: nome.value,
  };

  if (existe) {
    tarefas.id = existe.id;
    itens[itens.findIndex((elemento) => elemento.id === existe.id)] = tarefas;
  } else {
    tarefas.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    criaTarefa(tarefas);
    itens.push(tarefas);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
});

function criaTarefa(item) {
  const novaTarefa = document.createElement("div");
  novaTarefa.classList.add("tarefa");

  const textoTarefa = document.createElement("p");
  textoTarefa.classList.add('paragrafo')
  textoTarefa.innerHTML = item.nome;
  textoTarefa.dataset.id = item.id;

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  

  lista.appendChild(novaTarefa);
  novaTarefa.innerHTML = `<label class="containerCheck"><input type="checkbox" class="checkbox" id="checkbox"><span class="check"></span></label>`;
  novaTarefa.appendChild(textoTarefa);
  novaTarefa.appendChild(botaoDeleta(deleteItem));

  let quantidadeItem = itens.length;
  const quantidade = quantidadeItem;
  contador.innerText = quantidade;
  contadorC.innerHTML = quantidade;


  localStorage.setItem("itens", JSON.stringify(itens));
}

function checkItem(id) {
  checkbox.addEventListener("click", function () {
    checkedItem(this.parentNode, id).checked;

  });

  return checkbox;
}

function checkedItem(tag, id) {
  tag.status();
  itens.status(itens.findIndex((elemento) => elemento.id === id).cheked);
  localStorage.setItem("itens", JSON.stringify(itens));
}

function botaoDeleta(id) {
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", function () {
    deletaTarefa(this.parentNode, id);
    let quantidadeItem = itens.length;
    const quantidade = quantidadeItem;
    contador.innerText = quantidade;
    contadorC.innerHTML = quantidade;
  });

  return deleteItem;
}

function deletaTarefa(tag, id) {
  tag.remove();
  itens.splice(itens.findIndex((elemento) => elemento.id === id),1);

  localStorage.setItem("itens", JSON.stringify(itens));
}