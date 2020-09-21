# Demo: Live preview with Next.js and Sanity.io

This is a minimal setup for how to do [real-time](https://www.sanity.io/docs/realtime-updates) preview using [Next.js](https://nextjs.org) and [Sanity.io](https://www.sanity.io). It sets up a client side listener with a client that uses your authentication if you're logged into Sanity.io.

[Join the Sanity community to ask about this](https://slack.sanity.io).

## Getting started

0. Install dependencies with `yarn` (or `npm i`)
1. Replace the client configuration with your own in `./lib/data.js`
2. Add the URLs that you will be previewing on to your [Sanity project’s CORS settings](https://www.sanity.io/docs/cors), allow credentials. [_It’s important that you understand the risks first, especially if you plan to use wildcards._](https://www.sanity.io/docs/browser-security-and-cors)
3. Run the dev server (`yarn dev`) or build/deploy the Next app. The preview works in both dev and production since it sets up client-side data fetching.

### Gotchas

You probably shouldn't use the `useEffect` method in production as it will set up listeners for all your site’s visitors. You can probably use [Next.js official preview example](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity) to check if one comes from the preview route, and then set it up.

You can't resolve references or use projections with listeners. That’s why in `./[slug].js` you'll find a minimal example of how to deal with references by listening to all changes, and then writing custom resolvers to replace data.

---

# Original README.md

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
