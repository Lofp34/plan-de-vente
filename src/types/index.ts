export interface PersonaTemplate {
  id: string;
  name: string;
  description: string;
}

export interface ProspectionChannel {
  id: string;
  name: string;
  description: string;
  steps: string[];
  isCustomizable: boolean;
  isExpanded?: boolean;
}

export interface PitchSection {
  challenges: string;
  valueProposition: string;
  benefits: string;
}

export interface DiscoveryTheme {
  id: string;
  name: string;
  questions: string[];
}

export interface DiscoverySection {
  currentSituation: DiscoveryTheme[];
  history: DiscoveryTheme[];
  experience: DiscoveryTheme[];
  project: DiscoveryTheme[];
  ambitions: DiscoveryTheme[];
}

export interface Argument {
  id: string;
  benefit: string;
  advantage: string;
  characteristic: string;
}

export interface Objection {
  id: string;
  objection: string;
  origin: string;
  questionsToAsk: string[];
  responseArguments: string[];
}

export interface SalesStage {
  id: string;
  title: string;
  icon: string;
  description: string;
  isPersonalizable: boolean;
  content: any;
  isExpanded?: boolean;
}

export interface SalesPlan {
  id: string;
  title: string;
  personas: PersonaTemplate[];
  prospectionChannels: ProspectionChannel[];
  pitch: PitchSection;
  discovery: DiscoverySection;
  arguments: Argument[];
  objections: Objection[];
  stages: SalesStage[];
}