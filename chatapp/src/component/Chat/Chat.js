import React, { useEffect,  useState } from 'react'
import { user } from '../Join/Join';
import { io } from "socket.io-client";
import './Chat.css';
import sendlogo from '../../images/send.png';
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import ActiveUser from '../ActiveUser/ActiveUser';
//import iphone_ding_ringtone from '../../audios/iphone_ding_ringtone.mp3';

var CryptoJS = require("crypto-js");
//var audio = new Audio(iphone_ding_ringtone);

const ENDPOINT = "http://localhost:4500/";

let socket;

const Chat = () => {

    const [id, setid] = useState("");   // keep track of user id
    const [messages, setMessages] = useState([]);
    const [usersList, setUsersList] = useState([]);
    
    const send = () => {
        const message = document.getElementById('chatInput').value;
        const ciphertext = CryptoJS.AES.encrypt( message , 'secret key 123').toString();

        socket.emit('message', { ciphertext, id });
        document.getElementById('chatInput').value = "";
    }

    // .on used for data receiving 
    // .emit is used for data sending
    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert("connected");
            setid(socket.id);
        });
        socket.emit('new-user-joined', { user });

        return () => {
            socket.disconnect();
      }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            console.log(data.user, data.message, data.id);
            setMessages([...messages,data]);
      })
      return () => {
      }
    }, [messages])
    
        useEffect(() => {
        socket.on('user-joined', (users) => {
            setUsersList(Object.values(users));
            console.log(users);
            
            usersList.map((item) => console.log(item));
        })
        socket.on('user-left', (users) => {
            setUsersList(Object.values(users));
            console.log(users);
            console.log('user left');
            usersList.map((item) => console.log(item));
        })
    
      return () => {
          
      }
    }, [usersList])
    

    function positions(userId) {
        if (userId === id) {
            return 'right';
        } else {
            //audio.play();
            return 'left';
        }
    }
    
    console.log(usersList);
  return (
      <div className='chatPage'>
          <div className='activeUsersContainer'>
              <div className='activeUsersHeader'>
                  <h2>Active Users</h2>
              </div>
              <div className='activeUsersBox'>
                  {usersList.map((item) => <ActiveUser user={item} />)}
              </div>
          </div>
          <div className='chatContainer'>
            <div className='header'>
                <h2>CHAT APP</h2>
                <a href="/" ><img src={closeIcon} alt="Close"/></a>
            </div>

            <ReactScrollToBottom className='chatBox'>
                {messages.map((item) => <Message user={item.id===id ? '': item.user} message={item.message} classs={positions(item.id)} />)}   
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input placeholder="Type a message..." onKeyPress={(e)=>e.key==='Enter'? send():null} type="text" id="chatInput" />
                <button onClick={ send } className='sendBtn'><img src={sendlogo} alt="Send" /></button>
            </div>
          </div>
      </div>
  )
}
// item is an object which contains user, message, id
// in line 76 : we are using <a> instead of <Link> because link tag just reloads the component only, but here we need page reload.

export default Chat


























    //console.log(messages);
/*
    const send = () => {
        const message = document.getElementById('chatInput').value;
        const ciphertext = CryptoJS.AES.encrypt( message , 'secret key 123').toString();

        socket.emit('message', { ciphertext, id });
        document.getElementById('chatInput').value = "";
    }

    // .on used for data receiving 
    // .emit is used for data sending
    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert("connected");
            setid(socket.id);
        });

        socket.emit('new-user-joined', { user });

        socket.on('user-joined', (data) => {
            data.message = CryptoJS.AES.encrypt( data.message , 'secret key 123').toString();
            setMessages([...messages, data]);
            if (data.id !== id) {
                audio.play();  
            }
            console.log(data.user, data.message);
        });
 
        socket.on('welcome-new-user', (data) => {
            data.message = CryptoJS.AES.encrypt( data.message , 'secret key 123').toString();
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on('user-leave', (data) => {
            console.log('user left');
            console.log(data.user, data.message);
            data.message = CryptoJS.AES.encrypt( data.message , 'secret key 123').toString();
            setMessages([...messages,data]);
        });
        
        return () => {
            socket.disconnect();
      }
    }, [])
    
    useEffect(() => {
        socket.on('sendMessage', (data) => {
            if (data.id !== id) {
                audio.play();  
            }
            console.log(data.user, data.message, data.id);
            setMessages([...messages,data]);
            
      })
    
      return () => {
          socket.off();
      }
    }, [messages])
*/