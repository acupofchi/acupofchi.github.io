import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import GooglePodcasts from "../images/EN_Google_Podcasts_Badge.svg"
import ApplePodcasts from "../images/spotify-podcast-badge-blk-grn-165x40.svg"
import Spotify from "../images/US_UK_Apple_Podcasts_Listen_Badge_RGB.svg"

import Placeholder from "../images/placeholder.png"

// import logo from "../images/logo.svg"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EpisodeListing from "../components/EpisodeListing"

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "banner-tech.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
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
          publicationDate
        }
        excerpt
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />

    <section className="row">
      <div className="col-xs-12 col-md-6">
        <img
          alt="A cup of chi logo"
          className="img-responsive img-fluid"
          src={Placeholder}
        />
      </div>
      <div className="col-xs-12 col-md-6">
        <h1>Pour a cup and take a seat.</h1>
        <p>
          We're going to shed some light on <b>Human Computer Interaction</b>.
          In this podcast we take a deep dive on specific topics in our overall
          field of research. We invite guests to fill out the spaces we don't
          know (<i>hint: there's a guest on every episode</i>). We try to
          publish an episode every month.
        </p>
        <div className="row">
          <img
            className="col"
            alt="Listen on Apple Podcasts"
            src={ApplePodcasts}
          />
          <img className="col" alt="Listen on Spotify" src={Spotify} />
          <img
            className="col"
            alt="Listen on Google Podcasts"
            src={GooglePodcasts}
          />
        </div>
      </div>
    </section>

    <section className="mt-5 mb-3 px-md-5">
      <h2 className="text-center display-4 mb-3" id="hosts">
        Hosts
      </h2>
      <div className="container-sm">
        <div className="row mb-3">
          <div className="col-xs-12 col-md-4">
            <Img
              className="rounded"
              alt="Profile picture of Blaine"
              fluid={data.blaine.childImageSharp.fluid}
            />
          </div>
          <div className="col-xs-12 col-md-8">
            <h3>Blaine Lewis</h3>
            <p>
              Most of my research looks at how we can design interfaces that
              prioritise productivity rather than ease of use. Surprisingly
              these two things don't always go hand in hand once we start
              looking at longer timescales.
            </p>
            <a href="http://blainelewis.ca">blainelewis.ca</a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-4 order-xs-first order-md-last">
            <Img
              className="rounded"
              alt="Profile picture of Karthik"
              fluid={data.karthik.childImageSharp.fluid}
            />
          </div>
          <div className="col-xs-12 col-md-8 ">
            <h3>Karthik Mahadevan</h3>
            <p>
              Karthik researchers Human Robot Interaction. Currently his
              research is focused on improving the way
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="">
      <h2 className="text-center display-4 mb-3">Episodes</h2>
      <div className="row">
        {data.recentEpisodes.nodes.map(episode => (
          <EpisodeListing episode={episode} />
        ))}
      </div>
    </section>
  </Layout>
)

export default IndexPage
