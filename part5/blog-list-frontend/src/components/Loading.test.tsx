import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading component', () => {
  it('should render', () => {
    render(<Loading />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
