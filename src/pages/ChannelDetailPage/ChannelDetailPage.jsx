import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as channelAPI from "../../utilities/channels-api"

import socket from "../../utilities/socket";


export default function ChannelDetailPage() {
    const [channel, setChannel] = useState(null);
    const [newMessage, setNewMessage] = useState("first message");

    const { id } = useParams();

    function handleChannelUpdated(updatedChannel) {
        setChannel(updatedChannel);
    }

    function handleSendMessage() {
        channelAPI.sendMessage(id, { content: newMessage });
        setNewMessage('');
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
                <button onClick={handleSendMessage} >send message</button>
            </div>
        </>
    )

}