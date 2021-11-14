const ErrorHandler = ({ errors }) => {
  return (
    <>
      {errors.map((error) => (
        <p>{error.message}</p>
      ))}
    </>
  )
}

export { ErrorHandler }
