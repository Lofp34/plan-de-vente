import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X, Shield, AlertCircle } from 'lucide-react';
import { Objection } from '../../types';

interface ObjectionSectionProps {
  objections: Objection[];
  method: string[];
  isEditMode: boolean;
  onUpdate: (objections: Objection[]) => void;
}

const ObjectionSection: React.FC<ObjectionSectionProps> = ({ objections, method, isEditMode, onUpdate }) => {
  const [tempObjections, setTempObjections] = useState(objections);
  const [editingObjection, setEditingObjection] = useState<string | null>(null);
  const [expandedObjections, setExpandedObjections] = useState<string[]>([]);

  const handleAddObjection = () => {
    const newObjection: Objection = {
      id: `obj-${Date.now()}`,
      objection: 'Nouvelle objection fréquente',
      origin: 'Origine de l\'objection',
      questionsToAsk: ['Question à poser pour clarifier'],
      responseArguments: ['Argument de réponse']
    };
    setTempObjections([...tempObjections, newObjection]);
  };

  const handleEditObjection = (objectionId: string, field: keyof Objection, value: string | string[]) => {
    setTempObjections(tempObjections.map(obj => 
      obj.id === objectionId ? { ...obj, [field]: value } : obj
    ));
  };

  const handleAddQuestion = (objectionId: string) => {
    setTempObjections(tempObjections.map(obj => 
      obj.id === objectionId 
        ? { ...obj, questionsToAsk: [...obj.questionsToAsk, 'Nouvelle question'] }
        : obj
    ));
  };

  const handleAddResponseArgument = (objectionId: string) => {
    setTempObjections(tempObjections.map(obj => 
      obj.id === objectionId 
        ? { ...obj, responseArguments: [...obj.responseArguments, 'Nouvel argument'] }
        : obj
    ));
  };

  const handleEditQuestion = (objectionId: string, questionIndex: number, value: string) => {
    setTempObjections(tempObjections.map(obj => 
      obj.id === objectionId 
        ? { 
            ...obj, 
            questionsToAsk: obj.questionsToAsk.map((q, i) => i === questionIndex ? value : q)
          }
        : obj
    ));
  };

  const handleEditResponseArgument = (objectionId: string, argumentIndex: number, value: string) => {
    setTempObjections(tempObjections.map(obj => 
      obj.id === objectionId 
        ? { 
            ...obj, 
            responseArguments: obj.responseArguments.map((a, i) => i === argumentIndex ? value : a)
          }
        : obj
    ));
  };

  const handleDeleteObjection = (objectionId: string) => {
    setTempObjections(tempObjections.filter(obj => obj.id !== objectionId));
  };

  const toggleObjectionExpansion = (objectionId: string) => {
    setExpandedObjections(prev => 
      prev.includes(objectionId) 
        ? prev.filter(id => id !== objectionId)
        : [...prev, objectionId]
    );
  };

  const handleSave = () => {
    onUpdate(tempObjections);
    setEditingObjection(null);
  };

  const handleCancel = () => {
    setTempObjections(objections);
    setEditingObjection(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Traitement des Objections</h4>
          <p className="text-sm text-gray-600 mt-1">Méthode structurée et objections personnalisables</p>
        </div>
        {isEditMode && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddObjection}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus size={16} />
              <span>Ajouter Objection</span>
            </button>
            {editingObjection && (
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

      {/* Méthode (non personnalisable) */}
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Shield size={20} className="text-red-500" />
          <span>Méthode de traitement (non personnalisable)</span>
        </h5>
        <ol className="space-y-2">
          {method.map((step, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Objections fréquentes personnalisables */}
      <div className="space-y-4">
        <h5 className="font-semibold text-gray-800">Objections fréquentes (personnalisables)</h5>
        
        {tempObjections.map((objection, index) => (
          <motion.div
            key={objection.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden card-shadow"
          >
            <div 
              className="p-4 cursor-pointer bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300"
              onClick={() => toggleObjectionExpansion(objection.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="text-orange-500" size={20} />
                  <div className="flex-1">
                    {isEditMode && editingObjection === objection.id ? (
                      <input
                        type="text"
                        value={objection.objection}
                        onChange={(e) => handleEditObjection(objection.id, 'objection', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none w-full"
                      />
                    ) : (
                      <h6 className="font-semibold text-gray-800">{objection.objection}</h6>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingObjection(editingObjection === objection.id ? null : objection.id);
                      }}
                      className="p-1 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteObjection(objection.id);
                      }}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {expandedObjections.includes(objection.id) && (
              <div className="p-4 border-t border-gray-100 space-y-4">
                {/* Origine */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origine de l'objection
                  </label>
                  {isEditMode && editingObjection === objection.id ? (
                    <textarea
                      value={objection.origin}
                      onChange={(e) => handleEditObjection(objection.id, 'origin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent h-16 resize-none"
                    />
                  ) : (
                    <p className="text-gray-700">{objection.origin}</p>
                  )}
                </div>

                {/* Questions à poser */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-blue-800">
                      Questions à poser
                    </label>
                    {isEditMode && editingObjection === objection.id && (
                      <button
                        onClick={() => handleAddQuestion(objection.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {objection.questionsToAsk.map((question, qIndex) => (
                      <div key={qIndex} className="flex items-start space-x-2">
                        <span className="text-blue-500 font-bold mt-1">•</span>
                        {isEditMode && editingObjection === objection.id ? (
                          <input
                            type="text"
                            value={question}
                            onChange={(e) => handleEditQuestion(objection.id, qIndex, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{question}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arguments de réponse */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-green-800">
                      Arguments de réponse
                    </label>
                    {isEditMode && editingObjection === objection.id && (
                      <button
                        onClick={() => handleAddResponseArgument(objection.id)}
                        className="text-sm text-green-600 hover:text-green-800 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {objection.responseArguments.map((argument, aIndex) => (
                      <div key={aIndex} className="flex items-start space-x-2">
                        <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {aIndex + 1}
                        </span>
                        {isEditMode && editingObjection === objection.id ? (
                          <textarea
                            value={argument}
                            onChange={(e) => handleEditResponseArgument(objection.id, aIndex, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-green-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent h-16 resize-none"
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{argument}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {tempObjections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Aucune objection définie. Activez le mode édition pour commencer.</p>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 text-xl">🤖</div>
          <div>
            <p className="text-sm text-yellow-800">
              <span className="font-medium">IA Personnalisée :</span> Cette section peut être automatiquement remplie par un modèle de langage qui s'inspire de vos enregistrements d'appels pour identifier les objections récurrentes et proposer des réponses adaptées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectionSection;