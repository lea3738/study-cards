import { useState } from 'react';

export default function Popup() {
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [phase, setPhase] = useState<'select' | 'preview'>('select');

  const handleSelectCode = async function () {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => window.getSelection()?.toString() || '',
      });

      const selection = results[0].result;

      if (selection && selection.trim()) {
        setSelectedCode(selection);
        setPhase('preview');
      } else {
        alert('No code was selected, select that you want to add on the page');
      }
    } catch (e) {
      console.error('unable to get selection. Error: ', e);
    }
  };

  const handleCreateCard = function () {
    if (selectedCode) {
      const encodedCode = encodeURIComponent(selectedCode);
      const frontendUrl =
        process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
      const url = `${frontendUrl}/cards/new?code=${encodedCode}`;
      chrome.tabs.create({ url });
      window.close();
    }
  };

  const handleBack = () => {
    setPhase('select');
    setSelectedCode('');
  };

  return (
    <div className="flex flex-col justify-center m-4">
      {/* Select Phase */}
      {phase === 'select' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold">Welcome to Study Cards</p>
          <p className="text-sm">Highlight your code and click on Add code</p>
          <button
            type="button"
            className="mt-4 bg-blue-500 text-sm text-white px-4 py-1 w-full rounded hover:bg-blue-600"
            onClick={handleSelectCode}
          >
            Add code
          </button>
        </div>
      )}

      {/* Preview Phase */}
      {phase === 'preview' && (
        <div className="flex flex-col gap-4">
          <p className="font-bold text-sm">Your code:</p>
          <p className="text-xs">{selectedCode}</p>
          <button
            type="button"
            className="mt-4 bg-blue-500 text-sm text-white px-4 py-1 w-full rounded hover:bg-blue-600"
            onClick={handleCreateCard}
          >
            Create a study card
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 w-full rounded text-sm"
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
}
