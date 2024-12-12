import { useState } from 'react'
import { api } from '../../../services/api'
import { ProjectDetails } from '../types'
import type { AIResponse, HttpResponse } from '../../../../../backend/src/generated/api'

interface RightPanelProps {
  projectId: string
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  onUpdateDetails: (details: ProjectDetails) => void
}

export function RightPanel({
  projectId,
  isLoading,
  setIsLoading,
  onUpdateDetails,
}: RightPanelProps) {
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await api.projects.chatWithAi(projectId, {
        message: message.trim(),
      }).then((res: HttpResponse<AIResponse>) => res.data)

      if (response.details) {
        onUpdateDetails(response.details)
      }

      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 bg-[#252526] rounded-lg p-4">
      <div className="h-full flex flex-col">
        <div className="flex-1 mb-4">
          <h2 className="text-lg font-semibold mb-2">AI Assistant</h2>
          <p className="text-sm text-gray-400">
            Ask questions about your project or request analysis.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-[#3c3c3c] text-white rounded px-3 py-2"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
