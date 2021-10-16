import Collapsible from '../collapsible'
import ResponseObject from '../response-object'
import PropertyObject from '../property-object'
import { capitalCase } from 'change-case'
import useHover from '../../hooks/use-hover'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgChevronDown from '@hashicorp/flight-icons/svg/chevron-down-16.svg?include'
import TwoColumnLayout from '../two-column-layout'
import getBodyParamProps from './get-body-param-props'
import classNames from 'classnames'
import s from './style.module.css'

function Parameters({ title, params }) {
  return (
    <>
      <p className={`${s.columnSectionHeading} g-type-label-strong`}>{title}</p>
      {params.map((parameter, idx) => {
        return (
          <PropertyObject
            key={parameter.name}
            name={parameter.name}
            data={parameter}
            isFirstItem={idx === 0}
            isLastItem={idx === params.length - 1}
          />
        )
      })}
    </>
  )
}

function OperationObject({
  data,
  path,
  type,
  isCollapsed,
  setIsCollapsed,
  renderOperationIntro,
}) {
  const [headerRef, isHeaderHovered] = useHover()
  const { operationId, parameters, responses, summary } = data
  const successResponse = responses['200']
  const title = capitalCase(operationId.split('_').pop())

  // Group parameter properties by type
  const pathParams = parameters.filter((p) => p.in === 'path')
  const queryParams = parameters.filter((p) => p.in === 'query')
  const bodyParam = parameters.filter((p) => p.in === 'body')[0] // Note: we only accept a single "in=body" param
  const bodyProps = bodyParam ? getBodyParamProps(bodyParam) : []

  return (
    <div
      className={classNames(s.root, {
        [s.isHeaderHovered]: isHeaderHovered,
      })}
    >
      <button
        className={s.header}
        ref={headerRef}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className={s.meta}>
          <span className={s.title}>{title}</span>
          <span className={s.endpoint}>
            <span className={s.method}>{type.toUpperCase()} </span>
            <span className={s.path}>{path}</span>
          </span>
        </span>
        <span className={s.toggleText}>
          {isCollapsed ? 'Expand' : 'Collapse'}
          <InlineSvg
            className={classNames(s.toggleIcon, {
              [s.isCollapsed]: isCollapsed,
            })}
            src={svgChevronDown}
          />
        </span>
      </button>
      <Collapsible isCollapsed={isCollapsed}>
        <div className={s.details}>
          {renderOperationIntro ? renderOperationIntro({ data }) : null}
          <div
            className={s.summary}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          <TwoColumnLayout
            columnOne={
              <div>
                <p className={s.columnHeading}>Request</p>
                {pathParams.length > 0 ? (
                  <Parameters title="Path Parameters" params={pathParams} />
                ) : null}
                {queryParams.length > 0 ? (
                  <Parameters title="Query Parameters" params={queryParams} />
                ) : null}
                {bodyProps.length > 0 ? (
                  <Parameters title="Body Parameters" params={bodyProps} />
                ) : null}
              </div>
            }
            columnTwo={
              <div>
                <p className={s.columnHeading}>Response</p>
                {successResponse ? (
                  <>
                    <p
                      className={`${s.columnSectionHeading} g-type-label-strong`}
                    >
                      Successful Response
                    </p>
                    <ResponseObject data={successResponse} />
                  </>
                ) : (
                  <p>No response has been defined.</p>
                )}
              </div>
            }
          />
        </div>
      </Collapsible>
    </div>
  )
}

export default OperationObject
