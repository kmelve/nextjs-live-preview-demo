import {useState, useEffect} from 'react'
import RichText from '@sanity/block-content-to-react'
import {client, getAllPostSlugs, getPost} from '../lib/data'

const query = `*[slug.current == $slug]`

export default function Post({post}) {
  const [postData, setPostData] = useState(post)
  /**
   * Set up a real-time listener using useEffect.
   * Updates are pushed and not pulled. Using Event Stream, so theoretically shouldn't burn a lot of API requests.
   *
   * .config({withCredentials: true}) => if you're logged into your project, the client uses your authentication to fetch drafts
   */
  useEffect(() => {
    const sub = client
      .config({withCredentials: true})
      .listen(query, {slug: post.slug.current}, {visibility: 'query'})
      .subscribe(({result}) => result && setPostData(result))
    return () => sub.unsubscribe()
  }, [post])

  const {title, body} = postData
  return <article>
    <h1>{title}</h1>
    <RichText blocks={body} {...client.config()} />
  </article>
}


export async function getStaticPaths() {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const post = await getPost(params.slug)
  return {
    props: {
      post
    }
  }
}
