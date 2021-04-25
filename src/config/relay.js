import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'

import { getJwToken } from '../utils/auth'

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000'

const fetchQuery = async (operation, variables) => {
  const request = {
    method: 'POST',
    body: JSON.stringify({
      query: operation.text,
      variables
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const jwToken = await getJwToken()
  if (jwToken) request.headers.Authorization = `JWT ${jwToken}`
  return fetch(API_HOST + '/graphql', request).then(response => {
    return response.json()
  })
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})

export default environment
