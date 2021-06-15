import marked from 'marked'
import Link from 'next/link'
import Image from '@hashicorp/react-image'
import blogIndexQuery from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'

export default function BlogIndex({ allBlogPosts }) {
  return (
    <ul id="posts">
      {allBlogPosts.map(post => (
        <li key={post.slug}>
          <h4>{post.title}</h4>
          {post.thumbnail && <Image {...post.thumbnail} />}
          <div
            className="snippet"
            dangerouslySetInnerHTML={{ __html: marked(post.snippet) }}
          />
          <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
            <a>Read post</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const { allBlogPosts } = await rivetQuery({
    query: blogIndexQuery,
    dependencies: [Image]
  })
  return { props: { allBlogPosts } }
}
