import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import GooglePodcasts from "../images/EN_Google_Podcasts_Badge.svg"
import ApplePodcasts from "../images/spotify-podcast-badge-blk-grn-165x40.svg"
import Spotify from "../images/US_UK_Apple_Podcasts_Listen_Badge_RGB.svg"

import Thumbnail from "../images/thumbnail.svg"

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

    <section className="lg:grid grid-cols-2 mt-8 gap-4">
      <div>
        <img
          alt="A cup of chi logo"
          className="img-responsive img-fluid rounded-2xl"
          src={Thumbnail}
        />
      </div>
      <div className="p-4">
        <h1 className="text-7xl text-logo-red font-bold mb-4">
          Pour a cup and take a seat.
        </h1>
        <p className="mb-4 text-lg">
          We're going to shed some light on <b>Human Computer Interaction</b>.
          In this podcast we take a deep dive on specific topics in our overall
          field of research. We invite guests to fill out the spaces we don't
          know (<i>hint: there's a guest on every episode</i>). We try to
          publish an episode every month.
        </p>
        <div className="flex justify-center space-x-2">
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

    <section className="mt-12 lg:grid grid-cols-2 gap-4">
      <div className="text-center lg:mb mb-8">
        <div className="w-80 h-80 mx-auto mb-6">
          <Img
            className="rounded-full"
            alt="Profile picture of Blaine"
            fluid={data.blaine.childImageSharp.fluid}
          />
        </div>
        <h3 className="mb-2 text-3xl font-bold text-logo-blue">Blaine Lewis</h3>
        <p className="text-justify px-10 ">
          Blaine is a PhD student at the University of Toronto. On the podcast
          he often references his research pertaining to how software users
          become experts. To find interactive demos of his research and other
          fun things, check out{" "}
          <a className="text-logo-blue" href="https://blainelewis.ca">
            his personal web page
          </a>
          .
        </p>
      </div>
      <div className="text-center ">
        <div className="w-80 h-80 mx-auto mb-6">
          <Img
            className="rounded-full"
            alt="Profile picture of Blaine"
            fluid={data.karthik.childImageSharp.fluid}
          />
        </div>
        <h3 className="mb-2 text-3xl font-bold text-logo-blue">
          Karthik Mahadevan
        </h3>
        <p className="px-10 text-justify">
          Karthik Mahadevan is a PhD student in Computer Science at the
          University of Toronto, where he is supervised by Dr. Tovi Grossman and
          Dr. Anthony Tang. He is passionate about how we can design systems and
          techniques to support natural and intuitive human-robot interaction.
          To learn more about Karthik and his research visit his{" "}
          <a className="text-logo-blue" href="https://karthikmahadevan.ca/">
            website
          </a>
          .
        </p>
      </div>
    </section>
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Episodes</h2>
      <div className="row">
        {data.recentEpisodes.nodes.map(episode => (
          <EpisodeListing episode={episode} />
        ))}
      </div>
    </section>
  </Layout>
)

export default IndexPage
