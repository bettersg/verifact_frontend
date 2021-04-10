const getToken = async () => {
  const response = localStorage.getItem('token')
  return response
}

export default getToken
