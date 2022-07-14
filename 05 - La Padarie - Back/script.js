function visiblemodal(modalID) {
    const MODAL = document.getElementById(modalID)
    MODAL.classList.add('visible')
    MODAL.addEventListener('click', function(e) {
        if (e.target.id == modalID || e.target.className == 'button-modal') {
            MODAL.classList.remove('visible')

        }
    })

}
//Função chama o modal.

const BOTAOLISTA = document.querySelector('#botao-lista')
BOTAOLISTA.addEventListener('click', function() {
    visiblemodal('modal-container')
})

//Função do botão adicionar.






async function getClients() {
    const CLIENTS = await fetch(`http://localhost:3000/clientes`)
    const DATA = await CLIENTS.json()
    return DATA.response

}
//link com o servidor

const input_lista = document.getElementById('lista')

async function makehtlm() {
    const DATA = await getClients()
    DATA.forEach(response => {
        lista.innerHTML += `
        <section id="list-img-container"> 
                <div id="list-container">
                    <h4>${response.nome}</h4>
                    <div id="list-money-breads-container">
                        <p>Total de pães:<span class="decoration"> ${response.pães} pães.</span> </p>
                        <p>Total a pagar:<span class="decoration"> R$${response.pães * 0.5}</span></p>
                    </div>
                </div>
                <img id="list-img" onclick="remover(${response.id})" src="imgs/Lixo.svg" alt="Lixeira.">
            </section>
            
            `

    })
    total()
}

//Função de exibição



const ENVIAR = document.getElementById('button-enviar')
ENVIAR.addEventListener('click', async function add() {
    const input_names = document.getElementById('input-name')
    const input_breads = document.getElementById('input-breads')
    const DATApost = await fetch(`http://localhost:3000/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: input_names.value,
                pães: input_breads.value,
            }),

        })
        //Adicionar pessoas na fila
    if (input_breads > 0) {
        add()
        makehtlm()
    }
    //Só adiciona se o número de pães for positivo

    input_names.value = ""
    input_breads.value = ""
        //Limpa os imputs

})




async function remover(id) {
    const DATA = await getClients()
    const ID = body.id
    const DATAdelete = await fetch(`http://localhost:3000/clientes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: ID
        }),
    })

    total()
    makehtlm()
}
//Não consegui chamar pelo id
//Deleta pessoas da fila

async function total() {
    const DATA = await getClients()
    let entrada = 0
    let paes = 0
    let pessoas = 0
    const input_paes = document.getElementById('input-paes')
    const input_pessoas = document.getElementById('input-pessoas')
    const input_entrada = document.getElementById('input-entrada')

    DATA.forEach(response => {




        entrada += response.pães * 0.5
        paes += response.pães
        pessoas += 1



        input_paes.innerHTML = `
            <h3>${paes}</h3>
        `
        input_pessoas.innerHTML = `
            <h3>${pessoas}</h3>
        `
        input_entrada.innerHTML = `
            <h3>${entrada}</h3>

        `


    })
}
//Mostrar o status do total na fila.

makehtlm()
total()