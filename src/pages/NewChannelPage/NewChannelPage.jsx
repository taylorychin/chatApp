import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as channelsApi from '../../utilities/channels-api';

export default function NewChannelPage() {

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      //await channels api create channel 
      // programatically route to channel list.
      //guide to usercenteric crud 
      await channelsApi.createChannel(formData);
      history.push("/channels");
    } catch {
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }


  return (
    <>
      <h1> something </h1>
      <button>Create your chat channel!</button>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Channel Name</label>
            <input type="text" name="title" value={formData.name} onChange={handleChange} required />
            <label>Channel Description (optional)</label>
            <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
            <button type="submit" >Create Channel</button>
          </form>
        </div>
      </div>
    </>
  );
}