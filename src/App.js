import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import square from './assets/Placeholdersquare.png' | This was my placeholder but because pikachu is my default its not needed anymore
import { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState('Pikachu') // My search usestate
  const [pokemonData, setPokemonData] = useState(null); // Used for the api to hold data
  const [pokemonImage, setPokemonImage] = useState(''); // Holds the image url for the pokemon
  const [imageType, setImageType] = useState('regular'); // Used to track the current image type
  const [rngId, setRngId] = useState('')

  // My Api Function
  const handleSearch = async () => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
    const data = await promise.json();
    setPokemonData(data)
    setPokemonImage(data.sprites.other["official-artwork"].front_default)
    console.log(search)
  };

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

  // ASK ABOUT HOW TO FIX RANDOMCLICK FUNCTION NOT WORKING
  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    setRngId(randomId)
    console.log(rngId)
  }

  return (
    <>
      {/* My Navbar */}
      <Container fluid className='navbg px-4'>
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
      </Container>

      {/* My Search bar */}
      <Container fluid className='text-center py-3'>
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
      </Container>

      {/* All the data to populate goes here */}
      <Container fluid className='Mc px-4'>
        <Row>
          <Col lg={4} md={6}>
            <p>
              Click Pokemon to change to shiny!
            </p>

            {/* Pokemon image and the buttons beneath it are in this col */}
            <img src={pokemonImage} width='100%' alt='Searched Pokemon' onClick={handleImageClick} style={{ cursor: 'pointer' }}></img>

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
          </Col>

          {/* Pokemon name, Abilities, and Moves are here */}
          <Col lg={8} md={6} className='pt-4'>
            <Row>
              <Col>
                <p className='fourty ps-4 ms-3'>
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
              </Col>
              <Col className='text-end'>

              </Col>
            </Row>

            {/* Abilites start here */}
            <p className='ps-4 ms-3 thirty'>
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
            </p>

            {/* Moves Start here */}
            <p className='ps-4 ms-3 thirty'>
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
    </>
  );
}

export default App;
