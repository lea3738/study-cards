import React from "react";

interface TagsDropDownInputProps {
    onClick: () => void;
}

export default function TagsDropDownInput({ onClick }: TagsDropDownInputProps) {

    return (
        <input
            className="w-full min-w-0 focus:outline-none focus:ring-1 focus:border-transparent"
            type="text"
            name=""
            id=""
            onClick={onClick}
        />
    );
}