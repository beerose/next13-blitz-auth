import { AppProps } from "next/app"
import React from "react"
import { withBlitz } from "../src/blitz-client"

function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />)
}

export default withBlitz(MyApp)
