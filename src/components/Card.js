import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <article className="element">
      <img className="element__place-photo"
      //src={card.link}
      onClick={handleClick}
      alt={card.name}
      />
      <h2 className="element__place-name">{card.name}</h2>
      <div className="element__like-and-counter">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        />
        <span className="element__likes-counter">{card.likes.length}</span>
      </div>
      <button
        className={`${cardDeleteButtonClassName} button-hover`}
        type="button"
        onClick={handleDeleteClick}
      />
    </article>
  )
};

export default Card;
