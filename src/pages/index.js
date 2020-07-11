import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

import GooglePodcasts from "../images/EN_Google_Podcasts_Badge.svg"
import ApplePodcasts from "../images/spotify-podcast-badge-blk-grn-165x40.svg"
import Spotify from "../images/US_UK_Apple_Podcasts_Listen_Badge_RGB.svg"
// import logo from "../images/logo.svg"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "banner-tech.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    blaine: file(relativePath: { eq: "blaine.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    karthik: file(relativePath: { eq: "karthik.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    recentEpisodes: allMdx(
      filter: { frontmatter: { status: { eq: "published" } } }
      sort: { order: DESC, fields: frontmatter___publicationDate }
    ) {
      nodes {
        frontmatter {
          slug
          subtitle
          title
        }
        excerpt
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    <div className="banner">
      <BackgroundImage
        className="banner"
        Tag="section"
        fluid={data.banner.childImageSharp.fluid}
        // TODO: better
        backgroundColor={`#040e18`}
      >
        <h1>
          {/* Make this the accent colour */}
          Pour a cup <br />
          and take a seat.
        </h1>
        <p>
          We're going to shed some light on <b>Human Computer Interaction</b>.
          In this podcast we take a deep dive on specific topics in our overall
          field of research. We invite guests to fill out the spaces we don't
          know (<i>hint: there's a guest on every episode</i>). We try to
          publish an episode every month.
        </p>
      </BackgroundImage>
    </div>
    <section>
      <img src={ApplePodcasts} />
      <img src={Spotify} />
      <img src={GooglePodcasts} />
    </section>
    <section>
      <h2>Hosts</h2>
      <div>
        <h3>Blaine Lewis</h3>
        <div>
          <div>
            <Img fluid={data.blaine.childImageSharp.fluid} />
          </div>
          <div>
            <p>
              Most of my research looks at how we can design interfaces that
              prioritise productivity rather than ease of use. Surprisingly
              these two things don't always go hand in hand once we start
              looking at longer timescales.
            </p>
            <a href="http://blainelewis.ca">blainelewis.ca</a>
          </div>
        </div>
      </div>
      <div>
        <h3>Karthik Mahadevan</h3>
        <div>
          <div>
            <Img fluid={data.karthik.childImageSharp.fluid} />
          </div>
          <div>
            <p>
              Karthik researchers Human Robot Interaction. Currently his
              research is focused on improving the way
            </p>
            <a href="http://blainelewis.ca">blainelewis.ca</a>
          </div>
        </div>
      </div>
    </section>
    <section>
      {data.recentEpisodes.nodes.map(episode => (
        <div>
          <Link to={episode.frontmatter.slug}>
            <h3>{episode.frontmatter.title}</h3>
          </Link>
          <p>{episode.excerpt}</p>
        </div>
      ))}
    </section>
  </Layout>
)

export default IndexPage
