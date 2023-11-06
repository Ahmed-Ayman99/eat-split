import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const UsersProvider = ({ children }) => {
  const initialState = {
    users: [
      {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
      },
      {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
      },
      {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add-user":
        return { ...state, users: [...state.users, action.payload] };

      case "add-bill":
        return {
          ...state,
          users: state.users.map((user) => {
            if (user.id === action.payload.id) {
              user.balance = action.payload.balance;
            }
            return user;
          }),
        };

      default:
        return state;
    }
  };

  const [{ users }, dispatch] = useReducer(reducer, initialState);

  const contextValues = {
    users,
    dispatch,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
};

export { useUsers, UsersProvider };

export default UserContext;
