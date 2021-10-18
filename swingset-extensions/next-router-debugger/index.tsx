import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import s from './style.module.css'

const StateViewer = () => {
  const router = useRouter()
  return (
    <pre className={s.debugger}>
      <code>{JSON.stringify(router, null, 2)}</code>
    </pre>
  )
}

const NextRouterDebugger = ({ children }) => {
  const [asPath, setAsPath] = useState('/docs/some/nested/article')
  const r = {
    route: '/docs/[[...page]]',
    pathname: '/docs/[[...page]]',
    query: {
      page: ['some', 'nested', 'article'],
    } as any,
    asPath: asPath,
    push(url) {
      console.log(url)
      setAsPath(url as string)
      return Promise.resolve(true)
    },
    replace(...args: unknown[]) {
      console.log(args)
      return Promise.resolve(true)
    },
    reload(...args: unknown[]) {
      console.log(args)
    },
    back(...args: unknown[]) {
      console.log(args)
    },
    isFallback: false,
  } as NextRouter

  return (
    <RouterContext.Provider value={r}>
      <StateViewer />
      {children}
    </RouterContext.Provider>
  )
}

export default NextRouterDebugger
