function visiblemodal(modalID) {
    const MODAL = document.getElementById(modalID)
    MODAL.classList.add('visible')
    MODAL.addEventListener('click', function(e) {
        if (e.target.id == modalID || e.target.className == 'button-modal') {
            MODAL.classList.remove('visible')

        }
    })

}

//Função para chamar o modal.

const BOTAOLISTA = document.querySelector('#botao-lista')
BOTAOLISTA.addEventListener('click', function() {
    visiblemodal('modal-container')
})

//Função do botão adicionar.

let lista = []


let entrada = 0
let paes = 0
let pessoas = 0

const ENVIAR = document.getElementById('button-enviar')
ENVIAR.addEventListener('click', function() {
    const input_names = document.getElementById('input-name')
    const input_breads = document.getElementById('input-breads')
    const clientes = {
        nome: input_names.value,
        paes: input_breads.value * 1,
        numero: lista.length,
        dinheiro: input_breads.value * 0.5,
    }
    lista.push(clientes)
    input_names.value = ""
    input_breads.value = ""


    //Adicionar pessoas na fila

    if (clientes.paes > 0) {
        atualizarflia()
        total()
    }

})

function total() {
    let input_paes = document.getElementById('input-paes')
    let input_pessoas = document.getElementById('input-pessoas')
    let input_entrada = document.getElementById('input-entrada')

    entrada = 0
    paes = 0
    pessoas = lista.length

    for (let i = 0; i < lista.length; i++) {
        entrada += lista[i].dinheiro
    }

    for (let i = 0; i < lista.length; i++) {
        paes += lista[i].paes
    }

    input_paes.innerHTML = `
        <h3>${paes}</h3>
    `
    input_pessoas.innerHTML = `
        <h3>${pessoas}</h3>
    `
    input_entrada.innerHTML = `
        <h3>${entrada}</h3>

    `
        //Mostrar o status do total na fila.
}

function atualizarflia() {
    const input_lista = document.getElementById('lista')

    input_lista.innerHTML = ''
    lista.forEach((clientes) => {
            input_lista.innerHTML += `
            <section id="list-img-container"> 
                <div id="list-container">
                    <h4>${clientes.nome}</h4>
                    <div id="list-money-breads-container">
                        <p>Total de pães:<span class="decoration"> ${clientes.paes} pães.</span> </p>
                        <p>Total a pagar:<span class="decoration"> R$${clientes.dinheiro}</span></p>
                    </div>
                </div>
                <img id="list-img" onclick="remover(${clientes.numero})" src="imgs/Lixo.svg" alt="Lixeira.">
            </section>
            
            `
        })
        //cria a fila
}

function remover(numero) {
    lista.splice(numero, 1)
    for (let i = numero; i < lista.length; i++) {
        lista[i].posicao--;
    }

    total()
    atualizarflia()
}