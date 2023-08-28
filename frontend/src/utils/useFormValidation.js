import { useCallback, useState } from "react"

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})

  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form

    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage }
    })
    setIsInputValid((oldIsInputValid) => {
      return { ...oldIsInputValid, [name]: valid }
    })
    setIsValid(form.checkValidity()) 
  }

  function reset(data={}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, reset, setValue }
}
