import propTypes from "prop-types";

import Button from "./Button";

const Friend = ({ friend, isSelected, onClick }) => {
  const balanceText = (() => {
    if (friend.balance > 0) {
      return (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      );
    }

    if (friend.balance < 0) {
      return (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      );
    }

    return <p>You and {friend.name} are even</p>;
  })();

  return (
    <li className={isSelected ? "selected" : ""}>
      <img alt={friend.name} src={friend.image} />
      <h3>{friend.name}</h3>

      {balanceText}

      <Button onClick={() => onClick(friend)}>
        {isSelected ? "Close" : "Open"}
      </Button>
    </li>
  );
};

Friend.propTypes = {
  friend: propTypes.object,
  isSelected: propTypes.boolean,
  onClick: propTypes.function,
};
export default Friend;
