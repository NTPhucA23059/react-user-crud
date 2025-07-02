import { User } from "./User";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = () => {
        fetch("https://68366aa5664e72d28e40afee.mockapi.io/users")
            .then((data) => data.json())
            .then((userList) => setUsers(userList));
    };
    useEffect(() => getUsers(), []);
    const deleteUser = (id) => {
        fetch(`https://68366aa5664e72d28e40afee.mockapi.io/users/${id}`, {
            method: "DELETE",
        })
            .then((data) => data.json())
            .then(() => getUsers());
    };
    return (
        <div className="user-list-container">
            {users.map((usr, index) => (
                <User
                    name={usr.name}
                    pic={usr.pic}
                    id={usr.id}
                    key={index}
                    deleteButton={
                        <button onClick={() => deleteUser(usr.id)}>Delete</button>
                    }
                    editButton={
                        <button onClick={() => navigate(`/users/edit/${usr.id}`)}>
                            Edit
                        </button>
                    }
                />
            ))}
        </div>
    );
}