import {useEffect} from 'react';

const ImagePopup = ({card, onClose, isOpen}) => {
  useEffect(() => {
    if(!isOpen) return;

    function handleEsc(e) {
      if(e.key === "Escape") {
        onClose()
      }
    };

    document.addEventListener('keydown', handleEsc);
    return ()=> document.removeEventListener('keydown', handleEsc);
  });

  return (
    <div className={`popup popup_photo ${card._id && 'popup_opened'}`}>
      <div className="popup__photo-container">
        <button
          className="popup__close-button button-hover"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__photo"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__photo-name">{card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;
