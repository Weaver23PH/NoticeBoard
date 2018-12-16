import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./App.scss";
import Note from '../Note/Note';
import Board from '../Board/Board';

class App extends React.Component {
    render() {
        let style = {
            position: "fixed",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
        };
        return (
            <div style={style} className={styles.App}>
                <Board count={25}/ >
            </div>
        )
    }
}

export default App;