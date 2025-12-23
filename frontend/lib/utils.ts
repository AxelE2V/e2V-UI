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
