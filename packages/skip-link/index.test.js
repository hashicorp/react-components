import { render } from '@testing-library/react'
import React from 'react'
import SkipLink, { SkipLinkProvider, useSkipLinkContext } from './index'

function BaseSkipLink({ id, children }) {
  return (
    <SkipLinkProvider>
      <SkipLink anchorId={id} />
      {children}
    </SkipLinkProvider>
  )
}

describe('<SkipLink />', () => {
  it('Should exist', () => {
    const { getByRole } = render(<BaseSkipLink id="main-content" />)

    expect(getByRole('link')).toBeInTheDocument()
  })

  it('Should have correct href when passed id directly', () => {
    const id = 'main-content'
    const { getByRole } = render(<BaseSkipLink id={id} />)

    expect(getByRole('link')).toHaveAttribute('href', '#main-content')
  })

  it('Should have correct href when set via context', () => {
    function Content() {
      const { anchorId, setAnchorId } = useSkipLinkContext()
      React.useEffect(() => {
        setAnchorId('lobster')
      }, [])
      return <main id={anchorId}>Test content</main>
    }
    const { getByRole } = render(
      <BaseSkipLink>
        <Content />
      </BaseSkipLink>
    )

    expect(getByRole('link')).toHaveAttribute('href', '#lobster')
  })
})
