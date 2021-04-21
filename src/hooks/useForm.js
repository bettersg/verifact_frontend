import { useState, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import camelToSentenceCase from '../utils/camelToSentenceCase'

import mutate from '../utils/mutate'
import validate from '../utils/validation'

function _validateInput (input, required, setErrors) {
  const errors = {}
  let valid = true
  for (const key in input) {
    console.log(key)
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

function handleServerErrors (serverErrors, setErrors) {
  console.warn(serverErrors)

  if (serverErrors &&
    Array.isArray(serverErrors) &&
    serverErrors[0]
   ) {
    if (serverErrors[0].detail) {
      const details = serverErrors[0].detail
      const keys = Object.keys(details)
      const errors = {}
      for (let i = 0; i < keys.length; i++) {
        errors[keys[i]] = `${camelToSentenceCase(keys[i])} ${details[keys[i]]}`
      }
      setErrors(errors)
    }
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

  function resetForm () {
    setInput(defaultInput)
    setErrors({})
  }

  function validateInput () {
    return _validateInput(input, required, setErrors)
  }

  function handleChange (name, value) {
    const newInput = Object.assign({}, input)
    newInput[name] = value
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
      const response = await mutate({ mutation, variables })
      afterSubmit && afterSubmit(response)
    } catch (serverErrors) {
      handleServerErrors(serverErrors, setErrors)
    } finally {
      if (ref.current) {
        if (!noResetOnSubmit) resetForm()
        setIsLoading(false)
      }
    }
  }

  return {
    input,
    errors,
    resetForm,
    isLoading,
    isChanged: !isEqual(defaultInput, input),
    handleChange,
    handleSubmit
  }
}

export default useForm
