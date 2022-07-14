import {useState , useEffect} from 'react'

const getPokemon = async(url) =>{
    try{
      const response = await fetch(url)
      const data = await response.json()
      return data
    }
    catch (error) {
      return {error:error.message}
    }
  }

  function Card({url}) {
    const [Pokemon, setPokemon] = useState({})

    useEffect( () => { 
        getPokemon(url).then(data => setPokemon(data))
      },[url])
    
      return(
        Pokemon && (
            <div className='cardContainer'>
                <div className='nameTypeContainer'>
                  <div className='Name'> {Pokemon.name}</div>
                  <div className='typesContainer'> {Pokemon?.types?.map((type) =>
                
                  { return <div className='types'>{type.type.name}</div>

                  })}</div>
                </div>
                
                <img className='pokemonImg' src={Pokemon?.sprites?.front_default} alt=" Imagem do pokemon." />
            </div>
            
        )
            
        
      )
  }

export default Card