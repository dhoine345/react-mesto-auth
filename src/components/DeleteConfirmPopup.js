import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onDeleteConfirm(props.card);
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="delete-card"
      title="Вы уверены?"
      buttonName={props.renderLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
};

export default DeleteConfirmPopup;
