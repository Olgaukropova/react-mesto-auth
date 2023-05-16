import React from 'react';

function InfoTooltip() {
  return (
    <div className="popup popup__infoTooltip">
      <div className="popup__container">
        <button className="popup__button-close popup__button-close_delete" type="button"></button>
        <img className="popup__infoTooltip_image" src="./media/checkMark.jpg" alt="отметка" />
        <p className="popup___infoTooltip_text">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  )
}

export default InfoTooltip;