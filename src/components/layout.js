import React from "react"

import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div className="xl:mx-auto max-w-6xl mt-4 mx-4">
      <nav>
        <ul className="flex space-x-4">
          <li className="flex-1">
            <Link className="font-cursive text-logo-brown text-lg" to="/">
              a{" "}
              <svg
                className="inline w-6 h-6 fill-current text-logo-red"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 764.16 764.16"
              >
                <path d="M618.77,143.21h-223c-78.41,0-142.56,64.15-142.56,142.56h0c0,78.4,64.15,142.55,142.56,142.55h223c78.41,0,142.56-64.15,142.56-142.55h0C761.33,207.36,697.18,143.21,618.77,143.21Zm42.81,139.58a54.76,54.76,0,0,1-54.76,54.76H429.64a54.76,54.76,0,0,1-54.76-54.76h0A54.76,54.76,0,0,1,429.64,228H606.82a54.77,54.77,0,0,1,54.76,54.77Z" />
                <rect
                  x="43.87"
                  y="540.92"
                  width="546.59"
                  height="74.53"
                  rx="5.24"
                />
                <path d="M43.87,143.21V333.63c0,139.63,122.36,252.81,273.3,252.81S590.46,473.26,590.46,333.63V143.21Z" />
              </svg>{" "}
              of chi
            </Link>
          </li>
          <li className="">
            <Link className="text-gray-500" to="/episodes">
              episodes
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}
export default Layout
