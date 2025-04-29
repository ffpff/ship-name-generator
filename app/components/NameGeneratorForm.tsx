'use client';

import { useState } from 'react';
import { SHIP_TYPES } from '../constants/shipTypes';

interface GeneratedName {
  name: string;
  meaning: string;
}

// Example names for inspiration
const EXAMPLE_NAMES: GeneratedName[] = [
  {
    name: "Joralis",
    meaning: "A harmonious blend of John and Sarah, evoking the serenity of ocean waves and coastal living"
  },
  {
    name: "Sarohnia",
    meaning: "Merging Sarah and John into a melodic houseboat name that embodies tidal rhythms and aquatic tranquility"
  },
  {
    name: "Jonarith",
    meaning: "Combining John and Sarah with 'maritime' to create a name that suggests gentle currents and floating harmony"
  },
  {
    name: "Salijon",
    meaning: "Fusing Sarah and John into a flowing name that mirrors the peaceful drift of a houseboat on calm waters"
  },
  {
    name: "Harborohn",
    meaning: "Blending 'harbor' with John and Sarah, symbolizing safe anchorage and coastal serenity"
  }
];

// Ship name style options
const STYLE_OPTIONS = [
  { id: 'romantic', label: 'Romantic', description: 'Perfect for couples celebrating their love' },
  { id: 'adventure', label: 'Adventure', description: 'For the thrill-seekers and explorers' },
  { id: 'luxury', label: 'Luxury', description: 'Elegant and sophisticated vessel names' },
  { id: 'nautical', label: 'Nautical', description: 'Traditional maritime-themed names' },
  { id: 'humorous', label: 'Humorous', description: 'Fun and witty names with a touch of humor' },
  { id: 'mythology', label: 'Mythology', description: 'Names inspired by gods and legendary figures' },
  { id: 'nature', label: 'Nature', description: 'Inspired by the beauty of the natural world' },
  { id: 'vintage', label: 'Vintage', description: 'Classic and timeless vessel names' },
  { id: 'coastal', label: 'Coastal', description: 'Celebrating coastal towns and shores' },
  { id: 'patriotic', label: 'Patriotic', description: 'Proud American-themed vessel names' },
];

interface Props {
  lang: string;
  messages: any;
}

export default function NameGeneratorForm({ lang, messages }: Props) {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('romantic');
  const [selectedShipType, setSelectedShipType] = useState(SHIP_TYPES[0].value);
  const [customShipType, setCustomShipType] = useState('');
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [selectedNameIndex, setSelectedNameIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const loadingMessages = [
    "Setting sail...",
    "Finding the perfect names...",
    "Drawing inspiration from the ocean...",
    "Consulting with Poseidon...",
    "Charting the course..."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedNames([]);
    setSelectedNameIndex(-1);
    setShowExamples(false);
    
    // Start loading message cycle
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 2000);
    
    try {
      const response = await fetch('/api/generate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          secondName,
          style: selectedStyle,
          shipType: selectedShipType === 'custom' ? customShipType : selectedShipType,
          language: lang
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(messages.home.error);
      }

      setGeneratedNames(data.names);
      setSelectedNameIndex(0); // Select the first name by default
    } catch (err) {
      setError(err instanceof Error ? err.message : messages.home.error);
      console.error('Error:', err);
    } finally {
      clearInterval(messageInterval);
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleCopyToClipboard = (name: GeneratedName) => {
    navigator.clipboard.writeText(`${name.name} - ${name.meaning}`);
  };

  const renderNamesList = (names: GeneratedName[], isExample = false) => (
    <div className="space-y-6">
      {names.map((name, index) => (
        <div
          key={index}
          className={`p-6 border-2 rounded-lg transition-all duration-200 ${
            !isExample && index === selectedNameIndex
              ? 'border-ocean-blue bg-light-blue bg-opacity-10 scale-105'
              : 'border-gray-200 hover:border-ocean-blue hover:bg-light-blue hover:bg-opacity-5'
          }`}
          onClick={() => !isExample && setSelectedNameIndex(index)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="text-2xl font-bold text-deep-blue mb-2">{name.name}</p>
              <p className="text-md text-gray-600 italic">{name.meaning}</p>
            </div>
            <button
              type="button"
              className="ml-4 p-2 text-gray-500 hover:text-ocean-blue"
              onClick={() => handleCopyToClipboard(name)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {messages.home.firstNameLabel}
            </label>
            <input
              id="firstName"
              type="text"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={messages.home.firstNamePlaceholder}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-1">
              {messages.home.secondNameLabel}
            </label>
            <input
              id="secondName"
              type="text"
              className="input-field"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              placeholder={messages.home.secondNamePlaceholder}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="shipType" className="block text-sm font-medium text-gray-700 mb-1">
            {messages.home.shipTypeLabel}
          </label>
          <div className="space-y-3">
            <select
              id="shipType"
              className="input-field w-full"
              value={selectedShipType}
              onChange={(e) => setSelectedShipType(e.target.value)}
              disabled={isLoading}
            >
              <option value="">{messages.home.shipTypePlaceholder}</option>
              {SHIP_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
            
            {selectedShipType === 'custom' && (
              <div className="mt-3">
                <label htmlFor="customShipType" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Vessel Type
                </label>
                <input
                  id="customShipType"
                  type="text"
                  className="input-field"
                  value={customShipType}
                  onChange={(e) => setCustomShipType(e.target.value)}
                  placeholder="Enter your vessel type"
                  required={selectedShipType === 'custom'}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {messages.home.styleLabel}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STYLE_OPTIONS.map((style) => (
              <div 
                key={style.id}
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  selectedStyle === style.id 
                    ? 'border-ocean-blue bg-light-blue bg-opacity-10' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isLoading && setSelectedStyle(style.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={style.id}
                    name="style"
                    value={style.id}
                    checked={selectedStyle === style.id}
                    onChange={() => !isLoading && setSelectedStyle(style.id)}
                    className="h-4 w-4 text-ocean-blue"
                    disabled={isLoading}
                  />
                  <label htmlFor={style.id} className="ml-3 block text-sm font-medium text-gray-700">
                    {style.label}
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 ml-7">{style.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`btn-primary w-full md:w-auto md:px-8 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || !firstName || !secondName || (selectedShipType === 'custom' && !customShipType)}
          >
            {isLoading ? loadingMessage || messages.home.loading : messages.home.generateButton}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!generatedNames.length && !error && !isLoading && (
        <div className="mt-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{messages.home.exampleTitle}</h3>
            <p className="text-sm text-gray-500">{messages.home.exampleDescription}</p>
          </div>
          {renderNamesList(EXAMPLE_NAMES, true)}
        </div>
      )}

      {generatedNames.length > 0 && !error && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">{messages.home.resultTitle}</h3>
          {renderNamesList(generatedNames)}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="btn-secondary px-6 py-2"
              onClick={handleSubmit}
            >
              {messages.home.generateMoreButton}
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            {messages.home.resultDescription}
          </p>
        </div>
      )}
    </div>
  );
} 