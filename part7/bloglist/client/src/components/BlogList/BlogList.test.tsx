import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { BlogList } from './BlogList'

describe('BlogList component', () => {
  it('renders a bloglist item', () => {
    render(
      <Router>
        <BlogList
          blogs={[
            {
              id: 'test',
              title: 'test-title',
              author: 'test-author',
              url: 'test-url',
            },
          ]}
        />
      </Router>
    )

    expect(screen.getByText('test-title')).toBeInTheDocument()
  })
})
