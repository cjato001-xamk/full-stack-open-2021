import bcrypt from 'bcrypt'

import { User } from '../../models/user'
import { IMockUser } from '../mock/user'

const createMockUser = async (user: IMockUser): Promise<void> => {
  const mockUser = Object.assign({}, user)
  mockUser.passwordHash = await bcrypt.hash(<string>mockUser.password, 10)
  delete mockUser.password

  const userObject = new User(mockUser)
  await userObject.save()
}

export { createMockUser }
