import React, { useState } from "react";
import { connect } from "react-redux";
import { setCreditLimit } from "../../actions";

let CreditLimit = (props) => {
  let [cLimit, setCLimit] = useState(0);
  console.log(props);
  let saveCreditLimit = async () => {
    if (props.userId) await props.setCreditLimit(cLimit, props.userId);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveCreditLimit();
      }}
    >
      <label htmlFor="creditLimit">Credit Limit</label>
      <input
        name="creditLimit"
        type="text"
        onChange={(e) => setCLimit(e.currentTarget.value)}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
};
function mapStateToProps(state) {
  return { userId: state.auth?.id };
}

export default connect(mapStateToProps, { setCreditLimit })(CreditLimit);
