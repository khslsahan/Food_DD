import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PrismaClient } from "../lib/generated/prisma"
import bcrypt from "bcryptjs"
import type { User } from "./types"

const prisma = new PrismaClient()

 

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (user && await bcrypt.compare(password, user.password)) {
    // Set a cookie to indicate the user is logged in
    const cookieStore = await cookies()
    cookieStore.set("auth", JSON.stringify({ id: user.id, username: user.username }), {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, user: { id: user.id, username: user.username } }
  }

  return { success: false, error: "Invalid username or password" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth")
}

export async function getUser() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("auth")

  if (!authCookie) {
    return null
  }

  try {
    return JSON.parse(authCookie.value)
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
