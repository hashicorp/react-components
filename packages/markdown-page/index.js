import s from './style.module.css'
import { MDXRemote } from 'next-mdx-remote'
import HashiHead from '@hashicorp/react-head'
import Content from '@hashicorp/react-content'

export default function MarkdownPage({
  staticProps: { head, mdxSource },
  components = {},
}) {
  const content = <MDXRemote {...mdxSource} components={components} />
  return (
    <>
      <HashiHead {...head} />
      <main className={s.root}>
        <Content content={content} />
      </main>
    </>
  )
}
