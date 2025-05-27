import { useState } from 'react';

interface TagAreaProps {
  handleAddTagName: (tagName: string) => void;
}

export default function TagArea({ handleAddTagName }: TagAreaProps) {
  const [tagNamesInput, setTagNamesInput] = useState('');

  function handleSubmit() {
    const tagNames = tagNamesInput
      .split('/')
      .map((name) => name.trim())
      .filter((name) => name !== '');

    tagNames.forEach((tagName) => handleAddTagName(tagName));
    setTagNamesInput('');
  }

  return (
    <div>
      <div className="relative">
        <textarea
          id="add-tags"
          value={tagNamesInput}
          onChange={(e) => setTagNamesInput(e.target.value)}
          className="block w-full p-1 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add tags: separate with /"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white absolute end-0 bottom-0 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-1 py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
}
