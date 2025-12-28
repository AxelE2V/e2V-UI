import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Hier"
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
  return formatDate(date)
}

export const industryLabels: Record<string, string> = {
  chemical_recycling: 'Recyclage Chimique',
  packaging: 'Packaging',
  tires: 'Pneus',
  plastics: 'Plastiques',
  weee: 'DEEE',
  other: 'Autre'
}

export const personaLabels: Record<string, string> = {
  sustainability_manager: 'Sustainability Manager',
  operations_director: 'Operations Director',
  ceo: 'CEO',
  procurement: 'Procurement',
  compliance: 'Compliance',
  other: 'Autre'
}

export const statusLabels: Record<string, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  engaged: 'Engagé',
  qualified: 'Qualifié',
  meeting_booked: 'RDV Pris',
  not_interested: 'Pas Intéressé',
  bounced: 'Bounced',
  unsubscribed: 'Désinscrit'
}

export const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-800',
  contacted: 'bg-blue-100 text-blue-800',
  engaged: 'bg-green-100 text-green-800',
  qualified: 'bg-purple-100 text-purple-800',
  meeting_booked: 'bg-emerald-100 text-emerald-800',
  not_interested: 'bg-orange-100 text-orange-800',
  bounced: 'bg-red-100 text-red-800',
  unsubscribed: 'bg-gray-100 text-gray-500'
}

// ICP Scoring labels
export const segmentLabels: Record<string, string> = {
  chemical_recycling: 'Chemical Recycling / Pyrolysis',
  tire_recycling: 'Tire Recycling / Pyrolysis',
  food_grade_packaging: 'Food-Grade Packaging',
  eco_organisme: 'Eco-organisme / PRO',
  flexible_packaging: 'Flexible Packaging',
  plastic_compounder: 'Plastic Compounder',
  waste_management: 'Waste Management',
  fmcg_brand: 'FMCG Brand',
  equipment_provider: 'Equipment Provider',
  other: 'Autre'
}

export const tierLabels: Record<string, string> = {
  tier_1: 'Tier 1 - Prioritaire',
  tier_2: 'Tier 2 - Intéressant',
  tier_3: 'Tier 3 - Secondaire',
  non_target: 'Non-target'
}

export const tierColors: Record<string, string> = {
  tier_1: 'bg-red-100 text-red-800 border-red-200',
  tier_2: 'bg-orange-100 text-orange-800 border-orange-200',
  tier_3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  non_target: 'bg-gray-100 text-gray-500 border-gray-200'
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-red-600 bg-red-50'
  if (score >= 5) return 'text-orange-600 bg-orange-50'
  if (score >= 3) return 'text-yellow-600 bg-yellow-50'
  return 'text-gray-500 bg-gray-50'
}

export function getPriorityLabel(score: number): string {
  if (score >= 8) return '🔥 Outreach immédiat'
  if (score >= 5) return '⭐ Nurture qualifié'
  return '📋 Low priority'
}
