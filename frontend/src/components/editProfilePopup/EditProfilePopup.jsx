import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

  useEffect(() => {
    setValue("username", currentUser.name)
    setValue("profession", currentUser.about)
  },[currentUser, setValue])

  function resetForClose() {
    onClose()
    reset({ username:currentUser.name, profession: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ username: values.username, profession: values.profession }, reset)
  }

  return (
    <PopupWithForm
    name='edit-profile'
    title='Редактировать профиль'
    isOpen={isOpen}
    onClose={resetForClose}
    isValid={isValid}
    isSend={isSend}
    onSubmit={handleSubmit}
    >
    <div className="popup__text-container">
      <input
        type="text"
        className={`form__input form__input_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'form__input_invalid'}`}
        name="username"
        id="username"
        placeholder="Введите имя"
        required
        minLength={2}
        maxLength={40}
        value={values.username ? values.username : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_username">{errors.username}</span>
    </div>
    <div className="popup__text-container">
      <input
        type="text"
        className={`form__input form__input_profession ${isInputValid.profession === undefined || isInputValid.profession ? '' : 'form__input_invalid'}`}
        name="profession"
        id="profession"
        placeholder="Расскажите о себе"
        required
        minLength={2}
        maxLength={200}
        value={values.profession ? values.profession : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_profession">{errors.profession}</span>
    </div>
    </PopupWithForm>
  )
}