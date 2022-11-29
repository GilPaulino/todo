const form = document.getElementById("nova-tarefa")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaTarefa(elemento)
})

form.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const nome = evento.target.elements['nome']
    
    const existe = itens.find( elemento => elemento.nome === nome.value)
    const tarefas = {
        "nome": nome.value
    }

    if (existe){
        tarefas.id = existe.id
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = tarefas
    } else {
        tarefas.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criaTarefa(tarefas)
        itens.push(tarefas)        
    }  
    
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value=""
})

function criaTarefa(item){
    
    const novaTarefa = document.createElement('li')
    novaTarefa.classList.add("tarefa")
    novaTarefa.innerHTML = item.nome
    novaTarefa.dataset.id = item.id

    novaTarefa.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novaTarefa)   
}

const buttonTrash = document.createElement('i')
buttonTrash.classList.add("far")
buttonTrash.classList.add("fa-trash-alt")

function botaoDeleta(id) {
    const botao = document.createElement("button")

    
    botao.innerText = 'x'

    botao.addEventListener("click", function(){
        deletaTarefa(this.parentNode, id)
    })
    return botao
}

function deletaTarefa(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id ===id), 1) 
    
    localStorage.setItem("itens", JSON.stringify(itens))
}