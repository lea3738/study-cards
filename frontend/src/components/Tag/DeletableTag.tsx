
type DeletableProps = {
  tagName: string;
  handleDeleteTagName: (tagName: string) => void;
};

function DeletableTag({ tagName, handleDeleteTagName }: DeletableProps) {
    const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    handleDeleteTagName(tagName); 
  };


  return (
    <button className="text-xs bg-gray-300 text-gray-800 rounded-xl mx-1 px-1 whitespace-nowrap inline-block" onClick={handleClick}>
      {`x ${tagName}`}
    </button>
  );
}

export default DeletableTag;
