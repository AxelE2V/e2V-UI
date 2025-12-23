'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  Users,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react'
import { sequencesAPI } from '@/lib/api'
import type { Sequence } from '@/types'
import { industryLabels, personaLabels } from '@/lib/utils'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-gray-100 text-gray-500'
}

const statusLabels: Record<string, string> = {
  draft: 'Brouillon',
  active: 'Active',
  paused: 'En pause',
  archived: 'Archivée'
}

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([])
  const [loading, setLoading] = useState(true)

  const loadSequences = async () => {
    setLoading(true)
    try {
      const data = await sequencesAPI.list()
      setSequences(data)
    } catch (error) {
      console.error('Failed to load sequences:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSequences()
  }, [])

  const handleStatusChange = async (sequenceId: number, newStatus: 'active' | 'paused') => {
    try {
      await sequencesAPI.update(sequenceId, { status: newStatus })
      loadSequences()
    } catch (error) {
      console.error('Failed to update sequence:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Séquences</h1>
          <p className="text-gray-500 mt-1">{sequences.length} séquences configurées</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Séquence
        </Button>
      </div>

      {/* Sequences Grid */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GitBranch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucune séquence</h3>
            <p className="text-gray-500 mt-1">Créez votre première séquence d'outreach</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Créer une séquence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sequences.map((sequence) => (
            <SequenceCard
              key={sequence.id}
              sequence={sequence}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SequenceCard({
  sequence,
  onStatusChange
}: {
  sequence: Sequence
  onStatusChange: (id: number, status: 'active' | 'paused') => void
}) {
  const emailSteps = sequence.steps.filter(s => s.step_type === 'email').length
  const callSteps = sequence.steps.filter(s => s.step_type === 'call').length

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{sequence.name}</CardTitle>
            <Badge className={statusColors[sequence.status]} >
              {statusLabels[sequence.status]}
            </Badge>
          </div>
          <div className="flex gap-1">
            {sequence.status === 'active' ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onStatusChange(sequence.id, 'paused')}
              >
                <Pause className="h-4 w-4" />
              </Button>
            ) : sequence.status !== 'archived' && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onStatusChange(sequence.id, 'active')}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sequence.description && (
          <p className="text-sm text-gray-500 mb-4">{sequence.description}</p>
        )}

        {/* Target */}
        <div className="text-xs text-gray-400 mb-4">
          {sequence.target_industry && (
            <span className="mr-2">
              {industryLabels[sequence.target_industry] || sequence.target_industry}
            </span>
          )}
          {sequence.target_persona && (
            <span>{personaLabels[sequence.target_persona] || sequence.target_persona}</span>
          )}
        </div>

        {/* Steps summary */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4 text-blue-500" />
            {emailSteps} emails
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4 text-green-500" />
            {callSteps} appels
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="h-4 w-4" />
            {sequence.steps.length} steps
          </div>
        </div>

        {/* Enrollment stats */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{sequence.active_enrolled}</span>
            <span className="text-gray-400">/ {sequence.total_enrolled} inscrits</span>
          </div>
          <Link href={`/sequences/${sequence.id}`}>
            <Button variant="ghost" size="sm">
              Voir <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
