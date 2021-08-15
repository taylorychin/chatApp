import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as channelAPI from "../../utilities/channels-api"
import TextareaAutosize from 'react-textarea-autosize'

import socket from "../../utilities/socket";
import "./ChannelDetailPage.css";


export default function ChannelDetailPage({ user }) {
    const [channel, setChannel] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState('');

    const { id } = useParams();

    function handleChannelUpdated(updatedChannel) {
        setChannel(updatedChannel);
    }

    function handleSendMessage(evt) {
        evt.preventDefault();
        channelAPI.sendMessage(id, { content: newMessage });
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

    if (!channel) return null;
    return (
        <>
            <div class="main-container">
                <div class="elements">

                    <h1>{channel.title}</h1>
                    <h3>{channel.desc}</h3>

                    <div class="messages-container">
                        {channel.messages.length > 0 ?
                            channel.messages.map((m) =>
                                <div class="message-box">
                                    <span class="message-name"> {m.ownerName} </span>
                                    <div class="message-content"> &nbsp;&nbsp; {m.content}
                                        {/* {user._id === m.ownerId ?
                                    <button type="submit" onClick={handle}> X </button>
                                    :
                                    <> </>
                                } */}
                                    </div>
                                </div>

                            )
                            :
                            <h3>There is nothing here</h3>
                        }
                        <div className="form-container">
                            <form onSubmit={handleSendMessage}>
                                <TextareaAutosize class="chat-input" value={newMessage} onChange={handleChange} required />
                                <button type="submit" >send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}