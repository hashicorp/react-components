import AuthorCard from '../../../components/author-card'
import blogPostQuery from './query.graphql'
import rivetQuery, { client } from '@hashicorp/nextjs-scripts/dato/client'

export default function BlogPost({ blogPost }) {
  return (
    <div>
      <p>{JSON.stringify(blogPost)}</p>
      {blogPost.author && <AuthorCard data={blogPost.author} />}
    </div>
  )
}

export async function getStaticPaths() {
  const resp = await client.request(
    `query BlogPosts { allBlogPosts(first: 100) { slug } }`
  )

  return resp.allBlogPosts.map(post => ({
    params: { slug: post.slug }
  }))
}

export async function getStaticProps({ params: { slug } }) {
  const { blogPost } = await rivetQuery({
    query: blogPostQuery,
    dependencies: [AuthorCard],
    variables: { slug }
  })
  return { props: { blogPost } }
}
