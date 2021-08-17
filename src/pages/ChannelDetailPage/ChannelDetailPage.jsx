import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import * as channelAPI from "../../utilities/channels-api"
import TextareaAutosize from 'react-textarea-autosize'

import socket from "../../utilities/socket";
import "./ChannelDetailPage.css";


export default function ChannelDetailPage({ user }) {
    const [channel, setChannel] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState('');
    const textAreaRef = useRef();
    const submitButtonRef = useRef();

    const { id } = useParams();

    function handleChannelUpdated(updatedChannel) {
        setChannel(updatedChannel);
    }

    function handleSendMessage(evt) {
        evt.preventDefault();
        const msg = newMessage.replace("\n", "<br/>")
        channelAPI.sendMessage(id, { content: msg });
        setNewMessage("");
    }

    function handleChange(evt) {
        setNewMessage(evt.target.value)
        setError('');
    }


    useEffect(() => {
        async function fetchChannel() {
            const channel = await channelAPI.getOne(id);
            setChannel(channel);
            console.log(channel);
        }
        fetchChannel();
        socket.on("channel-updated", handleChannelUpdated);
        socket.emit("join-channel", id);

        return () => {
            socket.removeListener("channel-updated", handleChannelUpdated);
            socket.emit("leave-channel", id);
        }
    }, [id])


    useEffect(() => {
        function handleEnter(event) {
            console.log(event);
            if (event.shiftKey) return;
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                submitButtonRef.current.click();
            }
        }
        if (textAreaRef.current) {
            textAreaRef.current.addEventListener("keydown", handleEnter);
            return () => textAreaRef.current.removeEventListener("keydown", handleEnter);
        }
    }, [textAreaRef.current]);

    if (!channel) return null;
    return (
        <>
            <div className="main-container">
                <div className="elements">

                    <h1>{channel.title}</h1>
                    <h3>{channel.desc}</h3>


                    <div className="messages-container">
                        {channel.messages.length > 0 ?
                            channel.messages.map((m) =>
                                <div className="message-box" key={m._id}>
                                    <span className="message-name"> {m.ownerName} </span>
                                    <div className="message-content" dangerouslySetInnerHTML={{ __html: m.content }}></div>
                                </div>

                            )
                            :
                            <h3>There is nothing here</h3>
                        }
                    </div>

                    {/* {user._id === m.ownerId ?
                        <button type="submit" onClick={handle}> X </button>
                        :
                        <> </>
                        } */}
                    <div className="form-container">
                        <form onSubmit={handleSendMessage}>

                            <TextareaAutosize ref={textAreaRef} className="chat-input" value={newMessage} onChange={handleChange} required />
                            <button ref={submitButtonRef} type="submit" className="send-button">send</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )




}
// https://allegra9.medium.com/add-emoji-picker-to-your-react-chat-app-30d8cbe8d9a6