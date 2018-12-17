import React from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import styles from "./Note.scss";

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            mail: ""
        }
    }
    randomBetween = (min, max) => {
        return (min + Math.ceil(Math.random() * max));
    };
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)',
        };
    };
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).draggable();
    };
    edit = () => {
        this.setState({ editing: true });
    }
    save = () => {
        this.props.onChange(this.refs.newText.value, this.props.index);
        this.setState({ email: this.refs.email.value });
        this.setState({ editing: false });
    }
    remove = () => {
        this.props.onRemove(this.props.index);
    }
    mailto = () => {
        console.log(this.state.email);
        let email = this.state.email;
        let mailto_link = 'mailto:' + email
        window.location.href = mailto_link;
    }
    renderDisplay() {
        return (
            <div className={styles.Note}
                style={this.style}
            >
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                        className="btn btn-primary"><i className="fas fa-pencil-alt"></i></button>
                    <button onClick={this.remove}
                        className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                    <button onClick={this.mailto}
                        className="btn btn-danger"><i className="fas fa-envelope"></i></button>
                </span>
            </div>
        );
    }
    renderForm() {
        return (
            <div className={styles.Note} style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children}
                    className="form-control"></textarea>
                <input ref="email" defaultValue={this.state.email}
                    className="form-control"></input>
                <button onClick={this.save} className="btn btn-success btn-sm"><i className="fas fa-save"></i></button>
            </div>
        )
    }
    render() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
};

export default Note;