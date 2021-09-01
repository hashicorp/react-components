import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import s from './styles.module.css'

interface Section {
  text: string
  slug: string
  level: number
}

function useActiveSection(sections: Section[]) {
  const [activeSection, setActiveSection] = useState<string>()
  const previousY = useRef<number>()

  const findMatchingSectionIndex = (slug: string) => {
    return sections.findIndex((section) => section.slug === slug)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let currentY: number
        let scrollTrend: 'down' | 'up'
        const visibleHeadings = []

        entries.forEach((entry) => {
          currentY = window.scrollY
          scrollTrend = previousY.current < currentY ? 'down' : 'up'

          if (entry.isIntersecting) {
            visibleHeadings.push(entry.target.id)
          }
        })

        const isSingleEntryLeaving =
          entries.length === 1 && !entries[0].isIntersecting
        const singleEntryLeavingIndex = isSingleEntryLeaving
          ? findMatchingSectionIndex(entries[0].target.id)
          : -1

        // Activate only the bottom-most visible section heading
        if (visibleHeadings.length === 1) {
          setActiveSection(visibleHeadings[0])
        } else if (visibleHeadings.length > 1) {
          setActiveSection(visibleHeadings[visibleHeadings.length - 1])
        }

        if (previousY.current) {
          // If we detect that we're scrolling up, and there are no visible headers,
          // optimistically set the previous header as visible to make the active section match the visible content
          if (visibleHeadings.length === 0 && scrollTrend === 'up') {
            setActiveSection((current) => {
              const curActiveIndex = findMatchingSectionIndex(current)

              // Handle an ege case where we get an intersection event for a heading further down the page
              // leaving intersection, otherwise this would cause the active heading to incorrectly get bumped up
              if (
                isSingleEntryLeaving &&
                singleEntryLeavingIndex > curActiveIndex
              )
                return current

              const newIndex = curActiveIndex - 1

              if (newIndex < 0) return current

              return sections[newIndex].slug
            })
          }
        }
        if (currentY) previousY.current = currentY
      },
      { rootMargin: '0% 0% -85% 0%' }
    )

    sections.forEach((section) => {
      const el = document.querySelector(`#${section.slug}`)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach((section) => {
        const el = document.querySelector(`#${section.slug}`)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return activeSection
}

export default function SectionNavigation({
  sections,
  heading = 'Content',
}: {
  sections: Section[]
  heading?: string
}) {
  const activeSection = useActiveSection(sections)

  return (
    <div className={s.root}>
      <h5 className={s.heading}>{heading}</h5>
      <ol className={s.list} style={{ paddingInlineStart: 0 }}>
        {sections.map((section) => (
          <li
            className={classNames(
              activeSection === section.slug && s.activeSection
            )}
            key={section.text}
            style={{ paddingLeft: `calc(${section.level - 2} * 16px)` }}
          >
            <a href={`#${section.slug}`}>{section.text}</a>
          </li>
        ))}
      </ol>
    </div>
  )
}
