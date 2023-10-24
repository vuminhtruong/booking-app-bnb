import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function LayOut() {
    return(
        <div className="p-4 flex flex-col min-h-screen">
            <Header />
            <Outlet /> {/* Display the content of the child Routes */}
        </div>
    );
}