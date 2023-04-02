import {useState, useEffect} from 'react'
import Results from './Results.jsx'
import useBreedList from './useBreedList'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [location, setLocation] = useState('')
  const [animal, setAnimal] = useState('')
  const [breed, setBreed] = useState('')
  const [pets, setPets] = useState([])
  const [breeds] = useBreedList(animal)

  useEffect(() => {
    requestPets()
  }, [])

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )

    const json = await res.json()

    setPets(json.pets)
  }

  return (
    <div className='search-params'>
      <form
        action='GET'
        onSubmit={(e) => {
          e.preventDefault()
          requestPets()
        }}
      >
        <label htmlFor='location'>
          Location
          <input
            type='text'
            id='location'
            value={location}
            placeholder='location'
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            name='animal'
            id='animal'
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value)
              setBreed('')
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {' '}
                {animal}{' '}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='breed'>
          Breed
          <select
            name='breed'
            id='breed'
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value=''></option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {' '}
                {breed}{' '}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams
