export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, isValid=true }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
    <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
      <button className="button popup__close" type="button" onClick={onClose}/>
      <form className="popup__form" name={name} action="#" noValidate onSubmit={onSubmit}>
        <h2 className={`popup__subtitle text ${name === 'delete' ? 'popup__subtitle_delete' : ''}`}>{title}</h2>
        {children}
        <button
          type="submit"
          className={`popup__submit ${isValid ? '' : 'popup__submit_disable'}`}
          name="button"
          disabled={isSend}
        >
          {isSend ? 'Сохранить...' :  titleButton||'Сохранить'}
        </button>
      </form>
    </div>
  </div>
  )
}