import { useState, useEffect, useRef, useContext } from 'react'
import isEqual from 'lodash/isEqual'
import camelToSentenceCase from '../utils/camelToSentenceCase'

import { NotificationContext } from '../context/Notification'
import mutate from '../utils/mutate'
import validate from '../utils/validation'

function _validateInput (input, required, setErrors) {
  const errors = {}
  let isValid = true
  for (const key in input) {
    if (required.includes(key) && !input[key]) {
      errors[key] = `${camelToSentenceCase(key)} can not be blank`
      isValid = false
    } else if (input[key] && !validate(key, input[key])) {
      errors[key] = `Invalid ${camelToSentenceCase(key)}`
      isValid = false
    }
  }
  setErrors(errors)
  return isValid
}

function useForm ({
  setValue,
  mutation,
  vars,
  defaultInput,
  required = [],
  afterSubmit,
  massageInput,
  placeholder,
  noResetOnSubmit
}) {
  const notification = useContext(NotificationContext)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState(defaultInput)
  const [errors, setErrors] = useState({})
  const ref = useRef(false)
  if (!vars) vars = {}

  useEffect(() => {
    ref.current = true
    return () => { ref.current = false }
  }, [])

  function validateInput () {
    return _validateInput(input, required, setErrors)
  }

  function handleServerError (error) {
    if (error.message) {
      notification.show('There was a problem completing the requested action. Please try again soon, or contact us if the problem persists.', 'danger')
    } else if (Array.isArray(error) && error[0].message) {
      notification.show(error[0].message, 'danger')
    }
  }

  function handleChange (e) {
    const { name, value } = e.target
    const newInput = Object.assign({}, input)
    newInput[name] = value
    setInput(newInput)
  }

  function handleChangeForPlaceholder (e) {
    const { name, value } = e.target
    const newInput = Object.assign({}, input)
    newInput[name] = value
    if (!value.includes(placeholder)) {
      setValue(placeholder + value)
    } else {
      setValue(value)
    }
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
      handleServerError(serverErrors)
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
    handleSubmit,
    handleChangeForPlaceholder
  }
}

export default useForm
