const API_BASE_URL = `${
  // @ts-ignore
  !window.Cypress
    ? process.env.REACT_APP_API_END_POINT
    : process.env.REACT_APP_API_TEST_END_POINT
}`

export const config = {
  API_BASE_URL,
}
