import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User } from "./types"

// Mock users - in a real app, this would be in a database
const users: User[] = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
]

export async function login(username: string, password: string) {
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    // Set a cookie to indicate the user is logged in
    cookies().set("auth", JSON.stringify({ id: user.id, username: user.username }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, user: { id: user.id, username: user.username } }
  }

  return { success: false, error: "Invalid username or password" }
}

export async function logout() {
  cookies().delete("auth")
}

export async function getUser() {
  const authCookie = cookies().get("auth")

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
