import { useCallback, useEffect, useState } from "react";
import api from "../utils/api.js";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import PopupImage from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";
import DeletePopup from "./deletePopup/DeletePopup.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.js";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SendContext from "../contexts/SendContext.js";
import { authorization, getUserData, registration } from "../utils/auth.js";
import ProtectedPage from "./protectedPage/ProtectedPage.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";

function App() {
  const navigate = useNavigate()
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [isSend, setIsSend] = useState(false)
//стейт контекста
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')
// стейты карточки
  const [cards, setCards] = useState([])
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')
// стейт логина
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
//состояние попапов
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopup || isSuccessful || isError
  const closeAllPopups = useCallback (() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
    setIsDeletePopupOpen(false)
    setIsSuccessful(false)
    setIsError(false)
  }, [])

  useEffect(() => {
    function closePopupEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closePopupEsc)
      return () => {
        document.removeEventListener('keydown', closePopupEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.email)
          setLoggedIn(true)
          setIsCheckToken(false)
          navigate('/')
        })
        .catch(err => console.log(`Ошибка авторизации при повторном входе ${err}`))
    } else {
      setIsCheckToken(false)
      setLoggedIn(false)
    }
  }, [navigate])

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true)
  }, [])
    
  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true)
  }, [])

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true)
  }, [])

  const handleDeletePopupClick = useCallback((cardId) => {
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
  }, [])

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card)
    setImagePopup(true)
  }, [])
  
  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
      .then(([userEmail, dataCards])  => {
        setCurrentUser(userEmail)
        setCards(dataCards)
        setIsLoadingCards(false)
      })
      .catch((err) => console.error(`Ошибка при загрузке начальных данных ${err}`))
    }
  }, [loggedIn])

  const handleSubmit = useCallback((request, textError) => {
    setIsSend(true)
    request()
      .then(closeAllPopups)
      .catch((err) => console.error(`${textError} ${err}`))
      .finally(() => setIsSend(false))
  }, [closeAllPopups])

  const handleDeleteSubmit = useCallback(() => {
    function makeRequest() {
      return (api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => { return card._id !== deleteCardId }))
      })
      )
    }
    handleSubmit(makeRequest, 'Ошибка при удалении карточки')
  }, [cards, deleteCardId, handleSubmit])

  const handleUpdateUser = useCallback((userEmail) => {
    function makeRequest() {
      return (api.setUserInfo(userEmail, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
      }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании профиля')
  }, [handleSubmit])
    
  const handleUpdateAvatar = useCallback((userEmail) => {
    function makeRequest() {
      return (api.setNewAvatar(userEmail, localStorage.jwt)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании аватара')
  }, [handleSubmit])
    
  const handleAddPlaceSubmit = useCallback((dataCard) => {
    function makeRequest() {
      return (api.addCard(dataCard, localStorage.jwt)
        .then(res => {
          setCards([res, ...cards]);
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при добавлении карточки')
  }, [cards, handleSubmit])
 
  const handleLike = useCallback((card) => {
    const isLike = card.likes.some(element => currentUser._id === element)
    if (isLike) {
      api.deleteLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.addLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }, [currentUser._id])

  function handleLogin(password, email) {
    setIsSend(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        window.scrollTo(0, 0)
        navigate('/')
      })
      .catch(err => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(password, email) {
    setIsSend(true)
    registration(password, email)
      .then(() => {
        setIsSuccessful(true)
        window.scrollTo(0, 0)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
      
          <SendContext.Provider value={isSend}>
            <Routes>
              <Route path='/' element={<ProtectedRoute
                element={ProtectedPage}
                userEmail={userEmail}
                openProfile={handleEditProfileClick}
                openCard={handleAddPlaceClick}
                openAvatar={handleEditAvatarClick}
                openDelete={handleDeletePopupClick}
                onCardClick={handleCardClick}
                onCardLike={handleLike}
                cards={cards}
                isLoading={isLoadingCards}
                loggedIn={loggedIn}
                isCheckToken={isCheckToken}
                />
              } />
              <Route path='/sign-up' element={
                <>
                  <Header name='signup' />
                  <Main name='signup' isCheckToken = {isCheckToken} handleRegister={handleRegister} />
                </>
              } />
              <Route path='/sign-in' element={
                <>
                  <Header name='signin' />
                  <Main name='signin' isCheckToken = {isCheckToken} handleLogin={handleLogin} />
                </>
              } />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </SendContext.Provider>
      
      <Footer />

    <SendContext.Provider value={isSend}>
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleDeleteSubmit}
      />
    </SendContext.Provider>

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        titleButton='Да'
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleDeleteSubmit}
        isSend={isSend}
      />
          
      <PopupImage card={selectedCard} isOpen={isImagePopup} onClose = {closeAllPopups} />

      <InfoTooltip
          name='successful'
          titleText={'Вы успешно зарегистрировались!'}
          isOpen={isSuccessful}
          onClose={closeAllPopups}
        />
      
      <InfoTooltip
        name='error'
          titleText={'Что-то пошло не так! Попробуйте ещё раз.'}
          isOpen={isError}
          onClose={closeAllPopups}
      />
    
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App