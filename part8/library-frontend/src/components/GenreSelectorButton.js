const GenreSelectorButton = ({ value, name, setSelectedGenre }) => {
  return <span onClick={() => setSelectedGenre(value)}>{name} </span>
}

export { GenreSelectorButton }
