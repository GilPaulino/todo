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
    
    const novaTarefa = document.createElement('div')
    novaTarefa.classList.add("tarefa")  
    
    const textoTarefa = document.createElement('p')   
    textoTarefa.innerHTML = item.nome
    textoTarefa.dataset.id = item.id  

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa-regular')
    deleteItem.classList.add('fa-trash-can') 


    lista.appendChild(novaTarefa)
    novaTarefa.innerHTML = `<input type="checkbox" class="checkbox" id="checkbox">`
    novaTarefa.appendChild(textoTarefa)
    novaTarefa.appendChild(botaoDeleta(deleteItem))         
}


//checkbox.checked = false

//console.log(checkbox)

function botaoDeleta(id) {
    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa-regular')
    deleteItem.classList.add('fa-trash-can')

    deleteItem.addEventListener("click", function(){
        deletaTarefa(this.parentNode, id)
    })

    return deleteItem
}

function deletaTarefa(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id ===id), 1) 
    
    localStorage.setItem("itens", JSON.stringify(itens))
}