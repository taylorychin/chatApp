import * as userServices from "../../utilities/users-service"

export default function NewChannelPage() {



  return (
    <>
      <h1> something </h1>
      <button>Create your chat channel!</button>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Channel Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Channel Description (optional)</label>
            <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} />
            <button type="submit" disabled={disable}>Create Channel</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    </>
  );
}