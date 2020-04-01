import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const id = Math.floor(Math.random() * 100000000);
const LongPull = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [inputName, setInputName] = useState('');
    const subscribe = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3331/subscribe',
            data: {
                id
            }
        }).then((response) => {
            // const newMessages = messages.concat(response.data)
            setMessages(response.data)
            subscribe()
        });
    }
    useEffect(() => {
        subscribe(messages)
    }, [])

    const handleChangeMessage = (e) => {
        const {target: {value}} = e
        setInputMessage(value)
    }
    const handleChangeName = (e) => {
        const {target: {value}} = e
        setInputName(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3331/messagesSubscribe',
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
                <input placeholder="name" type="text" id="name" disabled={false} name="name" onChange={handleChangeName}
                       value={inputName}/>
                <input placeholder="message" type="text" id="message" name="message" onChange={handleChangeMessage}
                       value={inputMessage}/>
                <input type="submit" value="Submit"/>
            </form>
            {messages.map((msg) => {
                return (<div key={msg.id}>{<p><b>{msg.name}: </b> {msg.content}</p>}</div>)
            })}

            <Link to="/">Short Pull Demo</Link>

        </div>
    );
}

export default LongPull;
