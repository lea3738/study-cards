"use client";

interface CardsResetButtonProps {
    handleReset: () => Promise<void>;
}
export default function CardsResetButton({handleReset}: CardsResetButtonProps) {

    return (
        <button
            onClick={handleReset}
            className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
            Mark all cards as unknown
        </button>
    );
}

