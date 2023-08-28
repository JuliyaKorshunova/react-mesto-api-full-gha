export default function ButtonLike({ myid, card, onCardLike }) {
  const isLike = card.likes.some(element => myid === element)
  return(
    <>
      <button type="button" className={`element__like-button ${isLike ? 'element__like-button_active' : ''}`} onClick={() => onCardLike(card)} />
      <span className="element__counter" >{card.likes.length}</span>
    </>
  )
}
  