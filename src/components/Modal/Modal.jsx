import React from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pushups: 0
        }

        this.onChange = this.onChange.bind(this);
    }
    
    onChange(e){
        this.setState({pushups: e.target.value})
    }

    render () {
        return (
            <div className='modal-overlay'>  
                <div className='modal-overlay'>
                    <h3>{this.props.text}</h3>
                    <input type="number"  onChange={this.onChange} placeholder={this.props.placeholder}></input>
                    <button onClick={() => this.props.submit(this.state.pushups)}>Submit</button>
                    {!!this.props.cancel &&<button onClick={this.props.cancel}>Cancel</button>}
                </div>
            </div>
        )
    }
}