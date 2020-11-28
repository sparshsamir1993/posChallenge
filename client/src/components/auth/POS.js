import React, { useState } from "react";
import { connect } from "react-redux";
import { setBadge } from "../../actions";

let POS = (props) => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [quantity, setQuantity] = useState(0);
  let [items, setItems] = useState([]);
  let [total, setTotal] = useState(0);
  let submitItem = () => {
    setItems([...items, { name, price, quantity }]);
    let sum = [...items, { name, price, quantity }].reduce(
      (c, v) => (c += v.price * v.quantity),
      0
    );
    setTotal(sum);
    props.setBadge(sum > props.limit);
  };
  let renderForm = () => {
    return (
      <React.Fragment>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitItem();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.currentTarget.value)}
          ></input>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.currentTarget.value)}
          ></input>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => setQuantity(e.currentTarget.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        <h1>{total}</h1>
      </React.Fragment>
    );
  };

  let renderItems = () => {
    return (
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td className="item">{item.name}</td>
              <td className="item">{item.price}</td>
              <td className="item">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div>
      <section>{renderForm()}</section>
      <section>{renderItems()}</section>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    limit: state.auth?.creditLimit,
  };
}
export default connect(mapStateToProps, { setBadge })(POS);
