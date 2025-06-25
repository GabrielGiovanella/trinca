import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface ExplanationDropdownProps {
  explanation: string;
  questionNumber: number;
}

export const ExplanationDropdown: React.FC<ExplanationDropdownProps> = ({
  explanation,
  questionNumber
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-blue-100 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-full p-1.5">
            <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          <span className="font-semibold text-blue-800 text-sm md:text-base">
            💡 Explicação
          </span>
        </div>
        <div className="flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          )}
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="border-t border-blue-200 bg-blue-50/50">
          <div className="p-3 md:p-4">
            <p className="text-blue-700 text-xs md:text-sm leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};