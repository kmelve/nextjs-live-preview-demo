import sanityClient from '@sanity/client'

export const client = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: 'production',
  projectId: 'ob5bhoi7', // use your own project ID
  useCdn: false
})

export async function getAllPostSlugs() {
  const data = await client.fetch(`*[_type == "post"]{"params": {"slug": slug.current}}`)
  return data
}


export async function getPost(slug) {
  const data = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{..., author->}`, {slug})
  return data
}
