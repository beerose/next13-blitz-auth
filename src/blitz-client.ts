import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"

export const authConfig = {
  cookiePrefix: "blitz-auth-with-next-app"
}

export const { withBlitz, useSession } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
  ],
})
