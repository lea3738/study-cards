'use client';

type CardDeckDismissButtonProps = {
  handleDismiss: (data: boolean) => void;
};

function CardDeckDismissButton({ handleDismiss }: CardDeckDismissButtonProps) {

  return (
      <div className="flex justify-between gap-4 mt-2">
        <button
          onClick={() => handleDismiss(true)}
          className="bg-green-300 px-4 py-1 rounded hover:bg-green-500 h-12"
        >
          🤓 I know it!
        </button>

        <button
          onClick={() => handleDismiss(false)}
          className="bg-red-300 px-4 py-1 rounded hover:bg-red-500 h-12"
        >
          Show again
        </button>
      </div>  
  );
}

export default CardDeckDismissButton;
