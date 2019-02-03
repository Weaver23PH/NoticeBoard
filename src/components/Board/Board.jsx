import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./Board.scss";
import Note from '../Note/Note';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            helpCheck: true,
            sellCheck: true,
            giveCheck: true,
            otherCheck: true,
        }
    }
    componentWillMount() {
        let self = this;
        if (this.props.count) {
            $.getJSON("https://baconipsum.com/api/?type=all-meat&sentences=" +
                this.props.count + "&start-with-lorem=1&callback=?", function (results) {
                    results[0].split('. ').forEach(function (sentence) {
                        self.add(sentence.substring(0, 40));
                    });
                });
        }
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    add = (text) => {
        let arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({ notes: arr });
    };
    update = (newText, i) => {
        let arr = this.state.notes;
        arr[i].note = newText;
        this.setState({ notes: arr });
    };
    remove = (i) => {
        let arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({ notes: arr });
    };
    eachNote = (note, i) => {
        return (
            <Note key={note.id}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
                helpCheck = {this.state.helpCheck}
                sellCheck = {this.state.sellCheck}
                giveCheck = {this.state.giveCheck}
                otherCheck = {this.state.otherCheck}
                onHelpUpdate={this.helpCheckClick}
                onSellUpdate={this.sellCheckClick}
                onGiveUpdate={this.giveCheckClick}
                onOtherUpdate={this.otherCheckClick}
            >{note.note}</Note>
        );
    };

    helpCheckClick = () => {
        this.setState({
            helpCheck: !this.state.helpCheck
        });
        return this.state.helpCheck
    };
    sellCheckClick = () => {
        this.setState({
            sellCheck: !this.state.sellCheck
        });
        return this.state.sellCheck;
    };
    giveCheckClick = () => {
        this.setState({
            giveCheck: !this.state.giveCheck
        });
        return this.state.giveCheck;
    };
    otherCheckClick = () => {
        this.setState({
            otherCheck: !this.state.otherCheck
        });
        return this.state.otherCheck;
    };
    render() {
        let divStyle = {
            position: "fixed",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
        };
        let buttonStyle = {
            position: "absolute",
            top: "5px",
            right: "5px"
        }
        let divSelectStyle = {
            position: "absolute",
            top: "7px",
            right: "80px",
            display: "flex",
            flexDirection: "row"
        }
        return (
            <div style={divStyle} className={styles.board}>
                {this.state.notes.map(this.eachNote)}
                <div style={divSelectStyle} >
                    <label><input type="checkbox" name="helpCheck" id="helpCheck" checked={this.state.helpCheck} onChange={this.helpCheckClick} />HELP</label>
                    <label><input type="checkbox" name="sellCheck" id="sellCheck" checked={this.state.sellCheck} onChange={this.sellCheckClick} />BUY/SELL</label>
                    <label><input type="checkbox" name="giveCheck" id="giveCheck" checked={this.state.giveCheck} onChange={this.giveCheckClick} />GIVE AWAY</label>
                    <label><input type="checkbox" name="otherCheck" id="otherCheck" checked={this.state.otherCheck} onChange={this.otherCheckClick} />OTHER</label>
                </div>
                <button style={buttonStyle} className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind(null, "New Note")}>Add note</button>
            </div>
        )
    }
}
export default Board;
// propTypes: {
//     count: function(props, propName) {
//         if (typeof props[propName] !== "number") {
//             return new Error('The count property must be a number');
//         }
//         if (props[propName] > 100) {
//             return new Error("Creating " + props[propName] + " notes is ridiculous");
//         }
//     }
// }
