import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane,faSearch,faBars,faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header(){
    const {user} = useContext(UserContext);

    return (
    <div>
      <header className="flex justify-between">
        <a href="/" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPaperPlane} flip size="2xl" />
          <span className="text-2xl font-bold">airbnb</span>
        </a>
        <div className="flex gap-4 border-2 border-gray-300 rounded-full shadow-lg hover:shadow-gray-300 py-2 px-4">
          <div>Anywhere</div>
          <div className="border-l-2"></div>
          <div>Any week</div>
          <div className="border-l-2"></div>
          <div>Add guests</div>
          <button className="bg-rose rounded-full px-2 text-white "><FontAwesomeIcon icon={faSearch} className="w-4 h-4" /></button>
        </div>
        <Link to={user ? '/account':'/login'} className="flex gap-2 pl-3 pr-2 py-2 border-2 border-gray-300 rounded-full shadow-lg hover:shadow-gray-300 ">
          <button>
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <button>
            <FontAwesomeIcon icon={faUser} className="flex items-center bg-gray-500 text-white rounded-full p-1"/>
          </button>
          {user ? <div className="">{user.name}</div> : null}
        </Link>
      </header>
    </div>
    );
}