import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X, Search, HelpCircle } from 'lucide-react';
import { DiscoverySection as DiscoverySectionType, DiscoveryTheme } from '../../types';

interface DiscoverySectionProps {
  discovery: DiscoverySectionType;
  objectives: string[];
  isEditMode: boolean;
  onUpdate: (discovery: DiscoverySectionType) => void;
}

const DiscoverySection: React.FC<DiscoverySectionProps> = ({ discovery, objectives, isEditMode, onUpdate }) => {
  const [tempDiscovery, setTempDiscovery] = useState(discovery);
  const [expandedThemes, setExpandedThemes] = useState<string[]>([]);
  const [editingTheme, setEditingTheme] = useState<string | null>(null);

  const themeCategories = [
    { key: 'currentSituation', title: 'Situation actuelle', icon: '📊', color: 'from-blue-50 to-blue-100' },
    { key: 'history', title: 'Historique', icon: '📚', color: 'from-purple-50 to-purple-100' },
    { key: 'experience', title: 'Expérience', icon: '🎯', color: 'from-green-50 to-green-100' },
    { key: 'project', title: 'Projet', icon: '🚀', color: 'from-orange-50 to-orange-100' },
    { key: 'ambitions', title: 'Ambitions', icon: '⭐', color: 'from-red-50 to-red-100' }
  ];

  const toggleThemeExpansion = (themeId: string) => {
    setExpandedThemes(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const handleAddTheme = (category: keyof DiscoverySectionType) => {
    const newTheme: DiscoveryTheme = {
      id: `${category}-${Date.now()}`,
      name: 'Nouvelle thématique',
      questions: ['Nouvelle question ?']
    };
    
    const updatedDiscovery = {
      ...tempDiscovery,
      [category]: [...tempDiscovery[category], newTheme]
    };
    setTempDiscovery(updatedDiscovery);
  };

  const handleEditTheme = (category: keyof DiscoverySectionType, themeId: string, field: 'name' | 'questions', value: string | string[]) => {
    const updatedDiscovery = {
      ...tempDiscovery,
      [category]: tempDiscovery[category].map(theme => 
        theme.id === themeId ? { ...theme, [field]: value } : theme
      )
    };
    setTempDiscovery(updatedDiscovery);
  };

  const handleAddQuestion = (category: keyof DiscoverySectionType, themeId: string) => {
    const updatedDiscovery = {
      ...tempDiscovery,
      [category]: tempDiscovery[category].map(theme => 
        theme.id === themeId 
          ? { ...theme, questions: [...theme.questions, 'Nouvelle question ?'] }
          : theme
      )
    };
    setTempDiscovery(updatedDiscovery);
  };

  const handleEditQuestion = (category: keyof DiscoverySectionType, themeId: string, questionIndex: number, value: string) => {
    const updatedDiscovery = {
      ...tempDiscovery,
      [category]: tempDiscovery[category].map(theme => 
        theme.id === themeId 
          ? { 
              ...theme, 
              questions: theme.questions.map((q, i) => i === questionIndex ? value : q)
            }
          : theme
      )
    };
    setTempDiscovery(updatedDiscovery);
  };

  const handleSave = () => {
    onUpdate(tempDiscovery);
    setEditingTheme(null);
  };

  const handleCancel = () => {
    setTempDiscovery(discovery);
    setEditingTheme(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Phase de Découverte</h4>
          <p className="text-sm text-gray-600 mt-1">Questionnement structuré par thématiques</p>
        </div>
        {isEditMode && editingTheme && (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={16} />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>

      {/* Objectifs fixes */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Search size={20} className="text-primary-500" />
          <span>Objectifs de la découverte (non personnalisables)</span>
        </h5>
        <ul className="space-y-2">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Thématiques de questions */}
      <div className="space-y-4">
        <h5 className="font-semibold text-gray-800">Questions de découverte spécifiques</h5>
        
        {themeCategories.map((category) => (
          <div key={category.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <h6 className="font-medium text-gray-700 flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <span>{category.title}</span>
              </h6>
              {isEditMode && (
                <button
                  onClick={() => handleAddTheme(category.key as keyof DiscoverySectionType)}
                  className="flex items-center space-x-1 px-2 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                >
                  <Plus size={14} />
                  <span>Thème</span>
                </button>
              )}
            </div>

            <div className="grid gap-3">
              {tempDiscovery[category.key as keyof DiscoverySectionType].map((theme) => (
                <motion.div
                  key={theme.id}
                  layout
                  className={`bg-gradient-to-r ${category.color} rounded-lg border border-gray-200 overflow-hidden`}
                >
                  <div 
                    className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
                    onClick={() => toggleThemeExpansion(theme.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <HelpCircle size={16} className="text-primary-500" />
                        {isEditMode && editingTheme === theme.id ? (
                          <input
                            type="text"
                            value={theme.name}
                            onChange={(e) => handleEditTheme(category.key as keyof DiscoverySectionType, theme.id, 'name', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none"
                          />
                        ) : (
                          <span className="font-medium text-gray-800">{theme.name}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {isEditMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTheme(editingTheme === theme.id ? null : theme.id);
                            }}
                            className="p-1 text-gray-500 hover:text-primary-500 transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                        <span className="text-sm text-gray-500">
                          {theme.questions.length} question{theme.questions.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {expandedThemes.includes(theme.id) && (
                    <div className="px-4 pb-4 space-y-2">
                      {theme.questions.map((question, qIndex) => (
                        <div key={qIndex} className="flex items-start space-x-3">
                          <span className="text-primary-500 font-bold mt-1">•</span>
                          {isEditMode && editingTheme === theme.id ? (
                            <input
                              type="text"
                              value={question}
                              onChange={(e) => handleEditQuestion(category.key as keyof DiscoverySectionType, theme.id, qIndex, e.target.value)}
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            <span className="text-sm text-gray-700">{question}</span>
                          )}
                        </div>
                      ))}
                      {isEditMode && editingTheme === theme.id && (
                        <button
                          onClick={() => handleAddQuestion(category.key as keyof DiscoverySectionType, theme.id)}
                          className="flex items-center space-x-2 px-2 py-1 text-sm text-primary-500 border border-primary-200 rounded hover:bg-primary-50 transition-colors"
                        >
                          <Plus size={14} />
                          <span>Ajouter question</span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverySection;