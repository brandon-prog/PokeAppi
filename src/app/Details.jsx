import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Details() {
  const params = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (params.name) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => {
          setPokemon(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.name]);

  if (!pokemon.name) return null;

  const stats = {
    hp: pokemon.stats ? pokemon.stats[0].base_stat : 0,
    attack: pokemon.stats ? pokemon.stats[1].base_stat : 0,
    defense: pokemon.stats ? pokemon.stats[2].base_stat : 0,
    speed: pokemon.stats ? pokemon.stats[5].base_stat : 0,
  };

  const data = {
    labels: ['HP', 'Ataque', 'Defensa', 'Velocidad'],
    datasets: [
      {
        label: `${pokemon.name} - Estadísticas`,
        data: [stats.hp, stats.attack, stats.defense, stats.speed],
        backgroundColor: [
          'rgba(33, 34, 32, 0.6)',  
          'rgba(181, 9, 9, 0.78)',  
          'rgba(59, 181, 9, 0.78)',  
          'rgba(75, 192, 192, 0.8)',  
        ],
      },
    ],
  };

  return (
    <div className={`shadow-lg rounded-xl p-11 sm:w-3/4 md:w-1/2 mx-auto mt-8 w-full h-40% type-bg--${pokemon.types[0]?.type.name}`}>
      <section className="max-w-5xl max-auto px-4 pt-8">
        <h3 className="text-5xl font-semibold text-center capitalize">
          {pokemon.name}
        </h3>
      </section>
      <section
        className={'flex justify-center'}
      >
        <img
          className="size-5/9 object-contain"
          src={pokemon.sprites?.other?.['official-artwork']?.front_default}
          alt={pokemon.name}
        />
      </section>

      <div className="p-4 text-center">
        <span className="text-gray-600 text-sm">Tipo</span>
        {pokemon.types && (
          <p className="capitalize text-xl">
            {pokemon.types.map((p) => p.type.name).join(' / ')}
          </p>
        )}
        <ul className="border-t-1 border-gray-200 mt-4 pt-4 grid grid-cols-2 gap-4 ">
          <li className="text-gray-600 text-sm">
            HP
            <span className="block text-black text-base">
              {pokemon.stats[0]?.base_stat}
            </span>
          </li>
          <li className="text-gray-600 text-sm">
            ATAQUE
            <span className="block text-black text-base">
              {pokemon.stats[1]?.base_stat}
            </span>
          </li>
          <li className="text-gray-600 text-sm">
            DEFENSA
            <span className="block text-black text-base">
              {pokemon.stats[2]?.base_stat}
            </span>
          </li>
          <li className="text-gray-600 text-sm">
            VELOCIDAD
            <span className="block text-black text-base">
              {pokemon.stats[5]?.base_stat}
            </span>
          </li>
        </ul>
      </div>

      <section className="p-5 max-w-4/5 ">
        <h4 className="text-2xl font-semibold text-center mb-4">Estadísticas</h4>
        <Bar
  data={data}
  options={{
    responsive: true,
    indexAxis: 'y', 
    plugins: {
      title: {
        display: true,
        text: `${pokemon.name} - Estadísticas Base`,
      },
    },
    scales: {
      x: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Puntos',
        },
      },
      y: { 
        title: {
          display: true,
        },
      },
    },
  }}
/>
      </section>
      </div>
  );
}

export default Details;
