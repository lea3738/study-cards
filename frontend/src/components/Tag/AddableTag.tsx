import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AddableProps = {
  tagName: string;
  handleAddTagName: (tagName: string) => void;
  handleDeleteTag: (tagName: string) => void;
};

function AddableTag({
  tagName,
  handleAddTagName,
  handleDeleteTag,
}: AddableProps) {
  return (
    <div className="w-64 flex justify-between p-1">
      <button
        type="button"
        className="text-xs bg-gray-300 text-gray-800 rounded-xl mx-1 px-1 whitespace-nowrap inline-block"
        onClick={() => {
          handleAddTagName(tagName);
        }}
      >
        {tagName}
      </button>
      <FontAwesomeIcon
        className="text-sm text-gray-400"
        icon={faTrash}
        onClick={() => handleDeleteTag(tagName)}
      />
    </div>
  );
}

export default AddableTag;
