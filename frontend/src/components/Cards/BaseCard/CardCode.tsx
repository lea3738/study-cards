'use client';


type CardCodeProps = {
  code: string;
};

function CardCode({code}: CardCodeProps) {
  
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-lg font-bold mb-2">Code</h2>
      <pre className="bg-gray-100 border rounded text-sm p-2 overflow-x-auto flex-1 min-h-0 grow whitespace-pre-wrap break-words">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CardCode;
