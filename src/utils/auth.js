export const getJwToken = async () => {
  const response = localStorage.getItem('token')
  return response
}

export const setJwToken = (token) => {
  localStorage.setItem('token', token)
}
