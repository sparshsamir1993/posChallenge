import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../../actions";
let SignUp = (props) => {
  let login = async (values) => {
    // console.log(props.loginValues);
    console.log(values);
    await props.registerUser(values);
  };
  return (
    <React.Fragment>
      <h1>Register</h1>

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
    signupValues: state.form.signUpForm?.values,
  };
}
SignUp = reduxForm({
  form: "signupForm",
})(SignUp);

export default connect(mapStateToProps, { registerUser })(SignUp);
