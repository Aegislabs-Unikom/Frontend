import Navbar from "../component/Navbar";
import React, { Component } from "react";

class DashboardPage extends Component{
    render(){
        return (
            <div className="text-gray-600 font-body">
                <Navbar />
            </div>
        )
    }
}

export default DashboardPage;