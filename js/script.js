
const pokemonName = document.querySelector('.pokemon_name');   //Pegando o elemento Nome
const pokemonNumber = document.querySelector('.pokemon_number'); // Pegando o elemento Numero
const pokemonImage = document.querySelector('.pokemon_image'); // Pegando o elemento Imagem

const form = document.querySelector('.form');       //Elemento form
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;  // identificando o primeiro pokemon para fazer o ++

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Requisitando a API

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();  // Recebendo os dados e transformando em json
    return data;
  }
}

const renderPokemon = async (pokemon) => { // Reinderizando o pokemon na tela

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;   // pegando os dados da API com data e colocando no elemento nome
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Tente novamente ';
    pokemonNumber.innerHTML = '';
    input.value = ''
  }
}

form.addEventListener('submit', (event) => {    // Criando a funçao de submit
  event.preventDefault();                       
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => { // criando a funçao de click com --
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {  // criando a funçao de click com ++
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon); //reiderizando o search Pokemon 1