import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';
import SalesStageCard from './components/SalesStageCard';
import { salesStages } from './data/salesPlanData';
import { SalesStage } from './types';

function App() {
  const [stages, setStages] = useState<SalesStage[]>(salesStages);

  const handleStageUpdate = (stageId: string, updatedContent: any) => {
    setStages(prevStages => 
      prevStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, content: updatedContent }
          : stage
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-2">
                <TrendingUp size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Plan de Vente Interactif</h1>
                <p className="text-sm text-gray-600">Application commerciale moderne et personnalisable</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users size={16} />
                <span className="text-sm font-medium">Commercial</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BarChart3 size={16} />
                <span className="text-sm font-medium">{stages.length} Étapes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Maîtrisez votre processus de vente
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une approche structurée et personnalisable pour optimiser chaque étape de votre cycle commercial. 
            Cliquez sur les cartes pour découvrir le contenu détaillé de chaque phase.
          </p>
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Vue d'ensemble du processus</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {stages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-primary-100 px-3 py-2 rounded-lg border border-primary-200">
                    <span className="text-lg">{stage.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{stage.title}</span>
                    {stage.isPersonalizable && (
                      <span className="w-2 h-2 bg-green-400 rounded-full" title="Personnalisable"></span>
                    )}
                  </div>
                  {index < stages.length - 1 && (
                    <div className="text-primary-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sales Stages */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Étapes détaillées du processus de vente</h3>
            <p className="text-gray-600">
              Cliquez sur chaque carte pour explorer le contenu détaillé. 
              Les sections marquées d'un <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                symbole vert
              </span> sont personnalisables.
            </p>
          </div>
          
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SalesStageCard
                stage={stage}
                onStageUpdate={handleStageUpdate}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Conception UX/UI de première catégorie</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cette application a été conçue avec une attention particulière à l'expérience utilisateur et à l'interface. 
              Chaque interaction est pensée pour offrir fluidité, esthétique moderne et efficacité maximale pour les commerciaux.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Animations fluides</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Sections personnalisables</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                <span>Format XML pour IA</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>Protection par mot de passe</span>
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;