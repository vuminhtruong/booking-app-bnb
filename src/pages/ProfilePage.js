import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function Logout() {
        await axios.post("http://localhost:4000/logout");
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }



    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center mt-10">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={Logout} className="px-8 bg-rose mt-4 py-2 text-white rounded-full">Logout</button>
                </div>
            )
            }
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}