import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Фотография автора."
        />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="Edit-button"
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__info-text">
            <h1 className="profile__avatar-name">{currentUser.name}</h1>
            <p className="profile__avatar-job">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button button-hover"
            type="button"
            onClick={props.onEditProfile}
          />
        </div>
        <button
          className="profile__add-button button-hover"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card) =>
          <Card card={card}
          key={card._id}
          onCardClick={props.onCardClick}
          onCardLike={props.handleCardLike}
          onCardDelete={props.onCardDelete}
          />
        )}
      </section>
    </main>
  );
};

export default Main;
