import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ place: values.place, link: values.link }, reset())
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      isValid={isValid}
      onClose = {resetForClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      >
        <div className="popup__text-container">
          <input
            type="text"
            className={`form__input form__input_place-name ${isInputValid.place === undefined || isInputValid.place ? '' : 'form__input_invalid'}`}
            name="place"
            id="place"
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
            value={values.place ? values.place : ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_type_place">{errors.place}</span>
        </div>
        <div className="popup__text-container">
          <input
            type="url"
            className={`form__input form__input_place-link ${isInputValid.link === undefined || isInputValid.link ? '' : 'form__input_invalid'}`}
            name="link"
            id="link"
            placeholder="Ссылка на картинку"
            required
            value={values.link ? values.link : ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_type_link">{errors.link}</span>
        </div>
      </PopupWithForm>
  )
}