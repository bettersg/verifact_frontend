import {
  setLocalData,
  getLocalData,
  removeLocalData
} from './localdata'

export const getJwToken = async () => {
  return getLocalData('token')
}

export const setJwToken = (token) => {
  setLocalData('token', token)
}

export const removeJwToken = (token) => {
  removeLocalData('token')
}
