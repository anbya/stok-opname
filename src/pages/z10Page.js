import React, { Component } from 'react';
import Navbar from "./navbar";
import Z10 from "./z10";

class z10Page extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Z10 />
            </div>
        );
    }
}

export default z10Page;