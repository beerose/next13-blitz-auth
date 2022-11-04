import { api } from "../../src/blitz-server"

const logout = api(async (_req, res, ctx) => {
  await ctx.session.$revoke()

  res.status(200).json({message: "Logged out"})
})

export default logout
