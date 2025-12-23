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
  RefreshCcw
} from 'lucide-react'
import { contactsAPI, hubspotAPI } from '@/lib/api'
import type { Contact } from '@/types'
import { statusLabels, statusColors, industryLabels, personaLabels, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)

  const loadContacts = async () => {
    setLoading(true)
    try {
      const result = await contactsAPI.list({ page, search: search || undefined })
      setContacts(result.contacts)
      setTotal(result.total)
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [page, search])

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">{total} contacts au total</p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, entreprise..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-e2v-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industrie / Persona
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activité
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HubSpot
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.first_name} {contact.last_name}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {contact.company && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Building className="h-4 w-4" />
                          {contact.company}
                        </div>
                      )}
                      {contact.job_title && (
                        <p className="text-sm text-gray-400">{contact.job_title}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{industryLabels[contact.industry] || contact.industry}</p>
                      <p className="text-xs text-gray-400">{personaLabels[contact.persona] || contact.persona}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[contact.status]}>
                        {statusLabels[contact.status] || contact.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p>{contact.emails_sent} emails envoyés</p>
                        {contact.last_contacted_at && (
                          <p className="text-gray-400 text-xs">
                            Dernier contact: {formatRelativeTime(contact.last_contacted_at)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {contact.hubspot_id ? (
                        <Badge variant="success">Synced</Badge>
                      ) : (
                        <Badge variant="outline">Local</Badge>
                      )}
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
    </div>
  )
}
