import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-avatar"
      title="Обновить Аватар"
      buttonName={props.renderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        className="popup__form-input popup__container-form-input_type_avatar"
        placeholder="Ссылка на фото аватара"
        required
        id="input-avatar-url"
        ref={avatarRef}
      />
      <span className="popup__error input-avatar-url-error"></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
