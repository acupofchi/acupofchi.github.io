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

const Episode = ({ data }) => {
  // TODO: deeplink the podcast
  return (
    <MDXProvider components={{ ...shortcodes }}>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        canonical={data.mdx.frontmatter.slug}
      />
      <Layout>
        <h1 className="mt-10 mb-8 text-logo-brown font-bold text-5xl">
          {data.mdx.frontmatter.title}
        </h1>
        <div className="prose lg:prose-xl">
          <blockquote>{data.mdx.excerpt}</blockquote>
          <audio controls className="w-full">
            <source
              src={data.mdx.frontmatter.source.publicURL}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </Layout>
    </MDXProvider>
  )
}

export default Episode
