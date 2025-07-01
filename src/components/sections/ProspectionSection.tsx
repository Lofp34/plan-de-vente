import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Edit, Save, X, Target } from 'lucide-react';
import { ProspectionChannel } from '../../types';

interface ProspectionSectionProps {
  channels: ProspectionChannel[];
  isEditMode: boolean;
  onUpdate: (channels: ProspectionChannel[]) => void;
}

const ProspectionSection: React.FC<ProspectionSectionProps> = ({ channels, isEditMode, onUpdate }) => {
  const [expandedChannels, setExpandedChannels] = useState<string[]>([]);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [tempChannels, setTempChannels] = useState(channels);

  const toggleChannelExpansion = (channelId: string) => {
    setExpandedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleAddChannel = () => {
    const newChannel: ProspectionChannel = {
      id: `channel${tempChannels.length + 1}`,
      name: 'Nouveau canal',
      description: 'Description du canal de prospection',
      steps: [
        'Étape 1',
        'Étape 2', 
        'Étape 3',
        'Étape 4'
      ],
      isCustomizable: true
    };
    setTempChannels([...tempChannels, newChannel]);
  };

  const handleEditChannel = (channelId: string, field: keyof ProspectionChannel, value: any) => {
    setTempChannels(tempChannels.map(channel => 
      channel.id === channelId ? { ...channel, [field]: value } : channel
    ));
  };

  const handleEditStep = (channelId: string, stepIndex: number, value: string) => {
    setTempChannels(tempChannels.map(channel => 
      channel.id === channelId 
        ? { 
            ...channel, 
            steps: channel.steps.map((step, index) => 
              index === stepIndex ? value : step
            )
          } 
        : channel
    ));
  };

  const handleAddStep = (channelId: string) => {
    setTempChannels(tempChannels.map(channel => 
      channel.id === channelId 
        ? { ...channel, steps: [...channel.steps, 'Nouvelle étape'] }
        : channel
    ));
  };

  const handleSaveChannels = () => {
    onUpdate(tempChannels);
    setEditingChannel(null);
  };

  const handleCancelEdit = () => {
    setTempChannels(channels);
    setEditingChannel(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800">Canaux de Prospection</h4>
        {isEditMode && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddChannel}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus size={16} />
              <span>Ajouter Canal</span>
            </button>
            {editingChannel && (
              <>
                <button
                  onClick={handleSaveChannels}
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
        {tempChannels.map((channel) => (
          <motion.div
            key={channel.id}
            layout
            className="bg-white border border-gray-200 rounded-lg overflow-hidden card-shadow"
          >
            <div 
              className="p-4 cursor-pointer bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all duration-300"
              onClick={() => toggleChannelExpansion(channel.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="text-primary-500" size={20} />
                  <div>
                    {isEditMode && editingChannel === channel.id ? (
                      <input
                        type="text"
                        value={channel.name}
                        onChange={(e) => handleEditChannel(channel.id, 'name', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none"
                      />
                    ) : (
                      <h5 className="font-semibold text-gray-800">{channel.name}</h5>
                    )}
                    {isEditMode && editingChannel === channel.id ? (
                      <input
                        type="text"
                        value={channel.description}
                        onChange={(e) => handleEditChannel(channel.id, 'description', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{channel.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingChannel(editingChannel === channel.id ? null : channel.id);
                      }}
                      className="p-1 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  <motion.div
                    animate={{ rotate: expandedChannels.includes(channel.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-500" />
                  </motion.div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedChannels.includes(channel.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <h6 className="font-medium text-gray-800 mb-3">Étapes d'activation (4 étapes)</h6>
                    <div className="space-y-3">
                      {channel.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                            {index + 1}
                          </span>
                          {isEditMode && editingChannel === channel.id ? (
                            <input
                              type="text"
                              value={step}
                              onChange={(e) => handleEditStep(channel.id, index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            <div className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-200">
                              {step}
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditMode && editingChannel === channel.id && (
                        <button
                          onClick={() => handleAddStep(channel.id)}
                          className="flex items-center space-x-2 px-3 py-2 text-primary-500 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Plus size={16} />
                          <span>Ajouter une étape</span>
                        </button>
                      )}
                    </div>
                    
                    {channel.isCustomizable && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">Zone personnalisable :</span> Ce canal peut être adapté selon les spécificités de votre secteur d'activité.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {tempChannels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Target size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Aucun canal de prospection défini. Activez le mode édition pour commencer.</p>
        </div>
      )}
    </div>
  );
};

export default ProspectionSection;