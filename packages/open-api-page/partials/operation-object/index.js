import Collapsible from '../collapsible'
import ResponseObject from '../response-object'
import PropertyObject from '../property-object'
import { capitalCase } from 'change-case'
import useHover from '../../hooks/use-hover'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgChevronDown from '../../icons/chevron-down.svg?include'
import classNames from 'classnames'
import s from './style.module.css'

function OperationObject({
  data,
  path,
  type,
  isHighlighted,
  isCollapsed,
  setIsCollapsed,
  renderOperationIntro,
}) {
  const [headerRef, isHeaderHovered] = useHover()

  // const [isCollapsed, setIsCollapsed] = useState(true)
  const { operationId, parameters, responses, summary } = data
  const successResponse = responses['200']
  const title = capitalCase(operationId.split('_').slice(1).join())

  // Group parameter properties by type
  const pathParams = parameters.filter((p) => p.in === 'path')
  const queryParams = parameters.filter((p) => p.in === 'query')
  const bodyParam = parameters.filter((p) => p.in === 'body')[0] // Note: we only accept a single "in=body" param
  const bodyProps = bodyParam ? getBodyParamProps(bodyParam) : []

  return (
    <div className={s.root} data-is-hovered={isHeaderHovered}>
      <div
        className={s.header}
        ref={headerRef}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className={s.meta}>
          <div
            className={s.title}
            data-is-highlighted={isHighlighted}
            data-is-hovered={isHeaderHovered}
          >
            {title}
          </div>
          <div className={s.endpoint}>
            <span className={s.method} data-is-hovered={isHeaderHovered}>
              {type.toUpperCase()}{' '}
            </span>
            <span className={s.path}>{path}</span>
          </div>
        </div>
        <div className={s.toggleButton}>
          <span className={s.toggleText}>
            {isCollapsed ? 'Expand' : 'Collapse'}
          </span>
          <InlineSvg
            className={classNames(s.toggleIcon, {
              [s.isCollapsed]: isCollapsed,
            })}
            src={svgChevronDown}
          />
        </div>
      </div>
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

function getBodyParamProps(bodyParam) {
  // We always expect the bodyParam to be an object,
  // with a schema which defines the body properties.
  if (!bodyParam.schema || !bodyParam.schema.properties) return []
  // We flatten these properties to avoid showing a
  // "collapsed object" UI under the "Body Parameters" section,
  // which would be a bit redundant and annoying to have to expand
  const bodyPropsObj = bodyParam.schema.properties
  const bodyProps = Object.keys(bodyPropsObj).reduce((acc, key) => {
    const data = Object.assign({}, bodyPropsObj[key])
    //  We need the property name. This is usually be handled by "key" in an object,
    // but we're flattening the object so we need to make sure it's there
    data.name = key
    if (!data.readOnly) acc.push(data)
    return acc
  }, [])
  return bodyProps
}

function TwoColumnLayout({ columnOne, columnTwo }) {
  return (
    <div className={s.twoColumnLayout}>
      <div>{columnOne}</div>
      <div></div>
      <div>{columnTwo}</div>
    </div>
  )
}

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

export default OperationObject
