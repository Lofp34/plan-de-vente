import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Edit3, Settings } from 'lucide-react';
import { SalesStage } from '../types';
import PersonaSection from './sections/PersonaSection';
import ProspectionSection from './sections/ProspectionSection';
import PitchSection from './sections/PitchSection';
import DiscoverySection from './sections/DiscoverySection';
import ArgumentationSection from './sections/ArgumentationSection';
import ObjectionSection from './sections/ObjectionSection';

interface SalesStageCardProps {
  stage: SalesStage;
  onStageUpdate: (stageId: string, updatedContent: any) => void;
}

const SalesStageCard: React.FC<SalesStageCardProps> = ({ stage, onStageUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditToggle = () => {
    if (!isEditMode && stage.isPersonalizable) {
      setRequiresPassword(true);
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    // Simple password check - in real app, this would be more secure
    if (password === 'admin123') {
      setIsEditMode(true);
      setRequiresPassword(false);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const renderStageContent = () => {
    switch (stage.id) {
      case 'target-audience':
        return (
          <PersonaSection 
            personas={stage.content.personas} 
            isEditMode={isEditMode}
            onUpdate={(personas) => onStageUpdate(stage.id, { personas })}
          />
        );
      case 'prospection':
        return (
          <ProspectionSection 
            channels={stage.content.channels} 
            isEditMode={isEditMode}
            onUpdate={(channels) => onStageUpdate(stage.id, { channels })}
          />
        );
      case 'contact':
        return (
          <PitchSection 
            pitch={stage.content.pitch} 
            isEditMode={isEditMode}
            onUpdate={(pitch) => onStageUpdate(stage.id, { pitch })}
          />
        );
      case 'discovery':
        return (
          <DiscoverySection 
            discovery={stage.content.discovery}
            objectives={stage.content.objectives}
            isEditMode={isEditMode}
            onUpdate={(discovery) => onStageUpdate(stage.id, { ...stage.content, discovery })}
          />
        );
      case 'argumentation':
        return (
          <ArgumentationSection 
            argumentsList={stage.content.arguments}
            goldRules={stage.content.goldRules}
            isEditMode={isEditMode}
            onUpdate={(argumentsList) => onStageUpdate(stage.id, { ...stage.content, arguments: argumentsList })}
          />
        );
      case 'objections':
        return (
          <ObjectionSection 
            objections={stage.content.objections}
            method={stage.content.method}
            isEditMode={isEditMode}
            onUpdate={(objections) => onStageUpdate(stage.id, { ...stage.content, objections })}
          />
        );
      default:
        return (
          <div className="space-y-4">
            {stage.content.principles && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Principes fondamentaux</h4>
                <ul className="space-y-2">
                  {stage.content.principles.map((principle: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary-500 font-bold">•</span>
                      <span className="text-gray-700">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {stage.content.biais && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Biais cognitifs à maîtriser</h4>
                <div className="grid grid-cols-2 gap-3">
                  {stage.content.biais.map((biais: string, index: number) => (
                    <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <span className="text-amber-800 font-medium">{biais}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {stage.content.goldRules && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Règles d'or</h4>
                <ol className="space-y-2">
                  {stage.content.goldRules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl card-shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-6 cursor-pointer bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-150 transition-all duration-300"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{stage.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{stage.title}</h3>
              <p className="text-gray-600 mt-1">{stage.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {stage.isPersonalizable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditToggle();
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isEditMode 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isEditMode ? 'Mode édition activé' : 'Activer le mode édition'}
              >
                {isEditMode ? <Settings size={20} /> : <Edit3 size={20} />}
              </button>
            )}
            {!stage.isPersonalizable && (
              <div className="p-2 rounded-lg bg-gray-100 text-gray-400" title="Section non personnalisable">
                <Lock size={20} />
              </div>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2"
            >
              <ChevronDown size={24} className="text-gray-600" />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-gray-100">
              {renderStageContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      {requiresPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Mot de passe requis</h3>
            <p className="text-gray-600 mb-4">
              Veuillez entrer le mot de passe pour modifier cette section.
            </p>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit((e.target as HTMLInputElement).value);
                }
              }}
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setRequiresPassword(false)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="password"]') as HTMLInputElement;
                  handlePasswordSubmit(input.value);
                }}
                className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Valider
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SalesStageCard;