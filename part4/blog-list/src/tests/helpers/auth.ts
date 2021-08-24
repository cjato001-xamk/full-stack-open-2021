import supertest from 'supertest'

const loginMockUserAndGetAuth = async (
  api: supertest.SuperTest<supertest.Test>,
  username?: string,
  password?: string
): Promise<{ token: string; username: string; name: string } | undefined> => {
  const loginResponse = await api
    .post('/api/auth/login')
    .send({
      username,
      password,
    })
    .expect(200)
    .expect((res: supertest.Response) => {
      expect(res.body.data.token).toBeDefined()
    })

  return loginResponse.body.data
}

export { loginMockUserAndGetAuth }
