import React, { Component, useEffect, useState } from "react";
import SignIn from "./auth/SignIn";

import SignUp from "./auth/SignUp";
import POS from "./auth/POS";
import CreditLimit from "./auth/CreditLimit";
import { connect } from "react-redux";
import { getCurrentUser, logUserOut } from "../actions";
import Cookies from "js-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: this.props.auth?.id > 0,
      showSignin: false,
      showSignUp: false,
      showRegister: false,
      showCreditLimitSetup: false,
    };
  }
  async componentDidMount() {
    console.log(Cookies.get("user_sid"));
    await this.props.getCurrentUser(Cookies.get("user_sid"));
    this.setState({ isAuth: this.props.auth?.id > 0 });
  }
  render() {
    console.log(this.props);

    let badgeStyle = {
      height: "50px",
      width: "50px",
      background: "green",
      borderRadius: "50%",
    };
    if (this.props.limitCrossed) {
      badgeStyle.background = "red";
    }
    return (
      <div>
        <div className="credit-check-wrap">
          <span>Credit Limit: {this.props.auth?.creditLimit}</span>
          <div className="credit-check-badge" style={badgeStyle}></div>
        </div>
        <ul>
          {!this.state.isAuth && (
            <React.Fragment>
              <li
                onClick={() =>
                  this.setState({
                    showSignin: true,
                    showSignUp: false,
                    showRegister: false,
                    showCreditLimitSetup: false,
                  })
                }
              >
                Login
              </li>
              <li
                onClick={() =>
                  this.setState({
                    showSignin: false,
                    showSignUp: true,
                    showRegister: false,
                    showCreditLimitSetup: false,
                  })
                }
              >
                Sign up
              </li>
            </React.Fragment>
          )}
          {this.state.isAuth && (
            <React.Fragment>
              {this.props.auth.creditLimit && (
                <li
                  onClick={() =>
                    this.setState({
                      showSignin: false,
                      showSignUp: false,
                      showRegister: true,
                      showCreditLimitSetup: false,
                    })
                  }
                >
                  Show POS
                </li>
              )}
              <li
                onClick={() =>
                  this.setState({
                    showSignin: false,
                    showSignUp: false,
                    showRegister: false,
                    showCreditLimitSetup: true,
                  })
                }
              >
                Set credit limit
              </li>
              <li onClick={() => this.props.logUserOut()}>logout</li>
            </React.Fragment>
          )}
        </ul>
        {this.state.showSignin && <SignIn />}
        {this.state.showSignUp && <SignUp />}
        {this.state.showRegister && <POS />}
        {this.state.showCreditLimitSetup && <CreditLimit />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    limitCrossed: state.limitCrossed,
  };
}
export default connect(mapStateToProps, { getCurrentUser, logUserOut })(App);
