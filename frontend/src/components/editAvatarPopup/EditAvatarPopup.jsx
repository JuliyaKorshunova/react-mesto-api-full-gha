import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation.js"
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
const input = useRef()
const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

function resetForClose() {
  onClose()
  reset()
}

function handleSubmit(evt) {
  evt.preventDefault()
  onUpdateAvatar({avatar: input.current.value}, reset())
}

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      >
        <div className="popup__text-container">
          <input
            ref={input}
            type="url"
            className={`form__input form__input_place-link ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'form__input_invalid'}`}
            name="avatar"
            id="avatar"
            placeholder="Ссылка на картинку"
            required
            value={values.avatar ? values.avatar : ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_type_avatar">{errors.avatar}</span>
        </div>
    </PopupWithForm>
  )
}