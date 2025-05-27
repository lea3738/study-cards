import React from "react";

interface TagsDropDownButtonProps {
    onClick: () => void;
}

export default function TagsDropDownButton({ onClick }: TagsDropDownButtonProps) {

    return (
        <button 
            type="button"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="bg-blue-500 text-white font-bold text-xl w-6 h-6 rounded-full hover:bg-blue-600 flex items-center justify-center"
        >
            <span>+</span>
        </button>
    );
}