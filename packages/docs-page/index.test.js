import { render } from '@testing-library/react'
import DocsPage from './'

test.todo(
  'passes `title`, `description`, and `siteName` correctly to <HashiHead>'
)
test.todo(
  'passes `product`, `category`, `currentPage`, `data`, and `order` correctly to <DocsSidenav>'
)
test.todo('passes `product` and `content` correctly to <Content>')
test.todo('displays `showEditPage` as true by default')
test.todo('renders the `mainBranch` correctly within the edit page link')
test.todo('if `showEditPage` is set to false, does not display')
test.todo(
  'passes `additionalComponents` to mdx remote for rendering if present'
)
test.todo(
  'initializes jump to section UI if there are more than one `h2`s in the content'
)
