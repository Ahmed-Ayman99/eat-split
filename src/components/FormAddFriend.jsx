import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useUsers } from "../context/UsersContext";
import Button from "./Button";

const FormAddFriend = ({ setShowAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const { dispatch } = useUsers();

  const handleAddFrind = (e) => {
    e.preventDefault();

    if (!image || name.length === 0) return;

    dispatch({
      type: "add-user",
      payload: { id: uuid(), name, image, balance: 0 },
    });

    setImage("");
    setName("");
    setShowAddFriend(false);
  };

  return (
    <form onSubmit={handleAddFrind} className="form-add-friend">
      <label htmlFor="name">👫 Friend name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        id="name"
      />

      <label htmlFor="url">👫 image URL</label>
      <input
        onChange={(e) => setImage(e.target.value)}
        type="text"
        id="url"
        value={image}
      />

      <Button>Add</Button>
    </form>
  );
};

export default FormAddFriend;
