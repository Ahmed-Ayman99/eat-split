import { useReducer } from "react";

import { useUsers } from "../context/UsersContext";

import styles from "./FormSplit.module.css";
import Button from "./Button";

const initialState = {
  billValue: "",
  myExpense: "",
  userExpense: "",
  whoIsPaying: "you",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setBill":
      return { ...state, billValue: action.payload };

    case "setMeExpense":
      return {
        ...state,
        myExpense:
          +action.payload > +state.billValue ? state.billValue : action.payload,
        userExpense:
          +state.billValue -
          (+action.payload > +state.billValue
            ? state.billValue
            : action.payload),
      };

    case "setWhoPaying":
      return { ...state, whoIsPaying: action.payload };

    default:
      return state;
  }
};

const FormSplit = ({ selectedUser, setSelectedUser }) => {
  const { dispatch: dispatchUser } = useUsers();

  const [{ billValue, myExpense, userExpense, whoIsPaying }, dispatch] =
    useReducer(reducer, initialState);

  const handelBillValue = (e) =>
    dispatch({ type: "setBill", payload: e.target.value });

  const handelMyExpense = (e) =>
    dispatch({ type: "setMeExpense", payload: e.target.value });

  const handelSelect = (e) =>
    dispatch({ type: "setWhoPaying", payload: e.target.value });

  const handelsubmit = (e) => {
    e.preventDefault();

    if (!billValue || !myExpense || !userExpense || !whoIsPaying) return;

    const balance =
      whoIsPaying === "you"
        ? billValue - myExpense
        : (billValue - userExpense) * -1;

    dispatchUser({
      type: "add-bill",
      payload: {
        balance,
        id: selectedUser.id,
      },
    });

    setSelectedUser(null);
  };

  return (
    <form onSubmit={handelsubmit} className="form-split-bill">
      <h2>split a bill with {selectedUser.name}</h2>

      <label className={styles.label} htmlFor="bill-val">
        💰 Bill value
      </label>
      <input
        onChange={handelBillValue}
        value={billValue}
        type="number"
        id="bill-val"
      />

      <label className={styles.label} htmlFor="my-expense">
        🧍‍♀️ Your expense
      </label>
      <input
        onChange={handelMyExpense}
        value={myExpense}
        type="number"
        id="my-expense"
      />

      <label className={styles.label} htmlFor="user-expense">
        👫 {selectedUser.name} expense
      </label>
      <input disabled value={userExpense} type="number" id="user-expense" />

      <label className={styles.label} htmlFor="who-pay">
        🤑 Who is paying the bill
      </label>
      <select onChange={handelSelect} value={whoIsPaying}>
        <option value="you">You</option>
        <option value={selectedUser.name}>{selectedUser.name}</option>
      </select>
      <Button>Add</Button>
    </form>
  );
};

export default FormSplit;
