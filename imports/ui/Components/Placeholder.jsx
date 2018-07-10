import React from 'react'

class Placeholder extends React.Component {
    state = {
        display: false
    }

    componentDidMount(){
        this.timeout = setTimeout(()=>{
            this.setState({
                display: true
            })
        }, this.props.timeout)
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }


    render(){
        const {display} = this.state

        return(

            display ?
            <div>
                Loading
            </div>
            :
            null
        )
    }

}

Placeholder.defaultProps = {timeout: 500}

export default Placeholder