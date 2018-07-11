import React from 'react'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

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
                <Input value={email} placeholder="email" onChange={this.handleEmailCHange}/>
                <Input value={password} type='password' placeholder="password" onChange={this.handlePasswordCHange} />
                <Button color="primary" onClick={this.handleSubmit}>Entrez</Button>
                <Button color="secondary" onClick={this.handleSignup}>Sign Up</Button>
            </div>
        )
    }

}

export default Login