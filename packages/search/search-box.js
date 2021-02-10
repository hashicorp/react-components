import { useEffect, useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import IconMagGlass from './img/search.svg.js'
import IconX from './img/search-x.svg.js'
import IconSlash from './img/slash-search-toggle.js'
import { SEARCH_BOX_ID, SEARCH_RESULTS_ID } from './'

function SearchBox({
  /* Props provided from connector */
  isSearchStalled,
  refine,
  /* Props passed explicity */
  handleEscape,
  placeholder,
  query,
  setCancelled,
  setQuery,
  onSubmit,
  activeHit,
}) {
  const searchBoxRef = useRef(null)

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function onKeyDown(e) {
    const elt = e.target || e.srcElement
    const tagName = elt.tagName
    if (
      elt.isContentEditable ||
      tagName === 'INPUT' ||
      tagName === 'SELECT' ||
      tagName === 'TEXTAREA'
    ) {
      // Already in an input
      return
    }

    // Bind to the `/` key
    if (e.keyCode !== 191) return

    searchBoxRef.current?.focus()
    e.stopPropagation()
    e.preventDefault()
  }

  function onSearchBoxKeyDown(e) {
    if (!query) return
    // Regain active search if previously cancelled
    setCancelled(false)
    if (e.keyCode === 27) return handleEscape()
  }

  function onChange(e) {
    const val = e.target.value
    refine(val)
    setQuery(val)
  }

  function onReset() {
    setQuery('')
  }

  return (
    <div className="c-search-box">
      <form noValidate action="" role="search" onSubmit={onSubmit}>
        <input
          id={SEARCH_BOX_ID}
          className="g-type-body-strong"
          ref={searchBoxRef}
          type="search"
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          maxLength="512"
          required
          value={query}
          onChange={onChange}
          onKeyDown={onSearchBoxKeyDown}
          aria-autocomplete="list"
          aria-controls={SEARCH_RESULTS_ID}
          aria-activedescendant={activeHit > 0 ? `hit-${activeHit}` : ''}
        />
        <button
          type="submit"
          title="Submit your search query."
          className="btn-submit"
          dangerouslySetInnerHTML={{
            __html: IconMagGlass,
          }}
        />
        <button
          type="reset"
          title="Clear the search query."
          className="btn-reset"
          onClick={onReset}
          dangerouslySetInnerHTML={{
            __html: IconX,
          }}
        />
        {/*
         * Show a spinner when search stalled (`isSearchStalled`). Default: 200ms
         * Configurable: https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-stalledsearchdelay
         */}
        {isSearchStalled && (
          <div className="icon-loading">
            <svg
              width="18"
              height="18"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#444"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
                  <path
                    d="M36 18c0-9.94-8.06-18-18-18"
                    transform="rotate(296.263 18 18)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </g>
              </g>
            </svg>
          </div>
        )}
        {/* Visual indicator to user of '/' focus shortcut  */}
        <IconSlash />
      </form>
    </div>
  )
}

export default connectSearchBox(SearchBox)
