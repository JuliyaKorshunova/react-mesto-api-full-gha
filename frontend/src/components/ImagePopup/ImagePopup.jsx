export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_open-figure ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <figure className="popup__figure" onClick={(evt => evt.stopPropagation())}>
        <button className="button popup__close" type="button" onClick={onClose} />
        <img src={card.link ? card.link : '#'} alt={card.name ? `Изображение ${card.name}` : '#'} className="popup__figure-image" />
        <figcaption className="text popup__figure-signature">{card.name && card.name}</figcaption>
      </figure>
    </div>
  )
}