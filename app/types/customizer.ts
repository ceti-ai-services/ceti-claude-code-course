/**
 * Customizer types — persona + language axis.
 * 5th persona ("corporate") exists in types but is hidden from UI until
 * intentionally surfaced. See docs/DECISIONS.md.
 */

export const PERSONAS = ['creator', 'consultant', 'service', 'realestate'] as const
export type Persona = (typeof PERSONAS)[number]

export const HIDDEN_PERSONAS = ['corporate'] as const
export type HiddenPersona = (typeof HIDDEN_PERSONAS)[number]

export type AnyPersona = Persona | HiddenPersona

export const LANGS = ['en', 'es'] as const
export type Lang = (typeof LANGS)[number]

export interface CustomizerState {
  persona: Persona | null
  lang: Lang
}

export const DEFAULT_CUSTOMIZER: CustomizerState = {
  persona: null,
  lang: 'en',
}

export const PERSONA_LABELS: Record<Persona, { en: string; es: string; icon: string; oneLine: { en: string; es: string } }> = {
  creator: {
    en: 'Creator',
    es: 'Creador',
    icon: 'Camera',
    oneLine: {
      en: 'Coaches, creators, newsletter writers, course makers.',
      es: 'Coaches, creadores, escritores de newsletter, creadores de cursos.',
    },
  },
  consultant: {
    en: 'Consultant / Freelancer',
    es: 'Consultor / Freelancer',
    icon: 'Briefcase',
    oneLine: {
      en: 'Solo consultants, designers, developers, contractors.',
      es: 'Consultores independientes, diseñadores, desarrolladores, contratistas.',
    },
  },
  service: {
    en: 'Service business',
    es: 'Negocio de servicios',
    icon: 'Wrench',
    oneLine: {
      en: 'Tradespeople, salons, trainers, tutors, cleaners.',
      es: 'Oficios, salones, entrenadores, tutores, limpieza.',
    },
  },
  realestate: {
    en: 'Real estate',
    es: 'Bienes raíces',
    icon: 'Home',
    oneLine: {
      en: 'Brokers, agents — listings, comps, client follow-ups.',
      es: 'Corredores, agentes — listados, comparables, seguimiento de clientes.',
    },
  },
}

export function isPersona(v: unknown): v is Persona {
  return typeof v === 'string' && (PERSONAS as readonly string[]).includes(v)
}

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LANGS as readonly string[]).includes(v)
}
