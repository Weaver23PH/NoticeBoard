import React from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import styles from "./Note.scss";

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            mail: "",
            category: "",
            color: "white",
            msgPresent: false
        }
    }
    randomBetween = (min, max) => {
        return (min + Math.ceil(Math.random() * max));
    };
    componentWillMount() {
        this.renderStyle = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)',
        };
        this.editStyle = {
            right: `50%`,
            top: `33%`,
            zIndex: 500,
            backgroundColor: "white",
            height: `350px`,
            width: `350px`
        }
    };
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).draggable();
    };
    edit = () => {
        this.setState({ editing: true });
    }
    save = () => {
        this.props.onChange(this.refs.newText.value, this.props.index);
        this.setState({ editing: false });
    }

    remove = () => {
        this.props.onRemove(this.props.index);
    }

    read = () => {
        this.setState({ editing: !this.state.editing });
        this.setState({ msgPresent: !this.state.msgPresent })
    }
    handleMailChange = (event) => {
        this.setState({
            mail: event.target.value
        })
    }
    handleMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }
    changeColor = (cat) => {
        if (cat == "buy/sell") {
            this.setState({ color: "yellow" });
        } else if (cat == "help") {
            this.setState({ color: "orangered" });
        } else if (cat == "other") {
            this.setState({ color: "lightblue" });
        } else if (cat == "give away") {
            this.setState({ color: "lawngreen" });
        } else {
            this.setState({ color: "white" });
        }
    }

    handleOptionChange = (event) => {
        let cat = event.target.value;
        this.setState({ category: cat });
        console.log(cat);
        this.changeColor(cat);
    }
    mailto = () => {
        if (this.state.mail != "") {
            if (this.state.mail.includes("@") == false || this.state.mail.includes(".") == false) {
                alert("this is not a correct email format")
            } else {
                let email = this.state.mail;
                let subject = this.props.children;
                let mailto_link = 'mailto:' + email + "?subject=" + subject;
                window.location.href = mailto_link;
            }
        }
    }
    renderDisplay() {
        return (
            <div className={styles.Note}
                style={{ backgroundColor: this.state.color, ...this.renderStyle }}
            >
                <p>{this.props.children}</p>
                <span>
                    {this.state.category == "" && <button onClick={this.edit}
                        className="btn btn-primary"><i className="fas fa-pencil-alt"></i></button>}
                    {this.state.category != "" && <button onClick={this.read}
                        className="btn btn-primary"><i className="fas fa-book-open"></i></button>}
                    <button onClick={this.remove}
                        className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                    <button onClick={this.mailto}
                        className="btn btn-danger" disabled={this.state.mail == ""}><i className="fas fa-envelope"></i></button>
                </span>
            </div>
        );
    }
    renderForm() {
        return (
            <div>
                {this.state.msgPresent == false && <div className={styles.Note} style={this.editStyle}>
                    <input ref="newText" defaultValue={this.props.children}
                        className="form-control" maxlength="50" size="50" placeholder="enter subject here"></input>
                    <textarea name="message" value={this.state.message} onChange={this.handleMessageChange} className="form-control" cols="30" rows="10" maxlength="600" placeholder="enter some details here"></textarea>
                    <input type="email" value={this.state.mail} onChange={this.handleMailChange}
                        className="form-control" placeholder="enter email here" size="50"></input>
                    {this.state.category == "" && <div className={styles.radioBox}>
                        <label>
                            <input type="radio" name="buy/sell" value="buy/sell" checked={this.state.category == "buy/sell"} onChange={this.handleOptionChange} />buy/sell</label>
                        <label>
                            <input type="radio" name="give away" value="give away" checked={this.state.category == "give away"} onChange={this.handleOptionChange} />give away</label>
                        <label>
                            <input type="radio" name="help" value="help" checked={this.state.category == "help"} onChange={this.handleOptionChange} />help</label>
                        <label>
                            <input type="radio" name="other" value="other" checked={this.state.category == "other"} onChange={this.handleOptionChange} />other</label></div>}
                    <button onClick={this.save} disabled={this.state.mail == ""} className="btn btn-success btn-sm"><i className="fas fa-save"></i></button>
                </div>}
                {this.state.msgPresent == true && <div className={styles.Note} style={this.editStyle}><p className={styles.message}>{this.state.message}</p>
                <span>
                <button onClick={this.read} className="btn btn-success btn-sm"><i class="fas fa-sign-out-alt"></i></button>
                </span>
                </div>}
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