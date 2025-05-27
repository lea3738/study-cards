'use client';

import { useState, useRef, useEffect } from 'react';
import DropDownButton from "./DropDownButton";
import DropDownContent from "./DropDownContent";

interface DropDownProps{
    handleDelete: () => void;
    cardId: string;
}

export default function DropDown({handleDelete, cardId}: DropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fermer le menu quand on clique à l'extérieur
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <DropDownButton onClick={toggleMenu} />
            {isOpen && <DropDownContent handleDelete={handleDelete} cardId={cardId}/>}
        </div>    
    );
}