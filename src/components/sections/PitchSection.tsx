import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, MessageSquare } from 'lucide-react';
import { PitchSection as PitchSectionType } from '../../types';

interface PitchSectionProps {
  pitch: PitchSectionType;
  isEditMode: boolean;
  onUpdate: (pitch: PitchSectionType) => void;
}

const PitchSection: React.FC<PitchSectionProps> = ({ pitch, isEditMode, onUpdate }) => {
  const [tempPitch, setTempPitch] = useState(pitch);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePitchChange = (field: keyof PitchSectionType, value: string) => {
    setTempPitch({ ...tempPitch, [field]: formatXMLContent(value) });
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(tempPitch);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setTempPitch(pitch);
    setHasChanges(false);
  };

  const parseXMLContent = (xmlString: string) => {
    const match = xmlString.match(/<pitch_personnalise>(.*?)<\/pitch_personnalise>/);
    return match ? match[1] : xmlString;
  };

  const formatXMLContent = (content: string) => {
    return `<pitch_personnalise>${content}</pitch_personnalise>`;
  };

  const pitchSections = [
    {
      key: 'challenges' as keyof PitchSectionType,
      title: 'Premier paragraphe (20 secondes)',
      subtitle: 'Les enjeux de nos clients auxquels nous répondons',
      placeholder: 'Décrivez les principaux défis que rencontrent vos clients...',
      color: 'from-red-50 to-orange-50 border-red-100'
    },
    {
      key: 'valueProposition' as keyof PitchSectionType,
      title: 'Deuxième paragraphe',
      subtitle: 'Notre valeur ajoutée, notre savoir-faire, nos preuves de pertinence',
      placeholder: 'Présentez votre expertise unique et vos preuves de réussite...',
      color: 'from-blue-50 to-indigo-50 border-blue-100'
    },
    {
      key: 'benefits' as keyof PitchSectionType,
      title: 'Troisième paragraphe',
      subtitle: 'Les bénéfices de notre collaboration pour nos clients',
      placeholder: 'Décrivez les résultats concrets que vos clients obtiennent...',
      color: 'from-green-50 to-emerald-50 border-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Pitch Personnalisé</h4>
          <p className="text-sm text-gray-600 mt-1">Structure en 3 paragraphes avec balises XML personnalisables</p>
        </div>
        {isEditMode && hasChanges && (
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

      <div className="space-y-6">
        {pitchSections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${section.color} rounded-lg p-6 border`}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-primary-500 text-white rounded-full p-3">
                <MessageSquare size={24} />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-800">{section.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{section.subtitle}</p>
                </div>

                {isEditMode ? (
                  <div className="space-y-3">
                    <textarea
                      value={parseXMLContent(tempPitch[section.key])}
                      onChange={(e) => handlePitchChange(section.key, e.target.value)}
                      placeholder={section.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32 resize-none"
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-2">Format XML généré :</p>
                      <code className="text-xs text-gray-700 bg-gray-50 p-2 rounded block font-mono">
                        {tempPitch[section.key]}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {parseXMLContent(tempPitch[section.key])}
                      </p>
                    </div>
                    <details className="group">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                        Voir le format XML
                      </summary>
                      <div className="mt-2 bg-gray-50 p-2 rounded border">
                        <code className="text-xs text-gray-700 font-mono">
                          {tempPitch[section.key]}
                        </code>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 text-xl">💡</div>
          <div>
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Conseil :</span> Adaptez chaque paragraphe selon votre secteur d'activité et vos spécificités. 
              Le format XML permet une personnalisation automatique par intelligence artificielle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchSection;