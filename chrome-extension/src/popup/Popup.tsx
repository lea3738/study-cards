import { useState } from 'react';

export default function Popup() {
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [phase, setPhase] = useState<'select' | 'preview'>('select');

  const handleSelectCode = async function() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => window.getSelection()?.toString() || ''
      });
    
        const selection = results[0].result;

        if (selection && selection.trim()) {
            setSelectedCode(selection);
            setPhase('preview');
        } else {
        alert('No code was selected, select that you want to add on the page');
        }
    }    

    const handleCreateCard = function() {
        if (selectedCode) {
        const encodedCode = encodeURIComponent(selectedCode);
        const frontendUrl = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
        const url = `${frontendUrl}/cards/new?code=${encodedCode}`;
        chrome.tabs.create({ url });
        window.close();
        }
    }

    const handleBack = () => {
        setPhase('select');
        setSelectedCode('');
    };



  return (
    <div>
        {/* Select Phase */}
        {phase === 'select' &&(
            <div>
              <p>Highlight your code</p>
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
            {phase === 'preview' &&(
                <div>
                <p>Your code</p>
                <p>{selectedCode}</p>
                <button
                    type="button"
                    className="mt-4 bg-blue-500 text-sm text-white px-4 py-1 w-full rounded hover:bg-blue-600"
                    onClick={handleCreateCard}
                >
                    Create study card
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    Go back
              </button>
                </div>
            )}
        </div>
    )
}