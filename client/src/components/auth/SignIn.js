import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loginUser } from "../../actions";
let SignIn = (props) => {
  let login = async (values) => {
    // console.log(props.loginValues);
    console.log(values);
    await props.loginUser(values);
  };
  return (
    <React.Fragment>
      <h1>Login</h1>

      <form onSubmit={props.handleSubmit(login)}>
        <Field
          key="email"
          type="email"
          name="email"
          label="email"
          component="input"
        ></Field>

        <Field
          key="password"
          type="password"
          name="password"
          label="password"
          component="input"
        ></Field>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    loginValues: state.form.loginForm?.values,
  };
}
SignIn = reduxForm({
  form: "loginForm",
})(SignIn);

export default connect(mapStateToProps, { loginUser })(SignIn);
