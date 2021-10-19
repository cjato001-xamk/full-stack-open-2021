interface IMockUser {
  name: string
  username: string
  password?: string
  passwordHash?: string
}

const mockUsers: IMockUser[] = [
  {
    name: 'Michael Chan',
    username: 'michael',
    password: 'M1cha3l',
  },
  {
    name: 'Edsger W. Dijkstra',
    username: 'edsger',
    password: '3d5geR',
  },
  {
    name: 'Robert C. Martin',
    username: 'robert',
    password: 'r0B3rt',
  },
]

export { IMockUser, mockUsers }
