import { commitMutation } from 'react-relay'

import environment from '../config/relay'

export default function Mutate ({
  mutation,
  variables,
  uploadables,
  config
}) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, Object.assign({}, {
      mutation,
      variables,
      uploadables,
      onCompleted: (response, errors) => {
        if (errors) {
          reject(errors)
        } else {
          resolve(response)
        }
      },
      onError: error => reject(error)
    }, config))
  })
}

