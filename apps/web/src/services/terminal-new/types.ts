import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { WebglAddon } from 'xterm-addon-webgl'

export interface TerminalOptions {
  fontSize?: number
  fontFamily?: string
  theme?: {
    background?: string
    foreground?: string
    cursor?: string
    selection?: string
  }
}

export interface TerminalState {
  id: string
  title: string
  cwd: string
  active: boolean
}

export interface TerminalInstance {
  terminal: Terminal
  fitAddon: FitAddon
  webLinksAddon: WebLinksAddon
  webglAddon: WebglAddon
  state: TerminalState
}

export interface TerminalServiceInterface {
  createTerminal(container: HTMLElement, options?: TerminalOptions): TerminalInstance
  disposeTerminal(instance: TerminalInstance): void
  resizeTerminal(instance: TerminalInstance): void
  focusTerminal(instance: TerminalInstance): void
  writeToTerminal(instance: TerminalInstance, data: string): void
  onTerminalData(instance: TerminalInstance, callback: (data: string) => void): void
  onTerminalResize(instance: TerminalInstance, callback: (cols: number, rows: number) => void): void
  getState(instance: TerminalInstance): TerminalState
  updateState(instance: TerminalInstance, state: Partial<TerminalState>): void
}
