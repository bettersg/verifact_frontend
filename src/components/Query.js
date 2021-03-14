import React from 'react'
import { QueryRenderer } from 'react-relay'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import environment from '../config/relay'

function Query ({ query, variables, render }) {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props, retry }) => {
        if (error) {
          return <div>error.message</div>
        } else if (!props) {
          return (
            <Loader>
              <Spinner animation='border' />
            </Loader>
          )
        } else {
          return render({ error, props, retry })
        }
      }}
    />
  )
}

export const Loader = styled.div`
  margin: 2rem auto;
  text-align: center;
`

export default Query
