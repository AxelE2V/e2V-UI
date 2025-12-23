'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Mail,
  Phone,
  CheckCircle,
  MessageSquare,
  SkipForward,
  Building,
  Clock
} from 'lucide-react'
import { dashboardAPI } from '@/lib/api'
import type { TodayActions, TodayActionItem } from '@/types'
import { formatDateTime } from '@/lib/utils'

export default function ActionsDuJourPage() {
  const [actions, setActions] = useState<TodayActions | null>(null)
  const [loading, setLoading] = useState(true)
  const [executing, setExecuting] = useState<number | null>(null)

  const loadActions = () => {
    setLoading(true)
    dashboardAPI.getTodayActions()
      .then(setActions)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadActions()
  }, [])

  const handleExecuteEmail = async (actionId: number) => {
    setExecuting(actionId)
    try {
      await dashboardAPI.executeEmail(actionId, true)
      loadActions() // Refresh list
    } catch (error) {
      console.error('Failed to execute email:', error)
    } finally {
      setExecuting(null)
    }
  }

  const handleExecuteCall = async (actionId: number, outcome: 'answered' | 'no_answer') => {
    setExecuting(actionId)
    try {
      await dashboardAPI.executeCall(actionId, outcome)
      loadActions()
    } catch (error) {
      console.error('Failed to log call:', error)
    } finally {
      setExecuting(null)
    }
  }

  const handleSkip = async (actionId: number) => {
    setExecuting(actionId)
    try {
      await dashboardAPI.skipAction(actionId)
      loadActions()
    } catch (error) {
      console.error('Failed to skip action:', error)
    } finally {
      setExecuting(null)
    }
  }

  const handleMarkReplied = async (actionId: number) => {
    setExecuting(actionId)
    try {
      await dashboardAPI.markReplied(actionId)
      loadActions()
    } catch (error) {
      console.error('Failed to mark as replied:', error)
    } finally {
      setExecuting(null)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement...</div>
  }

  if (!actions) {
    return <div className="text-red-500">Erreur de chargement</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Actions du Jour</h1>
          <p className="text-gray-500 mt-1">
            {new Date(actions.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <Button onClick={loadActions} variant="outline">
          Actualiser
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{actions.total_actions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Emails</p>
                <p className="text-2xl font-bold">{actions.email_actions}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Appels</p>
                <p className="text-2xl font-bold">{actions.call_actions}</p>
              </div>
              <Phone className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Autres</p>
                <p className="text-2xl font-bold">{actions.other_actions}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions List */}
      {actions.total_actions === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucune action pour aujourd'hui</h3>
            <p className="text-gray-500 mt-1">Toutes les actions ont été traitées</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {actions.actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              executing={executing === action.id}
              onExecuteEmail={() => handleExecuteEmail(action.id)}
              onExecuteCall={(outcome) => handleExecuteCall(action.id, outcome)}
              onSkip={() => handleSkip(action.id)}
              onMarkReplied={() => handleMarkReplied(action.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ActionCard({
  action,
  executing,
  onExecuteEmail,
  onExecuteCall,
  onSkip,
  onMarkReplied
}: {
  action: TodayActionItem
  executing: boolean
  onExecuteEmail: () => void
  onExecuteCall: (outcome: 'answered' | 'no_answer') => void
  onSkip: () => void
  onMarkReplied: () => void
}) {
  const isEmail = action.step_type === 'email'
  const isCall = action.step_type === 'call'

  return (
    <Card className={executing ? 'opacity-50' : ''}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${isEmail ? 'bg-blue-100' : isCall ? 'bg-green-100' : 'bg-orange-100'}`}>
              {isEmail ? (
                <Mail className="h-5 w-5 text-blue-600" />
              ) : isCall ? (
                <Phone className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{action.contact_name}</h3>
                <Badge variant="outline" className="text-xs">
                  Step {action.step_number}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{action.contact_email}</p>
              {action.contact_company && (
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <Building className="h-3 w-3" />
                  {action.contact_company}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Séquence: {action.sequence_name}
              </p>
              {isEmail && action.subject_preview && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  "{action.subject_preview}"
                </p>
              )}
              {action.task_description && (
                <p className="text-sm text-gray-600 mt-2">
                  {action.task_description}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {isEmail && (
              <>
                <Button
                  size="sm"
                  onClick={onExecuteEmail}
                  disabled={executing}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Envoyer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onMarkReplied}
                  disabled={executing}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  A répondu
                </Button>
              </>
            )}
            {isCall && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onExecuteCall('answered')}
                  disabled={executing}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Répondu
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onExecuteCall('no_answer')}
                  disabled={executing}
                >
                  Pas de réponse
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onSkip}
              disabled={executing}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
