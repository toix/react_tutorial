import * as React from "react";
import style from './style/form.module.scss';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'name',
            age: '33',
            validation: {},
            submit: '',
            desc: 'test',
            country: 'pol',
        };
    }

    validate(form) {
        let validation = {};

        const name = form.querySelector('[name="username"]').value;
        if (name.length < 4) {
            validation['username'] = 'name: at least 4 characters';
        }

        const age = form.querySelector('[name="age"]').value;
        if (!Number(age)) {
            validation['age'] = 'age: only numbers';
        }
        return validation;
    }

    changeGreet = (event) => {

        const validation = this.validate(event.currentTarget.closest('form'));
        this.setState({validation: validation});

        if (!Object.keys(validation).length) {
        }
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({[name]: value});
        this.setState({submit: ''});
    }

    showSubmitFeedback = (event) => {
        event.preventDefault();
        const validation = this.validate(event.target);
        this.setState({validation: validation});

        if (Object.keys(validation).length) {
            this.setState({submit: ''});
        } else {
            this.setState({submit: 'you have submitted!'});
        }
    }

    render() {
        let greet = '';
        console.log(this.state.username, this.state.age)
        if (this.state.username && this.state.age) {
            greet = <p>Hello {this.state.username}! You are {this.state.age} years old.</p>;
        }

        let validation = [];
        for (let [name, message] of Object.entries(this.state.validation)) {
            validation.push(<div key={name}>{message}</div>);
        }

        return (
            <form onSubmit={this.showSubmitFeedback}>
                <div>
                    <label htmlFor={'username'}>Enter your name</label>
                    <input id={'username'} name={'username'} value={this.state.username} onChange={this.changeGreet}/>
                </div><div>
                    <label htmlFor={'age'}>Enter your age</label>
                    <input id={'age'} name={'age'} value={this.state.age} onChange={this.changeGreet}/>
                </div><div>
                    <textarea name={'desc'} value={this.state.desc} onChange={this.changeGreet}/>
                </div><div>
                    <select name={'country'} value={this.state.country} onChange={this.changeGreet}>
                        <option value={'ger'}>Germany</option>
                        <option value={'at'}>Austria</option>
                        <option value={'pol'}>Poland</option>
                    </select>
                </div><div>
                    <button type={"submit"}>Submit</button>
                </div>
                <div style={{color: 'red'}}>{validation}</div>
                {greet}
                <div className={style.test}>{this.state.submit}</div>
            </form>
        );
    }
}
