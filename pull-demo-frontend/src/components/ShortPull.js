import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

// import './App.css';

function ShortPull() {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [inputName, setInputName] = useState('')

    useEffect(() => {
        const intervalID =  setInterval(()=>{
            axios({
                method: 'get',
                url: 'http://localhost:3331/messages'
            }).then((response) => {
                setMessages(response.data)
            });
        },5*1000)
        return () => {
            clearInterval(intervalID)
        }
    }, [])

    const handleChangeMessage = (e) => {
        const {target:{value}} = e
        setInputMessage(value)
    }
    const handleChangeName = (e) => {
        const {target:{value}} = e
        setInputName(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3331/messages',
            data: {
                content: inputMessage,
                name: inputName
            }
        });
        setInputName('')
        setInputMessage('')
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="name" type="text" id="name" name="name" onChange={handleChangeName}
                       value={inputName}/>
                <input placeholder="message" type="text" id="message" name="message" onChange={handleChangeMessage}
                       value={inputMessage}/>
                <input type="submit" value="Submit"/>
            </form>
            {messages.map((msg)=>{
                return (<div key={msg.id}>{<p><b>{msg.name}: </b> {msg.content}</p>}</div>)
            })}

            <Link to="/longPull">Long Pull Demo</Link>
        </div>
    );
}

export default ShortPull;
