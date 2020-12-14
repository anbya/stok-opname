import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse'
const buttonRef = React.createRef()


class csvReader extends Component {
    handleOnDrop = (data) => {
        console.log('---------------------------')
        console.log(data[0])
        console.log('---------------------------')
    }
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }
    render() {
        return (
            <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton
                removeButtonColor='#659cef'
                onRemoveFile={this.handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        );
    }
}

export default csvReader;