// This is terrible, very non-idiomatic code. It is here temporarily to enable this feature
// while the team works on a more permanent solution. Please do not ever write code like this.
// Ticket to fix this: https://app.asana.com/0/1100423001970639/1160656182754009
export default function temporary_injectJumpToSection(node) {
  const root = node.querySelector('.g-content')
  const firstH1 = root.querySelector('h1')
  // Build our array of headline objects
  const headlines = Array.from(root.querySelectorAll('h2')).reduce(
    (acc, h2) => {
      // Query for headlines containing our jump-to-section targets that are
      // inserted by Remark
      const target = h2.querySelector('.__target-h')
      if (target) {
        // The given H2 has a JTS target, so add it to our accumulator
        acc.push({
          id: target.id,
          text: h2.textContent.slice(1), // slice removes permalink » character
        })
      }

      return acc
    },
    []
  )

  // if there's no h1 or no 3 h2s, don't render jump to section
  if (!firstH1) return
  if (headlines.length < 1) return

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
  el.classList.add('jump-to-section')

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
