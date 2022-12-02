import React from 'react';
import './Message.css';


var CryptoJS = require("crypto-js");



const Message = ({ user, message, classs }) => {
    var bytes  = CryptoJS.AES.decrypt(message, 'secret key 123');
  message = bytes.toString(CryptoJS.enc.Utf8);

  if (classs==='left') {
    return (
      <div className={`messageBox ${classs}`}>
          {`${user}: ${message}`}
      </div>
    )
  } else {
    return (
      <div className={`messageBox ${classs}`}>
          {`You: ${message}`}
      </div>
    )
  }
}

export default Message;