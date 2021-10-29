const Loading = (): JSX.Element => {
  return (
    <span
      className='spinner-border text-info'
      role='status'
      data-testid='loading-component'
    ></span>
  )
}

export { Loading }
