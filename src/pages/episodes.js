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
      <section className="mt-16 max-w-4xl mx-auto mb-20">
        <h2 className="text-5xl mb-8 text-logo-brown font-bold">Episodes</h2>
        <div className="row">
          {data.allMdx.nodes.map(episode => (
            <EpisodeListing key={episode.frontmatter.title} episode={episode} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Episodes
