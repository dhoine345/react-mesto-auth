import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({onAddPlace, isOpen, onClose, renderLoading}) {
  //const inputRef = useRef()
  const [name, setName] = useState('');
  const [url, setUrl] = useState('')

  const [formErrors, setFormErrors] = useState('')
  const [inputNameValidation, setInputNameValidation] = useState('')

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeUrl = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link: url
    });
  };

  useEffect(() => {
    if(isOpen) {
      setName('')
      setUrl('')
    }
  })

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    name="add-card"
    title="Новое место"
    buttonName={renderLoading ? 'Сохранение...' : 'Создать'}
    onSubmit={handleSubmit}
  >
    <input
      type="text"
      name="place-name"
      className="popup__form-input popup__container-form-input_type_place"
      placeholder="Название"
      required
      minLength="2"
      maxLength="30"
      id="input-place-name"
      onChange={handleChangeName}
      value={name}
    />
    <span className="popup__error input-place-name-error" formErrors={formErrors}></span>
    <input
      type="url"
      name="link"
      className="popup__form-input popup__container-form-input_type_link"
      placeholder="Ссылка на картинку"
      required
      id="input-place-url"
      onChange={handleChangeUrl}
      value={url}
    />
    <span className="popup__error input-place-url-error"></span>
    </PopupWithForm>
  )
};

export default AddPlacePopup;
