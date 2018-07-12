import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

class SelectWidget extends React.Component {
    state = {
        options: []
    }

    static defaultProps = {
        multi: false
    }

    constructor(props) {
        super(props)
        this.fetchOptions = this.fetchOptions.bind(this)
    }

    componentDidMount() {
        this.fetchOptions()
    }

    async fetchOptions() {
        try {
            const options = await this.props.getOptions(this.props.value)

            if (options.length) {
                const {
                    attribute,
                    onChange,
                    multi,
                    ongoingEdition,
                    value
                } = this.props
                const defaultValue = ongoingEdition ? value : multi ? [] : ''

                onChange(attribute, defaultValue)
            }

            //console.log(options)

            this.setState({ options })
        } catch (e) {
            console.error(e)
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

    handleChange = ({ target: { value } }) => {
        const { attribute, onChange } = this.props

        onChange(attribute, value)
    }

    _getOptionNameFromValue = selected => {
        console.log('selected', selected)
        console.log('options', this.state.options)

        const { name } = this.state.options.find(opt => {
            console.log('opt', opt)
            return opt.value === selected
        }) || { name: '' }

        return name
    }

    selectInputRenderFc = selected => {
        const { multi, classes } = this.props

        return multi ? (
            <div className={classes.chips}>
                {selected.map(value => (
                    <Chip
                        key={value}
                        label={this._getOptionNameFromValue(value)}
                        className={classes.chip}
                    />
                ))}
            </div>
        ) : (
            <div>{this._getOptionNameFromValue(selected)}</div>
        )
    }

    render() {
        const { options } = this.state
        const { displayName, multi, value, name, disabled } = this.props
        const id = `select-${name}`

        return (
            <FormControl>
                <InputLabel htmlFor={id}>{displayName}</InputLabel>
                <Select
                    id={id}
                    multiple={multi}
                    value={value}
                    onChange={this.handleChange}
                    renderValue={this.selectInputRenderFc}
                    disabled={disabled}
                >
                    {options.map(({ value, name }, idx) => (
                        <MenuItem key={idx} value={value}>
                            <em>{name}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(theme => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 4
    }
}))(SelectWidget)
