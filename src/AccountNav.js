import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

export default function AccountNav() {
    const {pathname} = useLocation(); // /account/places
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type){ //change style link
        let classes = 'px-6 py-2 inline-flex gap-2';
        if(type === subpage){
            classes += ' bg-rose rounded-full text-white';
        } else {
            classes += ' bg-gray-200 rounded-full'
        }

        return classes;
    }

    return (
        <nav className="flex justify-center mt-10 gap-8">
            <Link className={linkClasses('profile')} to={'/account'}><FontAwesomeIcon className="my-auto" icon={faUser} />My profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}><FontAwesomeIcon className="my-auto" icon={faList} />My bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}><FontAwesomeIcon className="my-auto" icon={faHotel} />My accommodations</Link>
        </nav>
    );
}