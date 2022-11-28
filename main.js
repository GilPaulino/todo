const form = document.getElementById("nova-tarefa");
const lista = document.getElementById("lista");

form.addEventListener("submit", (evento) =>{
    evento.preventDefault()

    criaTarefa(evento.target.elements['nome'].value)
})

function criaTarefa(nome){
    
    const novaTarefa = document.createElement('li')
    novaTarefa.classList.add("tarefa")

    novaTarefa.innerHTML = nome
    
    lista.appendChild(novaTarefa)
}