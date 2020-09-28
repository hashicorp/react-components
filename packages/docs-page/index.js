import { useEffect } from 'react'
import Content from '@hashicorp/react-content'
import DocsSidenav from '@hashicorp/react-docs-sidenav'
import HashiHead from '@hashicorp/react-head'
import InlineSvg from '@hashicorp/react-inline-svg'

export default function DocsPage({
  children,
  head,
  product,
  resourceURL,
  sidenav,
}) {
  // TEMPORARY (https://app.asana.com/0/1100423001970639/1160656182754009)
  useEffect(() => {
    const node = document.querySelector('#inner')
    if (!node) return
    return temporary_injectJumpToSection(node)
  }, [children])

  return (
    <div id="p-docs">
      <HashiHead {...head} />
      <div className="content-wrap g-container">
        <div id="sidebar" role="complementary">
          <div className="nav docs-nav">
            <DocsSidenav product={product} {...sidenav} />
          </div>
        </div>
        <div id="inner" role="main">
          <Content product={product} content={children} />
        </div>
      </div>
      {resourceURL && (
        <div id="edit-this-page" className="g-container">
          <a href={resourceURL}>
            <InlineSvg src='<svg width="23" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M11.608.342C5.535.342.61 5.162.61 11.108c0 4.757 3.152 8.792 7.523 10.215.55.1.751-.233.751-.518 0-.256-.01-.933-.015-1.831-3.06.65-3.705-1.444-3.705-1.444-.5-1.243-1.222-1.574-1.222-1.574-.998-.668.076-.655.076-.655 1.104.076 1.685 1.11 1.685 1.11.981 1.645 2.575 1.17 3.201.894.1-.695.385-1.17.699-1.439-2.443-.271-5.011-1.195-5.011-5.32 0-1.176.429-2.137 1.132-2.89-.113-.272-.49-1.367.108-2.849 0 0 .924-.289 3.025 1.104.877-.24 1.819-.358 2.754-.363.934.005 1.875.124 2.754.363 2.1-1.393 3.022-1.104 3.022-1.104.6 1.482.222 2.577.11 2.85.705.752 1.13 1.713 1.13 2.888 0 4.136-2.572 5.046-5.022 5.313.394.332.746.99.746 1.994 0 1.438-.013 2.6-.013 2.953 0 .288.198.623.756.518 4.368-1.427 7.516-5.46 7.516-10.215 0-5.946-4.925-10.766-11-10.766" fill="#161514" fill-rule="evenodd"/></svg>' />
            <span>Edit this page</span>
          </a>
        </div>
      )}
    </div>
  )
}

// This is terrible, very non-idiomatic code. It is here temporarily to enable this feature
// while the team works on a more permanent solution. Please do not ever write code like this.
// Ticket to fix this: https://app.asana.com/0/1100423001970639/1160656182754009
function temporary_injectJumpToSection(node) {
  const root = node.children[0]
  const firstH1 = root.querySelector('h1')
  const otherH2s = [].slice.call(root.querySelectorAll('h2')) // NodeList -> array

  // if there's no h1 or no 3 h2s, don't render jump to section
  if (!firstH1) return
  if (otherH2s.length < 1) return

  const headlines = otherH2s.map((h2) => {
    // slice removes the anchor link character
    return {
      id: h2.querySelector('.__target-h').id,
      text: h2.innerText.slice(1),
    }
  })

  // build the html
  const html = `
    <span class="trigger g-type-label">
      Jump to Section
      <svg width="9" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M8.811 1.067a.612.612 0 0 0 0-.884.655.655 0 0 0-.908 0L4.5 3.491 1.097.183a.655.655 0 0 0-.909 0 .615.615 0 0 0 0 .884l3.857 3.75a.655.655 0 0 0 .91 0l3.856-3.75z" fill-rule="evenodd"/></svg>
    </span>
    <ul class="dropdown">
      ${headlines
        .map((h) => `<li><a href="#${h.id}">${h.text}</a></li>`)
        .join('')}
    </ul>`
  const el = document.createElement('div')
  el.innerHTML = html
  el.id = 'jump-to-section'

  // attach event listeners to make the dropdown work
  const trigger = el.querySelector('.trigger')
  const dropdown = el.querySelector('.dropdown')
  const body = document.body
  const triggerEvent = (e) => {
    e.stopPropagation()
    dropdown.classList.toggle('active')
  }
  const clickOutsideEvent = () => dropdown.classList.remove('active')
  const clickInsideDropdownEvent = (e) => e.stopPropagation()
  trigger.addEventListener('click', triggerEvent)
  body.addEventListener('click', clickOutsideEvent)
  dropdown.addEventListener('click', clickInsideDropdownEvent)

  // inject the html after the first h1
  firstH1.parentNode.insertBefore(el, firstH1.nextSibling)

  // adjust the h1 margin
  firstH1.classList.add('has-jts')

  // cleanup function removes listeners on unmount
  return function cleanup() {
    trigger.removeEventListener('click', triggerEvent)
    body.removeEventListener('click', clickOutsideEvent)
    dropdown.removeEventListener('click', clickInsideDropdownEvent)
    firstH1.classList.remove('has-jts')
    el.remove()
  }
}
