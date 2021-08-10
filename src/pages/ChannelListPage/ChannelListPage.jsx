import { useState, useEffect } from 'react';
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
  console.log(channels);
  return (
    <>
      <h1>Pick a Channel</h1>
    // list of links with channel names that link to the channel.
      // use effect hook 
      {/* <Link to="/channels/:id">
        <ul>
          {channels.map((ch) => <li>{ch.title}</li>)}
        </ul>
      </Link> */}
    </>
  );
}