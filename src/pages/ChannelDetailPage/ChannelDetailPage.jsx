import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as channelAPI from "../../utilities/channels-api"
import TextareaAutosize from 'react-textarea-autosize'

import socket from "../../utilities/socket";


export default function ChannelDetailPage() {
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
        // setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
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
            <h1>{channel.title}</h1>
            <h3>{channel.desc}</h3>

            <div>
                {channel.messages.length > 0 ?
                    channel.messages.map((m) =>
                        <div>
                            <span> {m.ownerName} </span>
                            <div> {m.content} </div>
                        </div>

                    )
                    :
                    <h3>There is nothing here</h3>
                }
                <div className="form-container">
                    <form onSubmit={handleSendMessage}>
                        <TextareaAutosize value={newMessage} onChange={handleChange} required />
                        <button type="submit" >send</button>
                    </form>
                </div>
            </div>
        </>
    )

}