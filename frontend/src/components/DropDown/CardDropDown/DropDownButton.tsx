import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface DropDownButtonProps {
    onClick: () => void;
}

export default function DropDownButton({ onClick }: DropDownButtonProps) {
    return (
        <button 
            onClick={onClick}
            className="p-1 hover:bg-gray-100 rounded"
        >
            <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
    );
}