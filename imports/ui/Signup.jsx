import React from 'react'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

class Signup extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleEmailCHange = ({ target: { value: email } }) => {
        this.setState({ email })
    }

    handlePasswordCHange = ({ target: { value: password } }) => {
        this.setState({ password })
    }

    handleSubmit = () => {
        const { email, password } = this.state

        Accounts.createUser({ email, password }, error => {
            if (error) console.error(error)
        })
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        const { email, password } = this.state

        return (
            <div>
                <Input
                    value={email}
                    placeholder="email"
                    onChange={this.handleEmailCHange}
                />
                <Input
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={this.handlePasswordCHange}
                />
                <Button color="primary" onClick={this.handleSubmit}>
                    Register
                </Button>
                <Button color="secondary" onClick={this.handleLogin}>
                    Login
                </Button>
            </div>
        )
    }
}

export default Signup
