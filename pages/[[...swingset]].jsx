import createPage from 'swingset/page'
import { createStaticProps, createStaticPaths } from 'swingset/server'
import Head from 'next/head'
import Link from 'next/link'
import { SearchProvider } from '../packages/search'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import FormikStateViewer from '../swingset-extensions/formik-state-viewer'

import { Tab } from '../packages/tabs'
import UsageDetails from '../swingset-extensions/usage-details'

function Logo() {
  return (
    <div className="swingset-logo">
      <svg
        width="30"
        height="32"
        viewBox="0 0 28 30"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.6643 0L0 6.71763V6.74817V22.901L4.397 25.4354V9.25201L11.6643 5.06876V0Z" />
        <path d="M16.336 0V12.8856H11.6642V8.06116L7.29776 10.5955V27.1148L11.6642 29.6492V16.7941H16.336V21.5575L20.7025 19.0537V2.53438L16.336 0Z" />
        <path d="M16.3358 29.6515L28.0001 22.9033V6.75044L23.6031 4.21606V20.3689L16.3358 24.5827V29.6515Z" />
      </svg>
    </div>
  )
}

function Index() {
  return (
    <>
      <h1>Welcome to HashiCorp&apos;s Component Library!</h1>
      <p>
        Select a component on the left <span aria-hidden="true">👈</span>, or
        type <code>/</code> to search.
        <ul>
          <li>
            <a href="https://github.com/hashicorp/react-components">
              Repository
            </a>
          </li>
        </ul>
      </p>
    </>
  )
}

const components = {
  Head,
  Link,
  SearchProvider,
  UsageDetails,
  Tab,
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikStateViewer,
}

export default createPage({ components, logo: <Logo />, index: <Index /> })
export const getStaticPaths = createStaticPaths()
export const getStaticProps = createStaticProps({ components })
