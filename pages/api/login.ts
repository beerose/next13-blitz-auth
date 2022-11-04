import {SecurePassword} from "@blitzjs/auth"
import { AuthenticationError } from "blitz"
import db from "../../prisma"
import { api } from "../../src/blitz-server"

export const authenticateUser = async (email: string, password: string) => {
  const user = await db.user.findFirst({where: {email}})
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)
  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({where: {id: user.id}, data: {hashedPassword: improvedHash}})
  }

  const {hashedPassword, ...rest} = user
  return rest
}

const login = api(async (req, res, ctx) => {
  const user = await authenticateUser(req.body.email, req.body.password)

  await ctx.session.$create({
    email: user.email,
    userId: user.id,
  })
  res.status(200).json({user})
})

export default login