import React, { Component,useState } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navCollapse:false,
        fixedNav:"",
        dropdownState:false,
        testState:true,
        testArray:[1,2,5,6]
      };
    }
    componentDidMount = async () =>  {
      let dataParse = await localStorage.getItem("authToken")
      let userInfo = JSON.parse(dataParse)
      this.props.dispatch({ type: "SETUSERINFO", payload: userInfo });
    }
    navToggle = () =>  {
      this.setState({
        ...this.state,
        navCollapse: !this.state.navCollapse
      });
    }
    dropdownToggle = () =>  {
      this.setState({
        ...this.state,
        dropdownState: !this.state.dropdownState
      });
    }
    logout = async () =>{
      await this.props.history.push({ pathname: "/" })
      localStorage.removeItem("authToken");
      localStorage.removeItem("userdata");
    }
    render() {
        return (
              <Navbar color="light" light expand="md" style={{position:"sticky",top:0,zIndex:1}}>
                <NavbarBrand href="/home" style={{width:"150px"}}>
                  JAYGEEGROUP
                </NavbarBrand>
                <NavbarToggler onClick={() => this.navToggle()} />
                <Collapse isOpen={this.state.navCollapse} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/home"})}}>Dashboard</NavLink>
                    </NavItem>
                    { this.props.userinfo.previlege === "MASTER USER" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/user"})}}>User Management</NavLink>
                    </NavItem>: ""
                    }
                    { this.props.userinfo.previlege === "MASTER USER" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/z10"})}}>Z10 Management</NavLink>
                    </NavItem>: ""
                    }
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  this.logout()}>Log Out</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
        );
    }
}

// export default withRouter(navbar);
const mapStateToProps = (state) => {
  return {
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(navbar));