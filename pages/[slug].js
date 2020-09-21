import {useState, useEffect} from 'react'
import RichText from '@sanity/block-content-to-react'
import {client, getAllPostSlugs, getPost} from '../lib/data'

// Listen only to relevant updates
const query = `*[_type in ['post', 'author']]`

export default function Post({post = {}}) {
  const [postData, setPostData] = useState(post)
  /**
   * Set up a real-time listener using useEffect.
   * Updates are pushed and not pulled. It theoretically shouldn't burn a lot of API requests, since it’s using Event Stream.
   *
   * .config({withCredentials: true}) => if you're logged into your project, the client uses your authentication to fetch drafts
   */
  useEffect(() => {
    const sub = client
      .config({withCredentials: true})
      .listen(query, {slug: post.slug.current}, {visibility: 'query'})
      .subscribe(({result}) => {
        if (result) {
          const updatedDocId = result._id.replace('drafts.', '')
          switch(result._type) {
            case 'post':
              const oldPostId = postData._id.replace('drafts.')
              if (oldPostId === updatedDocId) {
                // Don't overwrite author with reference data
                setPostData({...result, author: postData.author})
              }
              break;
            case 'author':
              const {author} = postData
              // Tackle drafts on both ends
              const oldAuthorId = author._id.replace('drafts.', '')
              // Only update if it’s the author of this post
              if (oldAuthorId === updatedDocId) {
                setPostData({...postData, author: result})
              }
              break;
          }
        }

      })
    return () => sub.unsubscribe()
  }, [post])

  const {title, body, author = {}} = postData
  return <article>
    <h1>{title}</h1>
    {author && <h2>By {author?.name}</h2>}
    {body && <RichText blocks={body} {...client.config()} />}
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
