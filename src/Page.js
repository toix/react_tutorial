import React from "react";
import {Car} from "./Car";

function appendStringToDomClass(className, string) {
    let node = document.createElement('div');
    let text_node = document.createTextNode(string);
    node.appendChild(text_node);
    document.getElementsByClassName(className)[0].appendChild(node);
}

let Header = (props) => {
    return <h1>{props.text}</h1>;
}

export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            logs: [],
        };
    }

    changeColor = (color, event) => {
        this.setState({color: color});
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        appendStringToDomClass('logs', 'getSnapshotBeforeUpdate');
        return [prevProps, prevState];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        appendStringToDomClass('logs', 'componentDidUpdate');
    }

    render() {
        return <div>
            <Header text={this.props.header} color={this.props.color}/>
            <div>
                <p style={this.state}>What is in my Garage?</p>
                <Car color={this.state.color}/>
            </div>
            <button type="button" onClick={(event) => this.changeColor('red')}>make red</button>
            <button type="button" onClick={(event) => this.changeColor('blue')}>make blue</button>
            <div className={'logs'}/>
        </div>;
    }
}