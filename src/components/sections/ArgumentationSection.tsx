import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X, Lightbulb, Star } from 'lucide-react';
import { Argument } from '../../types';

interface ArgumentationSectionProps {
  argumentsList: Argument[];
  goldRules: string[];
  isEditMode: boolean;
  onUpdate: (argumentsList: Argument[]) => void;
}

const ArgumentationSection: React.FC<ArgumentationSectionProps> = ({ argumentsList, goldRules, isEditMode, onUpdate }) => {
  const [tempArguments, setTempArguments] = useState(argumentsList);
  const [editingArgument, setEditingArgument] = useState<string | null>(null);

  const handleAddArgument = () => {
    const newArgument: Argument = {
      id: `arg-${Date.now()}`,
      benefit: 'Bénéfice client à personnaliser',
      advantage: 'Avantage à personnaliser', 
      characteristic: 'Caractéristique à personnaliser'
    };
    setTempArguments([...tempArguments, newArgument]);
  };

  const handleEditArgument = (argumentId: string, field: keyof Argument, value: string) => {
    setTempArguments(tempArguments.map(arg => 
      arg.id === argumentId ? { ...arg, [field]: value } : arg
    ));
  };

  const handleDeleteArgument = (argumentId: string) => {
    setTempArguments(tempArguments.filter(arg => arg.id !== argumentId));
  };

  const handleSave = () => {
    onUpdate(tempArguments);
    setEditingArgument(null);
  };

  const handleCancel = () => {
    setTempArguments(argumentsList);
    setEditingArgument(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Argumentation</h4>
          <p className="text-sm text-gray-600 mt-1">Structure BAC et arguments spécifiques personnalisables</p>
        </div>
        {isEditMode && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddArgument}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus size={16} />
              <span>Ajouter Argument</span>
            </button>
            {editingArgument && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>

      {/* Règles d'or (non personnalisables) */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Star size={20} className="text-amber-500" />
          <span>Règles d'or de l'argumentation (non personnalisables)</span>
        </h5>
        <ol className="space-y-2">
          {goldRules.map((rule, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Structure d'exemple BAC */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Lightbulb size={20} className="text-blue-500" />
          <span>Structure d'argumentation BAC</span>
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h6 className="font-medium text-blue-800 mb-2">B - Bénéfice</h6>
            <p className="text-sm text-gray-600">Ce que le client obtient, ressent ou évite</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h6 className="font-medium text-blue-800 mb-2">A - Avantage</h6>
            <p className="text-sm text-gray-600">Ce qui vous différencie de la concurrence</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h6 className="font-medium text-blue-800 mb-2">C - Caractéristique</h6>
            <p className="text-sm text-gray-600">Faits, données, fonctionnalités techniques</p>
          </div>
        </div>
      </div>

      {/* Arguments spécifiques personnalisables */}
      <div className="space-y-4">
        <h5 className="font-semibold text-gray-800">Vos arguments spécifiques (personnalisables)</h5>
        
        {tempArguments.map((argument, index) => (
          <motion.div
            key={argument.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden card-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h6 className="font-medium text-gray-800 flex items-center space-x-2">
                  <span className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>Argument {index + 1}</span>
                </h6>
                {isEditMode && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingArgument(editingArgument === argument.id ? null : argument.id)}
                      className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                      title="Modifier cet argument"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteArgument(argument.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Supprimer cet argument"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Bénéfice */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Bénéfice Client
                  </label>
                  {isEditMode && editingArgument === argument.id ? (
                    <textarea
                      value={argument.benefit}
                      onChange={(e) => handleEditArgument(argument.id, 'benefit', e.target.value)}
                      className="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none"
                      placeholder="Quel bénéfice concret le client obtient-il ?"
                    />
                  ) : (
                    <p className="text-gray-700">{argument.benefit}</p>
                  )}
                </div>

                {/* Avantage */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    Avantage Concurrentiel
                  </label>
                  {isEditMode && editingArgument === argument.id ? (
                    <textarea
                      value={argument.advantage}
                      onChange={(e) => handleEditArgument(argument.id, 'advantage', e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                      placeholder="En quoi êtes-vous différent de la concurrence ?"
                    />
                  ) : (
                    <p className="text-gray-700">{argument.advantage}</p>
                  )}
                </div>

                {/* Caractéristique */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <label className="block text-sm font-medium text-purple-800 mb-2">
                    Caractéristique Technique
                  </label>
                  {isEditMode && editingArgument === argument.id ? (
                    <textarea
                      value={argument.characteristic}
                      onChange={(e) => handleEditArgument(argument.id, 'characteristic', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
                      placeholder="Quelles sont les caractéristiques techniques qui permettent cet avantage ?"
                    />
                  ) : (
                    <p className="text-gray-700">{argument.characteristic}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {tempArguments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Aucun argument défini. Activez le mode édition pour commencer.</p>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 text-xl">🤖</div>
          <div>
            <p className="text-sm text-yellow-800">
              <span className="font-medium">IA Personnalisée :</span> Ces arguments peuvent être automatiquement générés et personnalisés par un modèle de langage basé sur vos enregistrements d'appels et votre secteur d'activité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgumentationSection;