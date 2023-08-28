import { useContext } from "react";
import SendContext from "../../contexts/SendContext";

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
  const isSend = useContext(SendContext)
  return(
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}

{ name === 'signin' || name === 'signup' ? 
<button className={`login__button ${isSend ? 'login__button_loading' : ''} ${isValid ? '' : ''}`}>
  {isSend ? '' : titleButton || 'Сохранить'}
</button>
:
<button className={`popup__submit ${isSend ? 'popup__submit_loading' : ''} ${isValid ? '' : 'popup__submit_disable'}`}>
  {isSend ? '' : titleButton || 'Сохранить'}
</button>
}
</form>
  )
}
