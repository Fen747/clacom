import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

class SelectInput extends React.Component{
    state= {
        options: []
    }

    static defaultProps = {
        multi: false
    }

    constructor( props ) {
        super(props)
        this.fetchOptions = this.fetchOptions.bind( this )
    }

    componentDidMount(){
        this.fetchOptions()
    }

    async fetchOptions(){
        try {
            const options = await this.props.getOptions()

            if(options.length){
                const {attribute, onChange, multi} = this.props

                onChange(attribute, multi ? [options[0]] : options[0])
            }

            this.setState({ options })
        } catch ( e ) {
            console.error( e )
        }

        /*
        this.props.getOptions().then( result => {
            this.setState({ options })
        })
        .catch( error => {
            console.error( error )
        })
        */
    }

    handleChange = ({target:{value}}) => {
        const {attribute, onChange} = this.props

        onChange(attribute, value)
    }

    render(){
        const {options} = this.state
        const {displayName, multi, value, name, classes} = this.props
        const id = `select-${name}`

        return (
            <FormControl>
                <InputLabel htmlFor={id}>{displayName}</InputLabel>
                <Select
                    id={id}
                    multiple={multi}
                    value={value}
                    onChange={this.handleChange}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
                        </div>
                    )}
                >
                    {options.map((opt, idx)=>(
                        <MenuItem
                            key={idx}
                            value={opt}
                        >
                            <em>
                                {opt}
                            </em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
} 



export default withStyles( theme => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
}) )( SelectInput )