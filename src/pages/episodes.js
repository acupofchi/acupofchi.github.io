import { graphql } from "gatsby"
import React from "react"
import EpisodeListing from "../components/EpisodeListing"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query MyQuery {
    allMdx(
      filter: { frontmatter: { status: { eq: "published" } } }
      sort: { fields: frontmatter___publicationDate }
    ) {
      nodes {
        excerpt
        frontmatter {
          title
          slug
          publicationDate
        }
      }
    }
  }
`
let Episodes = ({ data }) => {
  return (
    <Layout>
      <SEO title={"Episodes"} />
      <h1 className="mt-12 mb-4 text-logo-blue font-bold text-3xl">Episodes</h1>
      {data.allMdx.nodes.map(episode => (
        <EpisodeListing key={episode.frontmatter.title} episode={episode} />
      ))}
    </Layout>
  )
}

export default Episodes
