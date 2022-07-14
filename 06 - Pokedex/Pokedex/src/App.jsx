import {useState , useEffect} from 'react'
import './App.css'
import Card from './components/Card'

const getAll = async() =>{
  try{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json()
    return data
  }
  catch (error) {
    return {error:error.message}
  }
}
//Cria um array com todos os itens da api


function App() {

  const [allPokemon, setAllPokemon] = useState([])
  
  useEffect( () => {
    getAll().then(data => setAllPokemon(data.results))
  },[])


  async function search(){
    const text = document.querySelector('.searchInput')
    const name = text.value
    const item = [{
      url:'https://pokeapi.co/api/v2/pokemon/' + name
    }]
    setAllPokemon(item)
  }
  //Função de busca

  return (
    <body>
    
    <header>
      <a href="index.html"><img className='logoImg' src="./src/imgs/Logo.svg" alt="Logo da página. O contorno de uma pokebola em vermelho." /></a>
    </header>
    <section>
      <div className='searchBar'> 
        <input type="text" className='searchInput' placeholder='Pesquisar pokémon' />
        <img className='iconImg' src="./src/imgs/Icon.svg" alt="Lupa de busca." onClick={()=>search()} />
      </div>
      <h1>Pokédex</h1>
      <div className='pokemonCard'>
        
       {
         allPokemon.map((e) => {
          return <Card url={e.url} />
          })
        //mostra o card do pokemon

        
        } 
       
      </div>
    </section>
    <footer>
      <p>Com 💛 Info Jr UFBA 2022</p>
    </footer>
      
    </body>
  )
}

export default App
