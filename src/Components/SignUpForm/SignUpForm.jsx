import { Component } from 'react';
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    handleChange = (evt) => {
        //unlike setSomeState in function components 
        //which REPLACE the state with the argument, setState
        //in class componenets, MERGE the provided object with the 
        //existing state object.
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    //class field  syntax defining a method. 
    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            //we dont want to send the error the confirm state properties. 
            const formData = { ... this.state };
            delete formData.error;
            delete formData.confirm;
            //the promise returned by the signUp service method 
            //will resolve to the user object included in the 
            //payload of the JSON webtoken (JWT) 
            const user = await signUp(formData);
            //baby step
            this.props.setUser(user);
        } catch {
            //error occured.
            this.setState({ error: 'sign up failed - try again' });
        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <label>Confirm</label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }

}