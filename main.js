const todasTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const icone = document.getElementsByClassName("fa-regular");
const quantidadeConcluida = document.getElementById('quantidadeConcluida');
const tarefas = document.getElementById('tarefas')
const containerDescricao = document.getElementById("containerDescricao");
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
    atualizaContador();
    atualizaContadorConcluidas();  
    ocultarListaFiltro(); 

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));

  descricao.value = "";
});

const criaTarefa = (afazer, condicao= "") => {   

  const tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  tarefa.dataset.id = afazer.id
  tarefa.innerHTML = `
    <label class="containerVerificacao">
    <input type="checkbox">
    <span class="verifica" ${condicao} class="check ${afazer.checked ? "checked" : ""}" checked=${afazer.checked} onclick=" marcaTarefa (${afazer.id});"></span> 
    </label>    

    <p id="descricaoTarefa"class="descricaoTarefa">${afazer.tarefas}</p>`;
    
    tarefas.appendChild(tarefa);
    tarefa.appendChild(lixeira(icone));

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));  
}

function atualizaContador() {
  const quantidadeTarefa = document.getElementById('quantidadeTarefa');
  const quantidadeTarefas = document.getElementById('quantidadeTarefas');
  
  quantidadeTarefa.innerHTML = todasTarefas.length;
  quantidadeTarefas.innerText = todasTarefas.length; 
}

function ocultarListaFiltro(){ 

const listaVazia = document.getElementById('listaVazia');
const containerFiltro = document.getElementById('containerFiltro');

  containerFiltro.style.display ='block'
  listaVazia.style.display ='none' 
  
    if (todasTarefas.length === 0){
      containerFiltro.style.display ='none'
      listaVazia.style.display='block'
    }
} 

const marcaTarefa = (condicao) =>{

  todasTarefas[condicao].checked = !todasTarefas[condicao].checked;
  
  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));
  atualizaContadorConcluidas();
  filtrarTarefas();
}

function atualizaContadorConcluidas (){
  let concluidas = 0;
  todasTarefas.forEach((condicao) =>{
    if(condicao.checked)
    concluidas +=1;
  });

  if(quantidadeConcluida){
    quantidadeConcluida.innerHTML = concluidas;
  } 
}

function lixeira (id) {
  const icone = document.createElement('i');
  icone.classList.add('fa-regular');
  icone.classList.add('fa-trash-can');

  icone.addEventListener("click" , function (){
    deletaTarefa(this.parentNode, id)
  })    
  return icone
}

function deletaTarefa(tag, id){
  tag.remove();
  todasTarefas.splice(todasTarefas.findIndex((tarefa) => tarefa.id === id), 1);    
  atualizaContador ();
  atualizaContadorConcluidas();  
  ocultarListaFiltro();  

  localStorage.setItem("tarefas", JSON.stringify(todasTarefas));
}
let tarefaFiltrada = "todas";
const filtrarTarefas = () =>{
  tarefas.innerHTML = "";

  

  todasTarefas.forEach((tarefas) =>{
    if (tarefaFiltrada =="todas"){
      criaTarefa(tarefas);
    } else if(tarefas.checked == true && tarefaFiltrada == "feitas"){
      criaTarefa(tarefas);
    }else if(!tarefas.checked && tarefaFiltrada == "ativas"){
      criaTarefa(tarefas);
    }
  });
};

const filtrar = (tarefas) => {  
  tarefaFiltrada = tarefas;
  filtrarTarefas();
}

todasTarefas.map((tarefas) => {
  criaTarefa(tarefas);       
  atualizaContador(); 
  atualizaContadorConcluidas();  
  ocultarListaFiltro();     
});