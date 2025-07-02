import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export function UserDetail() {
    const { id } = useParams();
    console.log(id);
    // const user = users[id];
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`https://68366aa5664e72d28e40afee.mockapi.io/users/${id}`)
            .then((data) => data.json())
            .then((userInfo) => setUser(userInfo));
    }, []);
    return (
        <section className="user-detail-container">
            <img className="user-profile-pic" src={user.pic} alt={user.name} />
            <div>
                <h2 className="user-name">{user.name}</h2>
                <p>{user.bio}</p>
            </div>
        </section>
    );
}