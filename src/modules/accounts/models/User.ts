class User {
  id: string
  name: string
  email: string
  avatar: string
  isAdmin: boolean
  password: string
  created_at: Date
  driver_license: string
  avatar_url: () => string
}

export { User }
