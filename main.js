const todasTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const containerDescricao = document.querySelector("#containerDescricao");
containerDescricao.addEventListener("submit", (adicionaTarefa) => {
  adicionaTarefa.preventDefault();

  const descricao = adicionaTarefa.target.elements["descricao"];

  const existeTarefa = todasTarefas.find((lista) => lista.descricao === descricao.value);

  const tarefas = {        
    tarefas: descricao.value,
    checked: false,
  };

  if (existeTarefa){    
    tarefas.id = existeTarefa.id
    todasTarefas[itens.findIndex((lista) => lista.id === existeTarefa.id)] = tarefas;
  }else{
    tarefas.id = todasTarefas[todasTarefas.length - 1] ? todasTarefas[todasTarefas.length - 1].id +1 : 0;
    criaTarefa(tarefas); 
    todasTarefas.push(tarefas);
} 

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));

  descricao.value = "";
});

const criaTarefa = (afazer, condicao= "") => {
  const tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  tarefa.dataset.id = afazer.id
  tarefa.innerHTML = `
    <label class="containerVerificacao">
    <input type="checkbox" ${condicao}>
    <span class="verifica" ></span> </label>    

    <p id="descricaoTarefa"class="descricaoTarefa">${afazer.tarefas}</p>

    <i class="fa-regular fa-trash-can"></i>`;

  document.getElementById("tarefas").appendChild(tarefa);

};


todasTarefas.map((tarefas) => {
    criaTarefa(tarefas);  
});