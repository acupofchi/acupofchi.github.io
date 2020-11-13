import React from "react"
import "./layout.css"

import styled from "styled-components"

import { Link } from "gatsby"

let Header = styled.header`
  height: 50px;
  margin: auto;
  max-width: 960px;
  display: flex;
`

let Logo = styled.div`
  flex: 1;
  display: inline-block;
`

let Nav = styled.nav`
  display: inline-block;
`

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Logo>A Cup of CHI</Logo>
        <Nav>
          <ul>
            <li>
              <Link to="/episodes">Episodes</Link>
            </li>
          </ul>
        </Nav>
      </header>

      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default Layout
