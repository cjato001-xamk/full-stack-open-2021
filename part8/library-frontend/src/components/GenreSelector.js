import { GenreSelectorButton } from './GenreSelectorButton'

const GenreSelector = ({ selectedGenre, setSelectedGenre, genres }) => {
  return (
    <>
      <h4>Filter books by genre</h4>

      {genres?.map((genre) => (
        <GenreSelectorButton
          key={genre}
          value={genre}
          name={genre}
          setSelectedGenre={setSelectedGenre}
        />
      ))}

      <GenreSelectorButton
        value=''
        name='all-genres'
        setSelectedGenre={setSelectedGenre}
      />
    </>
  )
}

export { GenreSelector }
