const todasTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const listaVazia = document.getElementById('listaVazia');
const filtro = document.getElementById('containerFiltro');
const icone = document.getElementsByClassName("fa-regular");
let listaTarefa = document.querySelectorAll(".tarefa");
const quantidadeTarefa = document.getElementById('quantidadeTarefa');
const quantidadeTarefas = document.getElementById('quantidadeTarefas')

const containerDescricao = document.querySelector("#containerDescricao");
containerDescricao.addEventListener("submit", (adicionaTarefa) => {
  adicionaTarefa.preventDefault();
  
  const descricao = adicionaTarefa.target.elements["descricao"];

  const existeTarefa = todasTarefas.find((tarefa) => tarefa.descricao === descricao.value);

  const tarefas = {        
    tarefas: descricao.value,
    checked: false,
  };

  if (existeTarefa){      
    tarefas.id = existeTarefa.id        
  }else{
    tarefas.id = todasTarefas[todasTarefas.length - 1] ? todasTarefas[todasTarefas.length - 1].id +1 : 0;
    criaTarefa(tarefas);    
    todasTarefas.push(tarefas);
} 

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));

  descricao.value = "";
});

const criaTarefa = (afazer, condicao= "") => {

  if (listaTarefa.length === 1 ){  
    filtro.style.display = 'block';  
    listaVazia.style.display = 'block';    
  }else{
    filtro.style.display = 'block';
    listaVazia.style.display ='none';    
  }

  const tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  tarefa.dataset.id = afazer.id
  tarefa.innerHTML = `
    <label class="containerVerificacao">
    <input type="checkbox" ${condicao}>
    <span class="verifica" ></span> </label>    

    <p id="descricaoTarefa"class="descricaoTarefa">${afazer.tarefas}</p>

    <i class="fa-regular fa-trash-can" ></i>`;

  document.getElementById("tarefas").appendChild(tarefa);
  // tarefa.appendChild(lixeira(afazer.id))
  quantidadeTarefa.innerText = todasTarefas.length;
  quantidadeTarefas.innerText = todasTarefas.length;

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));
};

todasTarefas.map((tarefas) => {
  criaTarefa(tarefas); 
});

// function lixeira (id){

//   const icone = document.getElementsByClassName('fa-regular')
//   icone.addEventListener("click", function () {
//     deletaTarefa(this.parentNode,id)
//   })
//   return icone
// }

// function deletaTarefa(tag, id){
//   tag.remove();

//   console.log(id)
// }

