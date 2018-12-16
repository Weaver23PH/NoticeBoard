import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./Board.scss";
import Note from '../Note/Note';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }
    componentWillMount() {
        let self = this;
        if (this.props.count) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
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
            >{note.note}</Note>
        );
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
        return (

            <div style={divStyle} className={styles.board}>
                    {this.state.notes.map(this.eachNote)}
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
