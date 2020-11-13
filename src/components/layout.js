import React from "react"

import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light bg-white">
        <a className="navbar-brand mr-auto" href="/">
          a cup of chi
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" href="/episodes">
              episodes
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#hosts">
              hosts
            </a>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" href="/contact">
              contact
            </Link>
          </li> */}
        </ul>
        {/* </div> */}
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout
