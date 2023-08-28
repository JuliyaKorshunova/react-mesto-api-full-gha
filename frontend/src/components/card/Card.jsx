import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import ButtonLike from "../buttonLike/ButtonLike.jsx"

export default function Card({ card, onCardClick, openDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <div className="element__item">
      {currentUser._id === card.owner && <button className="button element__delete-button" type="button" onClick={() => { openDelete(card._id) }} />}
      <img className="element__grid-foto" 
      src={card.link}
      alt={`Изображение ${card.name}`} onClick={() => onCardClick({ link: card.link, name: card.name })} 
      />
      <div className="element__container">
        <h2 className="text element__subtitle">{card.name}</h2>
        <div className="element__like-container">
          <ButtonLike myid={currentUser._id} card={card} onCardLike={onCardLike} />
        </div>
      </div>
    </div>
  )
}
