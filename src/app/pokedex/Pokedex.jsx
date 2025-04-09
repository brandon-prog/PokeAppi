import { useEffect, useState } from "react"
import axios from "axios"
import { useName } from "../../contexts/NameContext"
import PokemonsList from "./components/PokemonsList"
import PokemonCard from './components/PokemonCard';
import '../pokedex/Pokedex.css'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

function Pokedex() {

const [state] = useName()
const [pokemons, setPokemons] = useState ([])
const [singlePokemon, setSinglePokemon] = useState (null)
const [types, setTypes] = useState ([])
const [filteredPokemons, setFilteredPokemons] = useState([])
const [search, setSearch] = useState('')
const [selectedType, setSelectedType] = useState ('')


const getPokemons = async () => {
  axios.get(baseUrl + '?limit=150')
.then(response => {
  setPokemons(response.data.results)
})
.catch(error => console.error(error))
}

useEffect(() => {
  getPokemons()
}, [])

useEffect(() => {
  axios.get(' https://pokeapi.co/api/v2/type?limit=21')
  .then(response => {
    setTypes(response.data.results)
  })
  .catch(error => console.log(error))
}, [])

useEffect(() => {
  if(selectedType === 'all') {
    setFilteredPokemons(pokemons)
    setSinglePokemon(null)
    return
  }
  
  if (selectedType) {
    axios.get(' https://pokeapi.co/api/v2/type/' + selectedType)
  .then(response => {
    setFilteredPokemons(response.data.pokemon.map(p => p.pokemon))
    setSinglePokemon(null)
  })
  .catch(error => console.log(error))
}
},[selectedType])

useEffect(() => {

  if (!search) {
    setFilteredPokemons(pokemons)
    setSinglePokemon(null)
    return
  }

  setFilteredPokemons(
  pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
)
},[search, pokemons])

const searchPokemon = () => {
  if (!search) {
    setFilteredPokemons(pokemons)
    setSinglePokemon(null)
    return
  }
  axios.get(baseUrl + '/' + search.toLowerCase())
  .then(response => {
    setSinglePokemon(baseUrl + '/' + response.data.name) 
    })
  .catch(error => console.error(error))
}

  return (
    <div >
        <div className='cuadro'>
        <h2 className='mb-11'><span className="text-red-600 font-semibold">Bienvenido {state.name}</span>, aqui podras encotrar tu pókemon favorito</h2>

        {/* Aqui va el buscador y el filtro*/}
        <div className='mb-11' >
          <input 
          type="text"
          placeholder='buscar pokémon...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input'          
          />
          <button className='btn' onClick={searchPokemon}>
            Buscar
            </button>

            <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='pokemons-type'
            >
              <option value="all">Todos los Pokémones</option>
              {types.map(type => (
                <option key={type.name} value={type.name} className='capitalize'>
                  {type.name}
                </option>
                
              ))}
            </select>

        </div>

          {singlePokemon ? (
            <PokemonCard url={singlePokemon} />
          ) : (
        <PokemonsList pokemons={filteredPokemons} />
          )}
        </div>
    </div>
  )
}

export default Pokedex