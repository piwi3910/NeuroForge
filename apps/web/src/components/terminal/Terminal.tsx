import { useEffect, useRef } from 'react'
import { XtermService } from '../../services/terminal'
import type { TerminalInstance } from '../../services/terminal'
import 'xterm/css/xterm.css'

interface TerminalProps {
  onData?: (data: string) => void
  onResize?: (cols: number, rows: number) => void
  className?: string
}

export function Terminal({ onData, onResize, className = '' }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<TerminalInstance | null>(null)
  const service = XtermService.getInstance()

  useEffect(() => {
    if (!terminalRef.current) return

    // Create terminal instance
    const instance = service.createTerminal(terminalRef.current, {
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selection: 'rgba(255, 255, 255, 0.3)',
      },
    })

    instanceRef.current = instance

    // Set up event handlers
    if (onData) {
      service.onTerminalData(instance, onData)
    }

    if (onResize) {
      service.onTerminalResize(instance, onResize)
    }

    // Handle window resize
    const handleResize = () => {
      if (instanceRef.current) {
        service.resizeTerminal(instanceRef.current)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    // Focus the terminal
    service.focusTerminal(instance)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (instanceRef.current) {
        service.disposeTerminal(instanceRef.current)
        instanceRef.current = null
      }
    }
  }, [onData, onResize])

  return (
    <div 
      ref={terminalRef} 
      className={`h-full w-full bg-[#1e1e1e] ${className}`}
      onClick={() => {
        if (instanceRef.current) {
          service.focusTerminal(instanceRef.current)
        }
      }}
    />
  )
}
