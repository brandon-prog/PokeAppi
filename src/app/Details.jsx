import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"

function Details() {
   const params = useParams()
   const [pokemon, setPokemon] = useState ({})

useEffect(() => {
    if(params.name){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => {
            setPokemon(res.data)
        })
        .catch((error) => {
            console.error(err)
        })
    }
}, [params.name])

if (!pokemon.name) return null

  return (
    <div> 
         <section className='max-w-5x1 max-auto px-4 pt-8 '>
            <h3 className='text-5xl font-semibold text-center capitalize'>
                {pokemon.name}
            </h3>
        </section>
        <section
         className={` w-full h-40% type-bg--${pokemon.types[0].type.name} flex justify-center`}>
        <img 
        className= 'size-5/8 object-contain' 
        src={pokemon.sprites?.other?.['official-artwork']?.front_default} 
        alt={pokemon.name} />
         </section>

        <div className='p-4 text-center'>
        <span className='text-gray-600 text-sm'>
          Tipo
          </span>
        {pokemon.types && (
        <p className='capitalize'>{pokemon.types.map(p => p.type.name).join(' / ')}</p>
        )}
        <ul className='border-t-1 border-gray-200 mt-4 pt-4 grid grid-cols-2 gap-4'>
        <li className='text-gray-600 text-sm'>
            HP
            <span className='block text-black text-base'>{pokemon.stats[0].base_stat}</span>
          </li>
          <li className='text-gray-600 text-sm'>
            ATAQUE
            <span className='block text-black text-base'>{pokemon.stats[1].base_stat}</span>
          </li>
          <li className='text-gray-600 text-sm'>
            DEFENSA
            <span className='block text-black text-base'>{pokemon.stats[2].base_stat}</span>
          </li>
          <li className='text-gray-600 text-sm'>
            VELOCIDAD
            <span className='block text-black text-base'>{pokemon.stats[5].base_stat}</span>
          </li>
        </ul>
      </div>
      <span></span>
    </div>
  )
}

export default Details