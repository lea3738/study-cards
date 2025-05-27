type MiniTagProps = {
    tag: string;
}

function MiniTag({ tag }: MiniTagProps) {
    return (
        <span className="text-xs bg-gray-300 text-gray-800 rounded-xl mx-1 px-1 whitespace-nowrap inline-block">{ tag }</span>
    );
}

export default MiniTag;