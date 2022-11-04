import {SecurePassword} from "@blitzjs/auth"
import { api } from "../../src/blitz-server"
import db from "../../prisma"

const signup = api(async (req, res, ctx) => {
  const email = req.body.email
  const password = req.body.password

  const hashedPassword = await SecurePassword.hash(password)

  const user = await db.user.create({
    data: {email, hashedPassword},
    select: {id: true, name: true, email: true},
  })

  await ctx.session.$create({
    userId: user.id,
    email: user.email,
  })

  res.status(200).json({ user })
})


export default signup