'use client';

import { useState, useRef, useEffect } from 'react';
import TagsDropDownButton from './TagsDropDownButton';
import TagsDropDownContent from './TagsDropDownContent';

interface TagsDropDownProps {
  tagNames: string[];
  handleAddTagName: (tagName: string) => void;
}

export default function TagsDropDown({
  tagNames,
  handleAddTagName,
}: TagsDropDownProps) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    <div className="relative inline-block text-left z-100" ref={dropdownRef}>
      <TagsDropDownButton onClick={toggleMenu} />
      {isOpen && (
        <TagsDropDownContent tagNames={tagNames} handleAddTagName={handleAddTagName} />
      )}
    </div>
  );
}
