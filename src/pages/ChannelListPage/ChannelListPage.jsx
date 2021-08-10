import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as channelsAPI from "../../utilities/channels-api";


export default function ChannelListPage() {
  const [channels, setChannels] = useState([]);

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
          <li key={ch._id}>
            <Link to={`/channels/${ch._id}`}>
              {ch.title}
            </Link>
          </li>
        )}
      </ul>
    </>
  );
}