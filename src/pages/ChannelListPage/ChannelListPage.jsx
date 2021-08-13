import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as channelsAPI from "../../utilities/channels-api";


export default function ChannelListPage({ user }) {
  const [channels, setChannels] = useState([]);

  async function handleDelete(id) {
    const response = await channelsAPI.deleteChannel(id)
    setChannels(response);
  }


  useEffect(function () {
    async function getChannels() {
      const channels = await channelsAPI.getAll();
      setChannels(channels);
    }
    getChannels();
  }, [])
  return (
    <>
      <h1>Pick a Channel</h1>
      {/* // list of links with channel names that link to the channel.
        // use effect hook  */}
      <ul>
        {channels.map((ch) =>
          <li class="channel-link" key={ch._id}>
            <Link class="nav-link" to={`/channels/${ch._id}`}>
              {ch.title}
            </Link>
            {user._id === ch.ownerId ?
              <button onClick={() => handleDelete(ch._id)} > X </button>
              :
              <> </>
            }

          </li>
        )}
      </ul>
    </>
  );
}