import Card from "../card/Card.jsx"
import { memo, useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import Spinner from "../spinner/Spinner.jsx"
import Register from "../register/Register.js"
import Login from "../login/Login.js"

const Main = memo(({ name, openCard, openProfile, openAvatar, openDelete, onCardClick, onCardLike, cards, isLoading, handleLogin, handleRegister }) => {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className="main">
      {name === 'main' ?
      <>
        <section className="profile">
          <div className="profile__info">
            <button
              type="button"
              className="profile__button-avatar profile__avatar-overlay" onClick={openAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUser.avatar ? currentUser.avatar : '#'}
                alt="Фото профиля" 
              />
            </button>
              <div className="profile__container">
                <h1 className="text profile__title">{currentUser.name ? currentUser.name : ''}</h1>
                <button className="button profile__button-edit" type="button" onClick={openProfile} />
                <p className="text profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
            </div>
          </div>
          <button className="button profile__add-button" type="button" onClick={openCard} />
        </section>

      <ul className="element">
        {isLoading ? <Spinner/> : cards.map(data => {
          return (
            <li className="element__item" key={data._id}>
              <Card card={data} onCardClick={onCardClick} openDelete={openDelete} onCardLike={onCardLike} />
            </li>
          )
        })}
      </ul>
    </>
      :
      name === 'signup' ?
      <Register name={name} handleRegister={handleRegister} />
      :
      <Login name={name} handleLogin={handleLogin} />
      }
    </main>
  )
})

export default Main