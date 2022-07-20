import { render } from '@testing-library/react'
import LearnCallout from './'

const baseProps = {
  headline: 'Learn the latest skills',
  brand: 'hashicorp',
  background:
    'https://www.datocms-assets.com/2885/1581019020-nomad-pattern-grayjoined.svg',
  items: [
    {
      title: 'Getting Started',
      category: 'Step-by-Step Guides',
      time: '24 mins',
      link: 'https://learn.hashicorp.com/collections/nomad/get-started',
      image:
        'https://www.datocms-assets.com/2885/1600191254-hashicorp-icon.svg',
    },
    {
      title: 'Deploy and Manage Nomad Jobs',
      category: 'Step-by-Step Guides',
      time: '36 mins',
      link: 'https://learn.hashicorp.com/collections/nomad/manage-jobs',
      image:
        'https://www.datocms-assets.com/2885/1600191254-hashicorp-icon.svg',
    },
  ],
}

describe('<LearnCallout />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-special-class'
    const { container } = render(
      <LearnCallout {...baseProps} className={className} />
    )
    const root = container.firstChild
    expect(root.tagName).toBe('DIV')
    expect(root).toHaveClass(className)
  })

  it('should render provided callouts', () => {
    const { container } = render(<LearnCallout {...baseProps} />)
    const root = container.firstChild

    expect(root.querySelectorAll('.course').length).toEqual(
      baseProps.items.length
    )
  })

  it('should properly render the background', () => {
    const rootWithBg = render(<LearnCallout {...baseProps} />).container
      .firstChild
    expect(rootWithBg).toHaveStyle(
      `background-image: url(${baseProps.background})`
    )

    const rootWithoutBg = render(<LearnCallout {...baseProps} background="" />)
      .container.firstChild
    expect(rootWithoutBg).toHaveStyle(`background-image: none`)
  })
})
