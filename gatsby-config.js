module.exports = {
  siteMetadata: {
    title: `A Cup of CHI`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `episodes`,
        path: `${__dirname}/content/episodes/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      // TODO: setup manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-podcast-feed-mdx`,
    //   options: {
    //     title: `A Cup of CHI`,
    //     subtitle: ``,
    //     description: ``,
    //     summary: `Podcast summary`,
    //     podcastType: `episodic`,
    //     siteUrl: `https://podcast.com`,
    //     imageUrl: `https://podcast.com/podcast-image/png`,
    //     feedUrl: `https://podcast.com/pocast-rss-feed.xml`,
    //     language: `en-ca`,
    //     copyright: `Copyright © 2020 Blaine Lewis and Karthik Mahadevan`,
    //     authorName: `Blaine Lewis and Karthik Mahadevan`,
    //     ownerName: `Blaine Lewis and Karthik Mahadevan`,
    //     ownerEmail: `acupofchipodcast@gmail.com`,
    //     managingEditor: `acupofchipodcast@gmail.com`,
    //     webMaster: `acupofchipodcast@gmail.com`,
    //     explicit: `no`,
    //     publicationDate: `July 20, 2020 10:00:00 GMT`,
    //     category1: `Arts`,
    //     subCategory1: `Books`,
    //     category2: `Education`,
    //     subCategory2: `Courses`,
    //     category3: `Business`,
    //     subCategory3: `Marketing`,
    //     timeToLive: `60`,
    //     outputPath: `/feed.xml`,
    //   },
    // },

    `gatsby-plugin-mdx`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
