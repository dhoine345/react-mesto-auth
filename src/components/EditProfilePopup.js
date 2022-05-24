import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onUpdateUser, onClose, renderLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => setName(e.target.value);

  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonName={renderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
      >
      <input
        type="text"
        name="name"
        className="popup__form-input popup__form-input_type_name"
        required
        minLength="2"
        maxLength="40"
        id="input-name"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        name="job"
        className="popup__form-input popup__form-input_type_job"
        required
        minLength="2"
        maxLength="200"
        id="input-job"
        value={description || ''}
        onChange={handleChangeDescription}
      />
        <span className="popup__error input-job-error"></span>
    </PopupWithForm>
  )
};

export default EditProfilePopup;
