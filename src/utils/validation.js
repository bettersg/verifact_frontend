const validators = {
  email: (email) => {
    return /\S+@\S+/.test(email)
  }
}

function validate (name, value) {
  if (!validators[name]) return true
  return validators[name](value)
}

export default validate
