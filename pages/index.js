import Head from 'next/head'
import Link from 'next/link'
import {getAllPostSlugs} from '../lib/data'

export default function Home({posts = []}) {
  return (
    <article>
      <h1>Posts</h1>
      <ul>
        {posts.length
        ? posts.map((slug)=> (<li key={slug}>
          <Link href={slug}><a>{slug}</a></Link>
        </li>))
        : 'No posts'
      }
      </ul>
    </article>
  )
}


export async function getStaticProps() {
  const posts = await getAllPostSlugs()
  return {
    props: {
      posts
    }
  }
}
