import React, {Component} from 'react';

// importedComponent is a function reference to a component
const asyncComponent = (importedComponent) => {
    return class extends Component {
        state = {
            component : null
        }
        componentDidMount () {
         //   component we loaded dynamically
         importedComponent()
         .then(cmp => {
             this.setState({component : cmp.default})
         })
        }
        render () {
            let C =this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;