import React from "react"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <header>
        A Cup of CHI
        <nav>
          <ul>
            <li>episodes</li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default Layout
