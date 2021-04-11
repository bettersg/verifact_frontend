export const getJwToken = async () => {
  return localStorage.getItem('token')
}

export const setJwToken = (token) => {
  localStorage.setItem('token', token)
}
