
type AddableProps = {
  tagName: string;
  handleAddTagName: (tagName: string) => void;
};

function AddableTag({ tagName, handleAddTagName }: AddableProps) {
  
  return (
    <button
      type="button"
      className="text-xs bg-gray-300 text-gray-800 rounded-xl mx-1 px-1 whitespace-nowrap inline-block"
      onClick={() => {
        handleAddTagName(tagName);
      }}
    >
      {tagName}
    </button>
  );
}

export default AddableTag;
