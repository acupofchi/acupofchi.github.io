import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const shortcodes = {}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      frontmatter {
        title
        source {
          publicURL
        }
      }
    }
  }
`

export default ({ data }) => {
  return (
    <MDXProvider components={{ ...shortcodes }}>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        canonical={data.mdx.frontmatter.slug}
      />
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <audio controls>
          <source
            src={data.mdx.frontmatter.source.publicURL}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
        <div>{data.mdx.blurb}</div>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}
