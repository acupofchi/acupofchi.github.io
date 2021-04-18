import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import GooglePodcasts from "../images/EN_Google_Podcasts_Badge.svg"
import Spotify from "../images/spotify-podcast-badge-blk-grn-165x40.svg"
import ApplePodcasts from "../images/US_UK_Apple_Podcasts_Listen_Badge_RGB.svg"

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

    blaine: file(relativePath: { eq: "blaineheadshot.jpg" }) {
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
        {/* <Thumbnail
          className="img-responsive img-fluid rounded-2xl shadow-lg"
          title="A cup of chi logo"
        /> */}
        <svg
          id="Layer_1"
          className="img-responsive img-fluid rounded-2xl shadow-lg"
          title="A cup of chi logo"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 761 761"
        >
          <defs>
            <style>
              {
                ".cls-1{fill:#b89957;}.cls-2,.cls-3{fill:#fbfcfc;}.cls-3{font-size:130px;font-family:Sacramento-Regular, Sacramento;}"
              }
            </style>
          </defs>
          <rect className="cls-1" width="761" height="761" />
          <path
            className="cls-2"
            d="M430.21,590H385.79A27.86,27.86,0,0,0,358,617.79v.42A27.86,27.86,0,0,0,385.79,646h44.42A27.86,27.86,0,0,0,458,618.21v-.42A27.86,27.86,0,0,0,430.21,590Zm-3.3,38h-34a10.5,10.5,0,0,1-10.5-10.5h0a10.5,10.5,0,0,1,10.5-10.5h34a10.5,10.5,0,0,1,10.5,10.5h0A10.5,10.5,0,0,1,426.91,628Z"
          />
          <rect
            className="cls-2"
            x="317"
            y="667"
            width="107"
            height="15"
            rx="5.24"
          />
          <path
            className="cls-2"
            d="M317,590v37.12c0,27.22,23.95,49.28,53.5,49.28S424,654.34,424,627.12V590Z"
          />
          <text
            className="cls-3"
            transform="translate(120.66 184.69) scale(1.16 1)"
          >
            a cup of chi
          </text>
        </svg>
        {/* <img
          alt="A cup of chi logo"
          className="img-responsive img-fluid rounded-2xl shadow-lg"
          src={Thumbnail}
        /> */}
      </div>
      <div className="md:px-4 lg:py-0 py-2">
        {/* gradient for the big text maybe? text-transparent bg-gradient-to-br to-logo-white bg-clip-text from-logo-brown */}
        <h1 className="text-logo-red  text-5xl md:text-7xl  font-bold mb-4">
          Pour a cup and take a seat.
        </h1>
        <p className="mb-4 text-lg text-gray-700">
          We're going to shed some light on <b>Human Computer Interaction</b>.
          In this podcast we take a deep dive on specific topics in our overall
          field of research. We invite guests to fill out the spaces we don't
          know (<i>hint: there's a guest on every episode</i>). We try to
          publish an episode every month.
        </p>
        <div className="gap-2 md:grid grid-cols-3 space-y-4 md:space-y-0 p-8 md:p-0">
          <a
            className="block"
            href="https://podcasts.apple.com/ca/podcast/a-cup-of-chi/id1561081322"
          >
            <img
              className="w-full"
              alt="Listen on Apple Podcasts"
              src={ApplePodcasts}
            />
          </a>
          <a
            className="block"
            href="https://open.spotify.com/show/4qCp2enpMJiosJP5zHkc2W"
          >
            <img className="w-full" alt="Listen on Spotify" src={Spotify} />
          </a>
          <a
            className="block"
            href="https://podcasts.google.com/feed/aHR0cHM6Ly9hY3Vwb2ZjaGkuZ2l0aHViLmlvL2ZlZWQueG1s"
          >
            <img
              className="w-full"
              alt="Listen on Google Podcasts"
              src={GooglePodcasts}
            />
          </a>
        </div>
      </div>
    </section>

    <section className="mt-12 lg:grid grid-cols-2 gap-4">
      <div className="text-center lg:mb mb-8">
        <div className="w-80 h-80 mx-auto mb-6">
          <Img
            className="rounded-full shadow-lg"
            alt="Profile picture of Blaine"
            fluid={data.blaine.childImageSharp.fluid}
          />
        </div>
        <h3 className="mb-2 text-3xl font-bold text-logo-red">Blaine Lewis</h3>
        <p className="text-justify md:px-10 text-gray-700">
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
            className="rounded-full shadow-lg"
            alt="Profile picture of Blaine"
            fluid={data.karthik.childImageSharp.fluid}
          />
        </div>
        <h3 className="mb-2 text-3xl font-bold text-logo-red">
          Karthik Mahadevan
        </h3>
        <p className="md:px-10 text-justify text-gray-700">
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
    <section className="mt-16 max-w-4xl mx-auto mb-20">
      <h2 className="text-2xl font-bold">Episodes</h2>
      <div className="row">
        {data.recentEpisodes.nodes.map(episode => (
          <EpisodeListing key={episode.frontmatter.title} episode={episode} />
        ))}
      </div>
    </section>
  </Layout>
)

export default IndexPage
