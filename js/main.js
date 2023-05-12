/* OBSERVAÇÃO!!!
* para uma melhor organização a manipulação toda a manipulção do css é via classe e do js via id 
*/

// ../node_modules/sweetalert2/dist/sweetalert2.css

// import Swal from "node_modules/sweetalert2/dist/sweetalert2.js"

// import "node_modules/sweetalert2/src/sweetalert2.scss"

const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

/** form cadastrar itens nome e quantidade */
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value ) /** buscar o elemento comparando no localStorage */

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (nome.value != '' && quantidade.value != '') { 
        if (existe) {
            itemAtual.id = existe.id
            
            atualizaElemento(itemAtual)

            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        } else {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

            criaElemento(itemAtual)

            itens.push(itemAtual) /** acrescenta um novo elemento na ultima linha do array */

            Swal.fire({
                icon: 'success',
                title: 'Registrado',
                footer: '<h3>Novo item Cadastrado com Sucesso!</h3>',
            })
        }

        localStorage.setItem("itens", JSON.stringify(itens))

       limpaCamposFormulario(evento)

    } else {
        if(nome.value === '') {
            nome.focus();
            Swal.fire({
                icon: 'error',
                title: 'Não registrado',
                footer: '<h3>Campo NOME não preenchido</h3>',
            })
        } else if (quantidade.value === '') {
            quantidade.focus();
            Swal.fire({
                icon: 'error',
                title: 'Não registrado',
                footer: '<h3>Campo QUANTIDADE não preenchido</h3>',
            })
        } 
    }
})

/** cria uma nova linha na pagina */
function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

/** atualiza a linha selecionada na pagina */
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.classList.add("btn-deleta") /** no css existe uma classe btn-deleta */
    elementoBotao.innerText = "Excluir"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id) /** apartir do elemento clicado obtem o elemto pai this.parentNode */
    })

    return elementoBotao
}

/** deleta a linha selecionada na pagina */
function deletaElemento(tag, id) {
    tag.remove() /** remove o elemento selecionado no html */

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens)) /** remove o id selecionado no localStorage */
}

function limpaCamposFormulario(evento) {
    nome.value = ""
    quantidade.value = ""
}