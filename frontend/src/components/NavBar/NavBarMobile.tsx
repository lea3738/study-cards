import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavBarMobile() {
    return (
        <div className="w-64 bg-white border rounded-md shadow-sm flex items-center py-2 px-4 my-2">
            <Link href="/cards" className="text-blue-500 text-base">
                <FontAwesomeIcon icon={faHouse} />
            </Link>
        </div>
    );
} 