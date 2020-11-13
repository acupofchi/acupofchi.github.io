import { Link } from "gatsby"
import React from "react"

const EpisodeListing = ({
  episode: {
    frontmatter: { slug, title, publicationDate },
    excerpt,
  },
}) => {
  return (
    <div>
      <h3>
        <Link to={slug}>{title}</Link>
      </h3>
      <p>{publicationDate}</p>
      <div>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}

export default EpisodeListing
