import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X, User } from 'lucide-react';
import { PersonaTemplate } from '../../types';

interface PersonaSectionProps {
  personas: PersonaTemplate[];
  isEditMode: boolean;
  onUpdate: (personas: PersonaTemplate[]) => void;
}

const PersonaSection: React.FC<PersonaSectionProps> = ({ personas, isEditMode, onUpdate }) => {
  const [editingPersona, setEditingPersona] = useState<string | null>(null);
  const [tempPersonas, setTempPersonas] = useState(personas);

  const handleAddPersona = () => {
    const newPersona: PersonaTemplate = {
      id: `persona${tempPersonas.length + 1}`,
      name: `<persona_${tempPersonas.length + 1}>`,
      description: '<description_du_personne>Description du personnage</description_du_personne>'
    };
    setTempPersonas([...tempPersonas, newPersona]);
  };

  const handleEditPersona = (personaId: string, field: 'name' | 'description', value: string) => {
    setTempPersonas(tempPersonas.map(persona => 
      persona.id === personaId ? { ...persona, [field]: value } : persona
    ));
  };

  const handleSavePersonas = () => {
    onUpdate(tempPersonas);
    setEditingPersona(null);
  };

  const handleCancelEdit = () => {
    setTempPersonas(personas);
    setEditingPersona(null);
  };

  const parseXMLContent = (xmlString: string) => {
    const match = xmlString.match(/<description_du_personne>(.*?)<\/description_du_personne>/);
    return match ? match[1] : xmlString;
  };

  const formatXMLContent = (content: string) => {
    return `<description_du_personne>${content}</description_du_personne>`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800">Personas Cibles</h4>
        {isEditMode && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddPersona}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus size={16} />
              <span>Ajouter Persona</span>
            </button>
            {editingPersona && (
              <>
                <button
                  onClick={handleSavePersonas}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save size={16} />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={handleCancelEdit}
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

      <div className="grid gap-4">
        {tempPersonas.map((persona, index) => (
          <motion.div
            key={persona.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-primary-500 text-white rounded-full p-3">
                <User size={24} />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du Persona (Format XML)
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={persona.name}
                      onChange={(e) => handleEditPersona(persona.id, 'name', e.target.value)}
                      onFocus={() => setEditingPersona(persona.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="<persona_1>"
                    />
                  ) : (
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 font-mono text-sm">
                      {persona.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Format XML)
                  </label>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <textarea
                        value={parseXMLContent(persona.description)}
                        onChange={(e) => handleEditPersona(persona.id, 'description', formatXMLContent(e.target.value))}
                        onFocus={() => setEditingPersona(persona.id)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24"
                        placeholder="Description du personnage..."
                      />
                      <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                        Format: &lt;description_du_personne&gt;{parseXMLContent(persona.description)}&lt;/description_du_personne&gt;
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                        {parseXMLContent(persona.description)}
                      </div>
                      <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                        {persona.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isEditMode && (
                <button
                  onClick={() => setEditingPersona(editingPersona === persona.id ? null : persona.id)}
                  className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                  title="Modifier ce persona"
                >
                  <Edit size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {!isEditMode && tempPersonas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <User size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Aucun persona défini. Activez le mode édition pour commencer.</p>
        </div>
      )}
    </div>
  );
};

export default PersonaSection;