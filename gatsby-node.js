/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var mp3Duration = require("mp3-duration")
const RSS = require("rss")
const path = require("path")
const fs = require("fs-extra")

exports.onCreateNode = async (...args) => {
  let { node } = args[0]
  if (node.extension === `mp3`) {
    return onCreateMp3Node(...args)
  }
}
let onCreateMp3Node = async ({
  node,
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest,
}) =>
  // options
  {
    const duration = await mp3Duration(node.absolutePath)
    let obj = { duration }

    let mp3Node = {
      ...obj,
      id: createNodeId(`${node.id} >>> MP3`),
      parent: node.id,
      children: [],
      internal: {
        contentDigest: createContentDigest(obj),
        type: `Mp3`,
      },
    }
    createNode(mp3Node)
    createParentChildLink({ parent: node, child: mp3Node })
  }

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

// Create an rss feed for our podcast based on options from:
//  - gatsby-config for the overall podcast itself, and
//  - individual mdx files for each episode.
// Output the feed to a local file.
exports.onPostBuild = async ({ graphql }) => {
  // get the options for the podcast iteself
  // TODO: need to update tyhese and maybe move to config
  let pluginOptions = {
    title: `A Cup of CHI`,
    subtitle: ``,
    description: ``,
    summary: `Podcast summary`,
    podcastType: `episodic`,
    siteUrl: `https://podcast.com`,
    imageUrl: `https://podcast.com/podcast-image/png`,
    feedUrl: `https://podcast.com/pocast-rss-feed.xml`,
    language: `en-ca`,
    copyright: `Copyright © 2020 Blaine Lewis and Karthik Mahadevan`,
    authorName: `Blaine Lewis and Karthik Mahadevan`,
    ownerName: `Blaine Lewis and Karthik Mahadevan`,
    ownerEmail: `acupofchipodcast@gmail.com`,
    managingEditor: `acupofchipodcast@gmail.com`,
    webMaster: `acupofchipodcast@gmail.com`,
    explicit: `no`,
    publicationDate: `July 20, 2020 10:00:00 GMT`,
    category1: `Arts`,
    subCategory1: `Books`,
    category2: `Education`,
    subCategory2: `Courses`,
    category3: `Business`,
    subCategory3: `Marketing`,
    timeToLive: `60`,
    outputPath: `/feed.xml`,
  }

  const feedOptions = {
    title: pluginOptions.title,
    description: pluginOptions.description,
    site_url: pluginOptions.siteUrl,
    feed_url: pluginOptions.feedUrl,
    image_url: pluginOptions.imageUrl,
    language: pluginOptions.language,
    copyright: pluginOptions.copyright,
    docs: `https://help.apple.com/itc/podcasts_connect/#/itcb54353390`,
    author: pluginOptions.authorName,
    managingEditor: pluginOptions.managingEditor,
    webMaster: pluginOptions.webMaster,
    categories: [
      pluginOptions.category1,
      pluginOptions.category2,
      pluginOptions.category3,
    ],
    pubDate: pluginOptions.publicationDate,

    ttl: pluginOptions.timeToLive,
    generator: `https://github.com/miller-productions/gatsby-plugin-podcast-feed-mdx`,
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      googleplay: "http://www.google.com/schemas/play-podcasts/1.0",
    },
    custom_elements: [
      { "itunes:title": pluginOptions.title },
      { "itunes:subtitle": pluginOptions.subtitle },
      { "itunes:summary": pluginOptions.summary.substring(0, 3999) },
      { "itunes:type": pluginOptions.podcastType },
      { "itunes:explicit": pluginOptions.explicit },
      { "itunes:author": pluginOptions.authorName },
      {
        "itunes:owner": [
          { "itunes:name": pluginOptions.ownerName },
          { "itunes:email": pluginOptions.ownerEmail },
        ],
      },
      {
        "itunes:image": {
          _attr: {
            href: pluginOptions.imageUrl,
          },
        },
      },
      {
        "itunes:category": [
          {
            _attr: {
              text: pluginOptions.category1,
            },
          },
          {
            "itunes:category": {
              _attr: {
                text: pluginOptions.subCategory1,
              },
            },
          },
        ],
      },
      {
        "itunes:category": [
          {
            _attr: {
              text: pluginOptions.category2,
            },
          },
          {
            "itunes:category": {
              _attr: {
                text: pluginOptions.subCategory2,
              },
            },
          },
        ],
      },
      {
        "itunes:category": [
          {
            _attr: {
              text: pluginOptions.category3,
            },
          },
          {
            "itunes:category": {
              _attr: {
                text: pluginOptions.subCategory3,
              },
            },
          },
        ],
      },
      { "googleplay:author": pluginOptions.authorName },
      { "googleplay:description": pluginOptions.summary.substring(0, 999) },
      { "googleplay:explicit": pluginOptions.explicit },
    ],
  }

  // create the rss feed
  const feed = new RSS(feedOptions)

  // get the options for the episodes
  const result = await wrapper(
    graphql(`
      query {
        podcastEpisodes: allMdx(
          filter: {
            frontmatter: {
              status: { eq: "published" }
              type: { eq: "podcast-episode" }
            }
          }
        ) {
          edges {
            node {
              excerpt
              id
              frontmatter {
                title
                slug
                guid
                subtitle
                season
                episodeNumber
                episodeType
                publicationDate
                author
                source {
                  childMp3 {
                    duration
                  }
                  size
                  publicURL
                }
                explicit
                categories
              }
            }
          }
        }
      }
    `)
  )
  const episodes = result.data.podcastEpisodes.edges

  // for each episode
  episodes.forEach(edge => {
    // gather the options
    const { excerpt } = edge.node
    const {
      title,
      slug,
      guid,
      subtitle,
      season,
      episodeNumber,
      episodeType,
      publicationDate,
      author,
      source: {
        childMp3: { duration },
        size,
        publicURL: url,
      },
      explicit,
      categories,
    } = edge.node.frontmatter

    // add an episode item to the feed using the options
    feed.item({
      guid,
      title,
      date: publicationDate,
      description: excerpt,
      url: pluginOptions.siteUrl + slug,
      categories,
      author: author,
      custom_elements: [
        { "itunes:title": title },
        { "itunes:subtitle": subtitle },
        season && { "itunes:season": season },
        episodeNumber && { "itunes:episode": episodeNumber },
        { "itunes:duration": duration },
        { "itunes:episodeType": episodeType },
        { "itunes:explicit": explicit },
        { "itunes:summary": excerpt },
        { "itunes:author": author },
        {
          "itunes:image": {
            _attr: {
              href: feedOptions.image_url,
            },
          },
        },
        { "googleplay:description": excerpt },
        { "googleplay:explicit": explicit },
      ],
      enclosure: {
        url,
        size,
        type: "audio/mpeg",
      },
    })
  })

  // write the rss out to a file
  const publicPath = `./public`
  const outputPath = path.join(publicPath, pluginOptions.outputPath)
  const outputDir = path.dirname(outputPath)
  if (!(await fs.exists(outputDir))) {
    await fs.mkdirp(outputDir)
  }
  await fs.writeFile(outputPath, feed.xml())
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    console.log(node.frontmatter.slug)

    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.frontmatter.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/episode.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
