import { formatDistance } from "date-fns"
import { Link } from "gatsby"
import React from "react"

const EpisodeListing = ({
  episode: {
    frontmatter: { slug, title, publicationDate },
    excerpt,
  },
}) => {
  publicationDate = new Date(publicationDate)
  return (
    <div>
      <h3 className="text-lg font-medium inline mr-2">
        <Link to={slug}>{title}</Link>
      </h3>
      <span className="inline  italic text-gray-600">
        {formatDistance(publicationDate, new Date(), { addSuffix: true })}
      </span>
      <div>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}

export default EpisodeListing
