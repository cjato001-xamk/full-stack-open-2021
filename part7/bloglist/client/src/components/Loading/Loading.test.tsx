import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading component', () => {
  it('should render', () => {
    render(<Loading />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })
})
