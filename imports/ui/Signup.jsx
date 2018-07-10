import React from 'react'



class Signup extends React.Component{

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
        Accounts.createUser({email, password}, error=>{
            console.log('success')
        //this.props.history.push('/')

        })
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    render(){
        const {email, password} = this.state
        
        return(
            <div>
                <input value={email} placeholder="email" onChange={this.handleEmailCHange}/>
                <input value={password} type='password' placeholder="password" onChange={this.handlePasswordCHange} />
                <button onClick={this.handleSubmit}>Register</button>
                <button onClick={this.handleLogin}>Login</button>

            </div>
        )
    }

}

export default Signup