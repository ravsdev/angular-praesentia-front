import { Roles } from './Roles'

export interface User {
  id: number
  firstname: string
  lastname: string
  dni: string
  email: string
  role: Roles
  enabled: boolean
}
