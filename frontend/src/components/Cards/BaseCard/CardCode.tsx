'use client';


type CardCodeProps = {
  code: string;
};

function CardCode({code}: CardCodeProps) {
  
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-2">Code</h2>
      <pre className="grow bg-gray-100 text-sm p-2 rounded overflow-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CardCode;
