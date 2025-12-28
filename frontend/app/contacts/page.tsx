'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Users,
  Search,
  Plus,
  Mail,
  Building,
  RefreshCcw,
  Target,
  TrendingUp,
  Filter,
  Sparkles,
  Database,
  Zap,
  MoreVertical,
  Linkedin,
  X,
  ExternalLink,
  Phone
} from 'lucide-react'
import { contactsAPI, hubspotAPI } from '@/lib/api'
import type { Contact, ICPTier, EnrichmentStatus } from '@/types'
import {
  statusLabels, statusColors, industryLabels, personaLabels,
  formatRelativeTime, segmentLabels, tierLabels, tierColors,
  getScoreColor, getPriorityLabel, cn
} from '@/lib/utils'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [tierFilter, setTierFilter] = useState<ICPTier | ''>('')
  const [sortBy, setSortBy] = useState<'created_at' | 'icp_score'>('icp_score')
  const [enriching, setEnriching] = useState(false)
  const [enrichingId, setEnrichingId] = useState<number | null>(null)
  const [enrichmentStatus, setEnrichmentStatus] = useState<EnrichmentStatus | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const loadContacts = async () => {
    setLoading(true)
    try {
      const params: any = { page, search: search || undefined, sort_by: sortBy, sort_order: 'desc' }
      if (tierFilter) params.icp_tier = tierFilter
      const result = await contactsAPI.list(params)
      setContacts(result.contacts)
      setTotal(result.total)
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadEnrichmentStatus = async () => {
    try {
      const status = await contactsAPI.getEnrichmentStatus()
      setEnrichmentStatus(status)
    } catch (error) {
      console.error('Failed to load enrichment status:', error)
    }
  }

  useEffect(() => {
    loadContacts()
    loadEnrichmentStatus()
  }, [page, search, tierFilter, sortBy])

  const handleHubSpotSync = async () => {
    setSyncing(true)
    try {
      const result = await hubspotAPI.importContacts()
      alert(`Sync terminé: ${JSON.stringify(result.stats)}`)
      loadContacts()
    } catch (error) {
      console.error('HubSpot sync failed:', error)
      alert('Erreur de synchronisation HubSpot')
    } finally {
      setSyncing(false)
    }
  }

  const handleEnrichBatch = async () => {
    setEnriching(true)
    try {
      const result = await contactsAPI.enrichBatch(undefined, 50)
      alert(`Enrichissement: ${result.message}`)
      loadContacts()
      loadEnrichmentStatus()
    } catch (error) {
      console.error('Enrichment failed:', error)
      alert('Erreur d\'enrichissement')
    } finally {
      setEnriching(false)
    }
  }

  const handleEnrichContact = async (contactId: number) => {
    setEnrichingId(contactId)
    try {
      const result = await contactsAPI.enrich(contactId)
      if (result.enriched) {
        loadContacts()
        loadEnrichmentStatus()
      }
    } catch (error) {
      console.error('Contact enrichment failed:', error)
    } finally {
      setEnrichingId(null)
    }
  }

  // Count by tier
  const tier1Count = contacts.filter(c => c.icp_tier === 'tier_1').length
  const tier2Count = contacts.filter(c => c.icp_tier === 'tier_2').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">{total} contacts au total</p>
        </div>
        <div className="flex items-center gap-3">
          {enrichmentStatus && enrichmentStatus.contacts_missing_phone > 0 && (
            <Button variant="outline" onClick={handleEnrichBatch} disabled={enriching}>
              <Sparkles className={cn("h-4 w-4 mr-2", enriching && "animate-pulse")} />
              {enriching ? 'Enrichissement...' : 'Enrichir'}
              <span className="ml-1 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                {enrichmentStatus.contacts_missing_phone} sans tél.
              </span>
            </Button>
          )}
          <Button variant="outline" onClick={handleHubSpotSync} disabled={syncing}>
            <RefreshCcw className={cn("h-4 w-4 mr-2", syncing && "animate-spin")} />
            {syncing ? 'Sync...' : 'Import HubSpot'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Contact
          </Button>
        </div>
      </div>

      {/* ICP Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setTierFilter('tier_1')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tier 1 - Prioritaires</p>
                <p className="text-2xl font-bold text-red-600">{tier1Count}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Target className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setTierFilter('tier_2')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tier 2 - Intéressants</p>
                <p className="text-2xl font-bold text-orange-600">{tier2Count}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setTierFilter('')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Contacts</p>
                <p className="text-2xl font-bold">{total}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Score Moyen</p>
                <p className="text-2xl font-bold">
                  {contacts.length > 0
                    ? (contacts.reduce((sum, c) => sum + (c.icp_score || 0), 0) / contacts.length).toFixed(1)
                    : '0'}
                  /10
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, entreprise..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-e2v-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-e2v-primary"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as ICPTier | '')}
            >
              <option value="">Tous les tiers</option>
              <option value="tier_1">🔥 Tier 1 - Prioritaires</option>
              <option value="tier_2">⭐ Tier 2 - Intéressants</option>
              <option value="tier_3">📋 Tier 3 - Secondaires</option>
              <option value="non_target">Non-target</option>
            </select>
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-e2v-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'created_at' | 'icp_score')}
            >
              <option value="icp_score">Trier par Score ICP</option>
              <option value="created_at">Trier par Date</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">Chargement...</div>
          ) : contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Users className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun contact trouvé</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score ICP
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Segment
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signaux
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    {/* Score ICP */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                          getScoreColor(contact.icp_score)
                        )}>
                          {contact.icp_score}
                        </div>
                        {contact.icp_tier && (
                          <span className={cn(
                            "mt-1 text-xs px-2 py-0.5 rounded-full",
                            tierColors[contact.icp_tier]
                          )}>
                            {contact.icp_tier === 'tier_1' ? '🔥 T1' :
                             contact.icp_tier === 'tier_2' ? '⭐ T2' :
                             contact.icp_tier === 'tier_3' ? 'T3' : '-'}
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.first_name} {contact.last_name}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </p>
                        {contact.job_title && (
                          <p className="text-xs text-gray-400">{contact.job_title}</p>
                        )}
                      </div>
                    </td>
                    {/* Entreprise */}
                    <td className="px-6 py-4">
                      {contact.company && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Building className="h-4 w-4" />
                          {contact.company}
                        </div>
                      )}
                      {contact.company_country && (
                        <p className="text-xs text-gray-400">{contact.company_country}</p>
                      )}
                    </td>
                    {/* Segment */}
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {contact.company_segment
                          ? segmentLabels[contact.company_segment] || contact.company_segment
                          : industryLabels[contact.industry] || contact.industry}
                      </p>
                      <p className="text-xs text-gray-400">
                        {personaLabels[contact.persona] || contact.persona}
                      </p>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge className={statusColors[contact.status]}>
                        {statusLabels[contact.status] || contact.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {contact.emails_sent} emails
                      </p>
                    </td>
                    {/* Signaux */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.iscc_certified && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                            ISCC+
                          </span>
                        )}
                        {contact.iscc_in_progress && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            ISCC prog
                          </span>
                        )}
                        {contact.multi_sites_eu && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                            Multi-EU
                          </span>
                        )}
                        {contact.epr_ppwr_exposure && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                            EPR/PPWR
                          </span>
                        )}
                        {contact.employees_over_100 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                            100+ emp
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {contact.linkedin_url && (
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                            title="Voir profil LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </button>
                        )}
                        {!contact.phone && (
                          <button
                            onClick={() => handleEnrichContact(contact.id)}
                            disabled={enrichingId === contact.id}
                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors disabled:opacity-50"
                            title="Enrichir ce contact (rechercher téléphone)"
                          >
                            {enrichingId === contact.id ? (
                              <RefreshCcw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        {contact.company_website && (
                          <a
                            href={contact.company_website.startsWith('http') ? contact.company_website : `https://${contact.company_website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Voir le site web"
                          >
                            <Database className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {total > 50 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} sur {Math.ceil(total / 50)}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page * 50 >= total}
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}

      {/* LinkedIn Preview Panel */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedContact(null)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg bg-white shadow-xl animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedContact.first_name} {selectedContact.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedContact.company}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-b space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                  {selectedContact.email}
                </a>
              </div>
              {selectedContact.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
              )}
              {selectedContact.job_title && (
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{selectedContact.job_title}</span>
                </div>
              )}
              {/* ICP Score */}
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  getScoreColor(selectedContact.icp_score)
                )}>
                  {selectedContact.icp_score}
                </div>
                <span className="text-sm text-gray-500">Score ICP</span>
              </div>
            </div>

            {/* LinkedIn Preview Card */}
            <div className="p-4 flex-1 overflow-y-auto">
              {selectedContact.linkedin_url && (
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 overflow-hidden">
                  {/* LinkedIn-style header */}
                  <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700" />

                  {/* Profile card */}
                  <div className="px-4 pb-4 -mt-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-lg">
                      {selectedContact.first_name?.[0]}{selectedContact.last_name?.[0]}
                    </div>

                    <div className="mt-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {selectedContact.first_name} {selectedContact.last_name}
                      </h4>
                      {selectedContact.job_title && (
                        <p className="text-gray-600">{selectedContact.job_title}</p>
                      )}
                      {selectedContact.company && (
                        <p className="text-sm text-gray-500 mt-1">
                          <Building className="h-3.5 w-3.5 inline mr-1" />
                          {selectedContact.company}
                        </p>
                      )}
                      {selectedContact.company_country && (
                        <p className="text-sm text-gray-400 mt-1">
                          📍 {selectedContact.company_country}
                        </p>
                      )}
                    </div>

                    {/* ICP Signals */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {selectedContact.iscc_certified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          ✓ ISCC+
                        </span>
                      )}
                      {selectedContact.iscc_in_progress && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          ⏳ ISCC en cours
                        </span>
                      )}
                      {selectedContact.multi_sites_eu && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          🇪🇺 Multi-sites EU
                        </span>
                      )}
                      {selectedContact.epr_ppwr_exposure && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          📋 EPR/PPWR
                        </span>
                      )}
                      {selectedContact.employees_over_100 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          👥 100+ employés
                        </span>
                      )}
                    </div>

                    {/* LinkedIn link */}
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-400 mb-2">Profil LinkedIn</p>
                      <p className="text-sm text-blue-600 truncate">{selectedContact.linkedin_url}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedContact.notes && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-xs font-medium text-yellow-800 mb-1">Notes</p>
                  <p className="text-sm text-yellow-900">{selectedContact.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedContact(null)}
                >
                  Fermer
                </Button>
                <a
                  href={selectedContact.linkedin_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
