import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {Redirect, Switch, Route, useHistory} from "react-router-dom";
import { getContent, register, authorize } from '../utils/auth'
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDeleteConfirmPopupOpen, setDeleteConfirmPopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [isRenderLoading, setRenderLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  },[]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData);
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
  },[]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setisAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setisEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const handleDeleteButtonClick = (card) => {
    setDeleteConfirmPopupOpen(true);
    setSelectedDeleteCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    });
  };

  const handleCardDelete = ((card) => {
    setRenderLoading(true)
    api.deleteCard(card._id).then(() => {
      setCards((state) => [...state.filter(c => c._id !== card._id)])
      closeAllPopups()
    }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => setRenderLoading(false));
  });

  const handleUpdateUser = ({name, about}) => {
    setRenderLoading(true)
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch(err => {
        console.log(`Ошибка: ${ err }`)
      }).finally(() => setRenderLoading(false));
  };

  const handleUpdateAvatar = ({avatar}) => {
    setRenderLoading(true)
    api.editAvatar(avatar).then(res => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => setRenderLoading(false));
  };

  const handleAddPlaceSubmit = ({name, link}) => {
    setRenderLoading(true)
    api.addCard(name, link).then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups()
    }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => setRenderLoading(false));
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({});
    setDeleteConfirmPopupOpen(false);
  };

  const checkToken = () => {
    if(localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      getContent(token)
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true);
        })
        .catch(err => console.log(err.message));
    }
  }

  const handleRegister = (email, password) => {
    register(email, password)
      .then(res => {
        console.log('register', res)
        history.push('/sign-in');
        })
  }

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then(res => {
        if(res.token) {
          localStorage.setItem('jwt', res.token);
          checkToken();
        }
        setLoggedIn(true);
        })
  }

  return (
    <div className="App page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header className="header" setLoggedIn={setLoggedIn} email={email} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main className="content"
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteButtonClick}
              cards={cards}
              handleCardLike={handleCardLike}
            />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>

        <Footer className="footer" />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          renderLoading={isRenderLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          renderLoading={isRenderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          renderLoading={isRenderLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={handleCardClick}
        />
        <DeleteConfirmPopup
          card={selectedDeleteCard}
          onClose={closeAllPopups}
          isOpen={isDeleteConfirmPopupOpen}
          onDeleteConfirm={handleCardDelete}
          renderLoading={isRenderLoading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;

