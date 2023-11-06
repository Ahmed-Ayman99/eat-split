import styles from "./App.module.css";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import { useState } from "react";

import { useUsers } from "./context/UsersContext";

import FormSplit from "./components/FormSplit";
import FriendList from "./components/FriendList";
import Friend from "./components/Friend";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const showselectedUser = Boolean(selectedUser);
  const { users } = useUsers();

  console.log(selectedUser);
  const handelSelectedUser = (friend) => {
    setSelectedUser((prev) => (prev?.id === friend.id ? null : friend));
  };

  const handelShowAddFriend = () => {
    setShowAddFriend((prev) => !prev);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList>
          {users?.map((friend) => (
            <Friend
              onClick={handelSelectedUser}
              isSelected={Boolean(selectedUser?.id === friend.id)}
              key={friend.id}
              friend={friend}
            />
          ))}
        </FriendList>

        {showAddFriend && (
          <FormAddFriend
            setShowAddFriend={setShowAddFriend}
            selectedUser={selectedUser}
          />
        )}

        <Button onClick={handelShowAddFriend} className={styles.addFriendBtn}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {showselectedUser && (
        <FormSplit
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          key={selectedUser.id}
        />
      )}
    </div>
  );
}

export default App;
