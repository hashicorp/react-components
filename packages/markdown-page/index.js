import s from './style.module.css'
import hydrate from 'next-mdx-remote/hydrate'
import HashiHead from '@hashicorp/react-head'
import Content from '@hashicorp/react-content'

export default function MarkdownPage({
  staticProps: { head, mdxSource },
  components = {},
}) {
  const content = hydrate(mdxSource, { components })
  return (
    <>
      <HashiHead {...head} />
      <main className={s.root}>
        <Content content={content} />
      </main>
    </>
  )
}
