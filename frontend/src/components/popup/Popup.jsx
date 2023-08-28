export default function Popup({ name, children, isOpen, onClose }) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div
        className={`${name === 'image' ? 'popup__figure' : 'popup__container-register-login'} ${name === 'successful' || name === 'error' ? 'popup__container_type-registration' : ''}`}
        onMouseDown={(evt) => evt.stopPropagation()}>
        <button className="popup__close" type="button" onClick={onClose} />
        {children}
      </div>
    </div>
  )
}
