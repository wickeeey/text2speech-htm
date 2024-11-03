import React, { useState } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MeowSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const convertToMeow = (text) => {
    return text.split(/\s+/).map(() => 'meow').join(' ');
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(convertToMeow(text));
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const previewMeow = () => {
    if (text.trim() === '') return 'Your meows will appear here...';
    return convertToMeow(text);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-6 h-6" />
          Meow Speech Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 p-3 border rounded-md"
          />
          
          <div className="flex gap-2">
            <button
              onClick={speaking ? stopSpeaking : speak}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                speaking 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {speaking ? (
                <>
                  <Square className="w-4 h-4" /> Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Speak
                </>
              )}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Preview:</h3>
            <p className="text-gray-700">{previewMeow()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeowSpeech;