const ErrorHandler = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => (
        <p key={index}>{error.message}</p>
      ))}
    </>
  )
}

export { ErrorHandler }
