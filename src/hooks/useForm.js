import { useState, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import camelToSentenceCase from '../utils/camelToSentenceCase'

import mutate from '../utils/mutate'
import validate from '../utils/validation'

function _validateInput (input, required, setErrors) {
  const errors = {}
  let valid = true
  for (const key in input) {
    if (required.includes(key) && !input[key]) {
      errors[key] = `${camelToSentenceCase(key)} can not be blank`
      valid = false
    } else if (input[key] && !validate(key, input[key])) {
      errors[key] = `Invalid ${camelToSentenceCase(key)}`
      valid = false
    }
  }
  setErrors(errors)
  return valid
}

function handleServerError (error, setErrors) {
  if (error.message) {
    setErrors({ form: 'There was a problem completing the requested action. Please try again soon, or contact us if the problem persists.' })
  } else if (Array.isArray(error) && error[0].message) {
    setErrors({ form: error[0].message })
  }
}

function useForm ({
  mutation,
  vars,
  defaultInput,
  required = [],
  afterSubmit,
  massageInput,
  noResetOnSubmit
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState(defaultInput)
  const [errors, setErrors] = useState({})
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true
    return () => { ref.current = false }
  }, [])

  function validateInput () {
    return _validateInput(input, required, setErrors)
  }

  function handleChange (e) {
    const { id, value } = e.target
    const newInput = Object.assign({}, input)
    newInput[id] = value
    setInput(newInput)
  }

  async function handleSubmit (e) {
    e && e.preventDefault && e.preventDefault()
    if (isLoading || !validateInput()) return
    setIsLoading(true)

    try {
      const finalInput = massageInput ? massageInput(input) : input
      const variables = Object.assign(
        {}, vars, { input: finalInput }
      )
      const response = await mutate(mutation, variables)
      afterSubmit && afterSubmit(response)
    } catch (serverErrors) {
      handleServerError(serverErrors, setErrors)
    } finally {
      if (ref.current) {
        setIsLoading(false)
      }
    }
  }

  return {
    input,
    errors,
    isLoading,
    isChanged: !isEqual(defaultInput, input),
    handleChange,
    handleSubmit
  }
}

export default useForm
