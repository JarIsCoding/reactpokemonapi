// import { Col, Container, Row } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import square from './assets/Placeholdersquare.png' | This was my placeholder but because pikachu is my default its not needed anymore
import { useEffect, useState } from 'react';
import bug from './assets/Bug.png'
import dark from './assets/Dark.png'
import dragon from './assets/Dragon.png'
import electric from './assets/Eletric.png'
import fairy from './assets/Fairy.png'
import fight from './assets/Fight.png'
import fire from './assets/Fire.png'
import fly from './assets/Fly.png'
import ghost from './assets/Ghost.png'
import grass from './assets/Grass.png'
import ground from './assets/Ground.png'
import ice from './assets/Ice.png'
import normal from './assets/Normal.png'
import poison from './assets/Posion.png'
import psy from './assets/Psy.png'
import rock from './assets/Rock.png'
import steel from './assets/Steel.png'
import water from './assets/Water.png'

function App() {

  const [search, setSearch] = useState('Pikachu') // My search usestate
  const [pokemonData, setPokemonData] = useState(null); // Used for the api to hold data
  const [pokemonImage, setPokemonImage] = useState(''); // Holds the image url for the pokemon
  const [imageType, setImageType] = useState('regular'); // Used to track the current image type
  const [pokeLoc, setPokeLoc] = useState('')
  const [divType, setDivType] = useState('off')
  const [pokeEvo, setPokeEvo] = useState('')

  // My Api Function
  const handleSearch = async () => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
    const data = await promise.json();
    setPokemonData(data)
    pokelocation(data)
    setPokemonImage(data.sprites.other["official-artwork"].front_default)
    console.log(data)

  };

  const pokelocation = async (data) => {
    const promise = await fetch(data.location_area_encounters)
    const locData = await promise.json()
    if (locData.length > 0) {
      setPokeLoc(locData[0].location_area.name);
    } else {
      setPokeLoc('No location found');
    }
  }

  const pokeEvolution = async (data) => {
    const promise = await fetch(data.location_area_encounters)
    const locData = await promise.json()
    if (locData.length > 0) {
      setPokeLoc(locData[0].location_area.name);
    } else {
      setPokeLoc('No location found');
    }
  }

  const handlerng = async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    const rngdata = await promise.json();
    setPokemonData(rngdata)
    pokelocation(rngdata)
    setPokemonImage(rngdata.sprites.other["official-artwork"].front_default)
    console.log(rngdata)
  }

  // Capatlises the first letter of my moves and abilites for beauty sake
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Allows pikachu to render when app runs for a base pokemon
  useEffect(() => {
    handleSearch();
  }, []);

  // Checks for the type and changes from regular to shiny based on the current image type
  const handleImageClick = () => {
    if (imageType === 'regular') {
      setPokemonImage(pokemonData.sprites.other['official-artwork'].front_shiny);
      setImageType('shiny');
    } else {
      setPokemonImage(pokemonData.sprites.other['official-artwork'].front_default);
      setImageType('regular');
    }
  };

  const saveToLocalStorage = (mon) => {
    let favorites = getlocalStorage();

    if (!isObjectInFavorites(mon, favorites)) {
      favorites.push(mon);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }

  const isObjectInFavorites = (obj, favorites) => {
    return favorites.some(favorite => favorite.name === obj.name);
  }

  const getlocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");

    if (localStorageData == null) {
      return [];
    }
    return JSON.parse(localStorageData);

  }

  const removeFromLocalStorage = (mon) => {
    let favorites = getlocalStorage();

    favorites = favorites.filter(favorite => favorite.name !== mon.name);

    localStorage.setItem("Favorites", JSON.stringify(favorites))

  }

  const handleFavDiv = () => {
    if (divType === 'off') {
      setDivType('on')
    } else {
      setDivType('off');
    }
  }

  const handleFavoriteClick = async (pokemonName) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await promise.json();
    setPokemonData(data);
    pokelocation(data);
    setPokemonImage(data.sprites.other["official-artwork"].front_default);
  };

  const typeImages = {
    bug: bug,
    dark: dark,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    fight: fight,
    fire: fire,
    flying: fly,
    ghost: ghost,
    grass: grass,
    ground: ground,
    ice: ice,
    normal: normal,
    poison: poison,
    psychic: psy,
    rock: rock,
    steel: steel,
    water: water
  };

  const Types = ({ types }) => {
    return (
      <div className="text-end grid grid-cols-2">
        {types.map((type, e) => (
          <div className='col-span-1 lg:ps-0 lg:ms-0 ps-4 ms-3 mb-4'>
            <img key={e} src={typeImages[type.type.name]}
              alt={type.type.name}
              style={{
                width: '200px', height: 'auto'
              }} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* My Navbar */}
      <div className='grid grid-cols-2 px-4 py-2 Mc navbg static'>
        <div className='ft md:col-span-1 col-span-2'>
          POKEDEX
        </div>
        <div className='fourty mt-1 text-right md:col-span-1'>
          <button onClick={handleFavDiv}>
            Favorites
          </button>
        </div>
        <div className={`absolute right-0 top-20 favbg mt-3 pe-4 ps-3 thirty ${divType === 'off' ? 'hidden' : ''}`}>
          {getlocalStorage().map((favorite, e) => (
            <p key={e} className='' onClick={() => handleFavoriteClick(favorite)}>
              <span className='pe-24' onClick={() => removeFromLocalStorage(favorite)}>X</span>
              {capitalizeFirstLetter(favorite)}
            </p>
          ))}
        </div>
      </div>


      <div className='grid grid-cols-1 pt-3 pb-12'>
        <p className='twenty flex justify-center pb-3'>
          Search Your Favorite Pokemon!
        </p>
        <div className='flex justify-center'>
          <input className='inputfield rounded-lg ps-2' value={search}
            onChange={(e) => setSearch(e.target.value)}></input>
        </div>
        <div className='flex justify-center'>
          <button className='rounded-lg btnclass mt-3 Mc' onClick={handleSearch}>
            Go!
          </button>
        </div>
      </div>


      <div className='grid grid-cols-12 Mx px-4 Mc'>
        <div className='lg:col-span-4 md:col-span-6 col-span-12'>
          <p className=' text-yellow-300'>
            Click Pokemon to change to shiny!
          </p>
          <img src={pokemonImage} width='100%' alt='Searched Pokemon' onClick={handleImageClick} style={{ cursor: 'pointer' }}></img>
          {pokemonData && pokemonData.name && (
            <button className='border-0 rounded-3xl mt-1 py-2 twf' onClick={() => saveToLocalStorage(pokemonData.name)}>
              Favorite
            </button>
          )}
          <br></br>
          <button className='border-0 rounded-3xl my-1 py-2 twf'>
            Evolutions
          </button>
          <br></br>
          <button className='border-0 rounded-3xl py-2 twf mb-5' onClick={handlerng}>
            Random
          </button>
        </div>


        <div className='lg:col-span-8 md:col-span-6 col-span-12 pt-4 lg:ms-16'>
          <div className='grid lg:grid-cols-2'>
            <div className='col-span-1'>
              <p className='fourty ps-4 ms-3 pb-3'>
                {/* This && function checks if pokemon data & pokemon name exist if not it does not run */}
                {pokemonData && pokemonData.name && (
                  <span>
                    {capitalizeFirstLetter(pokemonData.name)}
                    {' '}
                    {'#'}
                    {(pokemonData.id)}
                  </span>
                )}
              </p>
            </div>
            <div className='text-end col-span-1 pt-3'>
              {pokemonData && pokemonData.types && (
                <Types types={pokemonData.types} />
              )}
            </div>
          </div>


          <p className='ps-4 ms-3 thirty'>
            All Abilites
          </p>
          <p className='ps-4 ms-3 twenty pb-10'>
            {pokemonData && pokemonData.abilities && (
              <span>
                {pokemonData.abilities.map((pokeabty, e) => (
                  <span key={e}>
                    {capitalizeFirstLetter(pokeabty.ability.name)}
                    {e !== pokemonData.abilities.length - 1 && ', '}
                  </span>
                ))}
              </span>
            )}
          </p>

          <p className='ps-4 ms-3 thirty'>
            All Moves
          </p>
          <div className='grid grid-cols-12'>
            <div className='lg:col-span-6 col-span-12 ps-4 ms-3 twenty scrolltxt mb-5'>
              {pokemonData && pokemonData.moves && (
                <span>
                  {pokemonData.moves.map((pokemove, e) => (
                    <span key={e}>
                      {capitalizeFirstLetter(pokemove.move.name)}
                      {e !== pokemonData.moves.length - 1 && ', '}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <div className='lg:col-span-6'>

            </div>
          </div>

          <p className='ps-4 ms-3 thirty'>
            Location
          </p>
          <p className='ps-4 ms-3 twenty mb-5'>
            <span>
              {capitalizeFirstLetter(pokeLoc)}
            </span>
          </p>

          <p className='ps-4 ms-3 thirty'>
            Evolutions
          </p>
          <p className='ps-4 ms-3 twenty mb-5'>
            <span>
              {capitalizeFirstLetter(pokeLoc)}
            </span>
          </p>
        </div>
      </div>

      {/* Old Bootstrap code */}

      {/* <Container fluid className='navbg px-4'>
        <Row>
          <Col md={6}>
            <p className='ft p-0 m-0 py-2'>
              POKEDEX
            </p>
          </Col>
          <Col md={6} className='text-end'>
            <p className='fourty m-0 pt-2 mt-1'>
              Favorites
            </p>
          </Col>
        </Row>
      </Container> */}

      {/* My Search bar */}
      {/* <Container fluid className='text-center py-3'>
        <Row>
          <Col>
            <p className='twenty'>
              Search Your Favorite Pokemon!
            </p>
            <input className='inputfield rounded-2 border-0 ps-2' value={search}
              onChange={(e) => setSearch(e.target.value)}></input>
            <br></br>
            <button className='border-0 rounded-2 btnclass mt-3 Mc' onClick={handleSearch}>
              Go!
            </button>
          </Col>
        </Row>
      </Container> */}

      {/* All the data to populate goes here */}
      {/* <Container fluid className='Mc px-4'>
        <Row>
          <Col lg={4} md={6}>
            <p>
              Click Pokemon to change to shiny!
            </p>

            {/* Pokemon image and the buttons beneath it are in this col */}
      {/* <img src={pokemonImage} width='100%' alt='Searched Pokemon' onClick={handleImageClick} style={{ cursor: 'pointer' }}></img>

            <button className='border-0 rounded-5 mt-1 py-1 twf'>
              Favorite
            </button>
            <br></br>
            <button className='border-0 rounded-5 my-1 py-1 twf'>
              Evolutions
            </button>
            <br></br>
            <button className='border-0 rounded-5 py-1 twf mb-5' onClick={handleRandomClick}>
              Random
            </button>
          </Col> */}

      {/* Pokemon name, Abilities, and Moves are here */}
      {/* <Col lg={8} md={6} className='pt-4'>
            <Row>
              <Col>
                <p className='fourty ps-4 ms-3'> */}
      {/* This && function checks if pokemon data & pokemon name exist if not it does not run */}
      {/* {pokemonData && pokemonData.name && (
                    <span>
                      {capitalizeFirstLetter(pokemonData.name)}
                      {' '}
                      {'#'}
                      {(pokemonData.id)}
                    </span>
                  )}
                </p>
              </Col>
              <Col className='text-end'>

              </Col>
            </Row> */}

      {/* Abilites start here */}
      {/* <p className='ps-4 ms-3 thirty'>
              All Abilites
            </p>
            <p className='ps-4 ms-3 twenty scrolltxt'>
              {pokemonData && pokemonData.abilities && (
                <span>
                  {pokemonData.abilities.map((pokeabty, e) => (
                    <span key={e}>
                      {capitalizeFirstLetter(pokeabty.ability.name)}
                      {e !== pokemonData.abilities.length - 1 && ', '}
                    </span>
                  ))}
                </span>
              )}
            </p> */}

      {/* Moves Start here */}
      {/* <p className='ps-4 ms-3 thirty'>
              All Moves
            </p>
            <Row>
              <Col lg={6} className='ps-4 ms-4 twenty scrolltxt mb-5'>
                {pokemonData && pokemonData.moves && (
                  <span>
                    {pokemonData.moves.map((pokemove, e) => (
                      <span key={e}>
                        {capitalizeFirstLetter(pokemove.move.name)}
                        {e !== pokemonData.moves.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                )}
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container >

      <div>

      </div> */}
    </>
  );
}

export default App;
