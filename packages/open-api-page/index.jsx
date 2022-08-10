import { useCallback, useState, useRef } from 'react'
import Link from 'next/link'
import OperationObject from './partials/operation-object'
import HashiHead from '@hashicorp/react-head'
import DocsSidenav from '@hashicorp/react-docs-sidenav'
import Content from '@hashicorp/react-content'
import useOnClickOutside from './hooks/use-on-click-outside'
import s from './style.module.css'

function OpenApiPage({
  info,
  operationCategory,
  navData,
  siteName,
  productSlug,
  currentPath,
  baseRoute,
  massageOperationPathFn = (path) => path,
  renderOperationIntro,
  optInBannerSlot,
}) {
  const operationsRef = useRef(null)
  const [expandedOperations, setExpandedOperations] = useState([])

  useOnClickOutside(
    operationsRef,
    useCallback(() => setExpandedOperations([]), [])
  )

  function setOperationState(slug, isExpanded) {
    const newStates = expandedOperations.filter((s) => s !== slug)
    if (isExpanded) newStates.push(slug)
    setExpandedOperations(newStates)
  }

  const pageTitle = operationCategory ? operationCategory.name : info.title

  return (
    <>
      <div className={s.root}>
        <HashiHead
          title={`${pageTitle}${siteName ? ` | ${siteName}` : ''}`}
          description={info.description}
        />
        <DocsSidenav
          product={productSlug}
          Link={Link}
          currentPath={currentPath}
          baseRoute={baseRoute}
          disableFilter={true}
          navData={navData}
        />
        <div className={s.contentContainer}>
          {optInBannerSlot ? optInBannerSlot : null}
          <Content
            product={productSlug}
            content={
              operationCategory ? (
                <>
                  <p className={s.pageHeading}>{info.title}</p>
                  <h1 className={s.categoryHeading}>
                    {operationCategory.name}
                  </h1>
                  <div ref={operationsRef}>
                    {operationCategory.operations.map((op) => {
                      const isExpanded =
                        expandedOperations.indexOf(op.operationId) !== -1

                      return (
                        <OperationObject
                          key={op.__type + op.__path}
                          path={massageOperationPathFn(op.__path)}
                          type={op.__type}
                          data={op}
                          renderOperationIntro={renderOperationIntro}
                          isCollapsed={!isExpanded}
                          setIsCollapsed={(isCollapsed) =>
                            setOperationState(op.operationId, !isCollapsed)
                          }
                        />
                      )
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h1 className={s.pageHeading}>{info.title}</h1>
                  <p className={s.sidebarPrompt}>
                    Select a service from the sidebar.
                  </p>
                </>
              )
            }
          />
        </div>
      </div>
    </>
  )
}

export default OpenApiPage
