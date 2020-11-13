import { graphql } from "gatsby"
import React from "react"
import EpisodeListing from "../components/EpisodeListing"
import Layout from "../components/layout"

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
  console.log(data)
  console.log(data.allMdx.nodes)
  return (
    <Layout>
      <h1>Episodes</h1>
      {data.allMdx.nodes.map(episode => (
        <EpisodeListing episode={episode} />
      ))}
    </Layout>
  )
}

export default Episodes
