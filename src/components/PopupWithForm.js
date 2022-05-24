import { useEffect } from 'react';

function PopupWithForm({ isOpen, onClose, name, title, onSubmit, children, buttonName }) {
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
    <div
    className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button button-hover"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__form-title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name={name}
          //noValidate
        >
          {children}
          <button
            className="popup__submit-button"
            type="submit"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;
