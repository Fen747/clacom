import React from 'react'

class Login extends React.Component{

    state={
        email: '',
        password:''
    }

    handleEmailCHange = ({target: {value: email}}) => {
        this.setState({email})
    }

    handlePasswordCHange = ({target: {value: password}}) => {
        this.setState({password})
    }

    handleSubmit = () => {
        console.log(this.state)
        const {email, password} = this.state
        Meteor.loginWithPassword(email, password, (error)=>{
            console.log('success')
        //this.props.history.push('/')

        })
    }

    handleSignup = () => {
        this.props.history.push('/signup')
    }


    render(){
        const {email, password} = this.state

        return(
            <div>
                <input value={email} placeholder="email" onChange={this.handleEmailCHange}/>
                <input value={password} type='password' placeholder="password" onChange={this.handlePasswordCHange} />
                <button onClick={this.handleSubmit}>Entrez</button>
                <button onClick={this.handleSignup}>Sign Up</button>

            </div>
        )
    }

}

export default Login