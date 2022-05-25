import reject from '../images/reject.svg'
import success from '../images/success.svg'

function InfoTooltip({ onClose, regOk, isOpen }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
      <button
        className="popup__close-button button-hover"
        type="button"
        onClick={onClose}
      />
      <img
        className='popup__image-infotooltip'
        src={regOk ? success : reject}
        alt='Иконка'
      />
      <h2 className="popup__form-title">{regOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip
