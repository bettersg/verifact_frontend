import { commitMutation } from 'react-relay'

import environment from '../config/relay'

function mutate(mutation,variables){
  return new Promise((resolve, reject) => {
    commitMutation(
      environment,
      {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          reject(errors)
        } else {
          resolve(response)
        }
      },
      onError: error => reject(error)
      }
  )
  }
)}

export default mutate