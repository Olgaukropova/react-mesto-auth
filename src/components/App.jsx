import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../../src/context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute.jsx';
import * as auth from './../utils/auth.js';



function App() {
  const [openEditPopup, setEditOpenPopup] = React.useState(false);
  const [openAddPopup, setEditAddPopup] = React.useState(false);
  const [openAvatarPopup, setAvatarAddPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [openImage, setOpenImage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();


  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData)
        setCurrentUser(userData);
        //  console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleEditProfileClick = () => {
    setEditOpenPopup(true)
  }
  const handleAddPlaceClick = () => {
    setEditAddPopup(true)
  }
  const handleEditAvatarClick = () => {
    setAvatarAddPopup(true)
  }
  const closeAllPopups = () => {
    setEditOpenPopup(false);
    setEditAddPopup(false);
    setAvatarAddPopup(false);
    setOpenImage(false);
    // setSelectedCard(card)    
  }
  const handleCardClick = (card) => {
    setOpenImage(true)
    setSelectedCard(card)
  }
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      })
  }
  const handleUpdateUser = (data) => {
    api.changeUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }
  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
        //  console.log(avatar)
      })
      .catch((err) => {
        console.error(err);
      })
  }
  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      // console.log(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
  }
  const handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards((el) => el.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
    }
    const handleRegister = ({ email, password }) => {
      auth.register(email, password)
        .then((data) => {
          if (data) {
            navigate('/sign-in')
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }

    const handleLogin = ({ email, password }) => {
      auth.authorize(email, password)
      .then((res)=>{
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/')        
      })
      
      .catch((err) => {
        console.error(err);
      })
    }

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header
                text='Выйти'
              />
              <ProtectedRoute element={Main}
                onEditPopup={handleEditProfileClick}
                onAddProfile={handleAddPlaceClick}
                onAvatarPopup={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                cards={cards}
              />
              <Footer />
            </>
          } />

          <Route path="/sign-up" element={
            <>
              <Header
                text='Войти' />
              <Register
                onRegister={handleRegister} />
            </>
          } />

          <Route path="/sign-in" element={
            <>
              <Header
                text='Регистрация' />
              <Login 
              onLogin ={handleLogin}/>
            </>
          } />



        </Routes>



        <EditProfilePopup isOpen={openEditPopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={openAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={openAddPopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          isOpen={openImage}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
