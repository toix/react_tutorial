import React from "react";

export class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: this.props.color, fontSize: '2em'};
    }

    static getDerivedStateFromProps(props, state) {
        return {favoritecolor: props.favcol };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.color !== this.props.color) {
            console.log('change');
            this.setState({color: this.props.color});
        }
    }

    render() {
        return <p>
            My <span style={this.state}>Car</span> is {this.state.color};
        </p>;
    }
}