'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Mail,
  Plus,
  Copy,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { templatesAPI } from '@/lib/api'
import type { EmailTemplate } from '@/types'
import { industryLabels, personaLabels } from '@/lib/utils'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null)

  const loadTemplates = async () => {
    setLoading(true)
    try {
      const data = await templatesAPI.list()
      setTemplates(data)
    } catch (error) {
      console.error('Failed to load templates:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates Email</h1>
          <p className="text-gray-500 mt-1">
            {templates.length} templates disponibles
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Template
        </Button>
      </div>

      {/* Variables info */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            <strong>Variables disponibles:</strong>{' '}
            <code className="bg-gray-100 px-1 rounded">{'{{firstName}}'}</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">{'{{lastName}}'}</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">{'{{company}}'}</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">{'{{jobTitle}}'}</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">{'{{industry}}'}</code>
          </p>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucun template</h3>
            <p className="text-gray-500 mt-1">Créez votre premier template email</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Créer un template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={() => setPreviewTemplate(template)}
              onRefresh={loadTemplates}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{previewTemplate.name}</CardTitle>
              <Button variant="ghost" onClick={() => setPreviewTemplate(null)}>
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Sujet:</p>
                  <p className="font-medium">{previewTemplate.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Corps:</p>
                  <div
                    className="prose prose-sm max-w-none border rounded-lg p-4 bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: previewTemplate.body_html }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function TemplateCard({
  template,
  onPreview,
  onRefresh
}: {
  template: EmailTemplate
  onPreview: () => void
  onRefresh: () => void
}) {
  const handleDuplicate = async () => {
    try {
      await templatesAPI.create({
        name: `${template.name} (Copie)`,
        subject: template.subject,
        body_html: template.body_html,
        body_text: template.body_text,
        category: template.category,
        target_persona: template.target_persona,
        target_industry: template.target_industry
      })
      onRefresh()
    } catch (error) {
      console.error('Failed to duplicate template:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {template.category && (
                <Badge variant="outline">{template.category}</Badge>
              )}
              {!template.is_active && (
                <Badge variant="secondary">Inactif</Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-gray-700 mb-2">
          {template.subject}
        </p>
        {template.description && (
          <p className="text-sm text-gray-500 mb-4">{template.description}</p>
        )}

        {/* Target */}
        <div className="text-xs text-gray-400 mb-4">
          {template.target_industry && (
            <span className="mr-2">
              {industryLabels[template.target_industry] || template.target_industry}
            </span>
          )}
          {template.target_persona && (
            <span>{personaLabels[template.target_persona] || template.target_persona}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-1" />
            Aperçu
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-1" />
            Dupliquer
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
