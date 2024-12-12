import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { WebglAddon } from 'xterm-addon-webgl'
import { TerminalInstance, TerminalOptions, TerminalServiceInterface, TerminalState } from './types'

export class XtermService implements TerminalServiceInterface {
  private static instance: XtermService
  private terminals: Map<string, TerminalInstance>
  private terminalCount: number

  private constructor() {
    this.terminals = new Map()
    this.terminalCount = 0
  }

  static getInstance(): XtermService {
    if (!XtermService.instance) {
      XtermService.instance = new XtermService()
    }
    return XtermService.instance
  }

  createTerminal(container: HTMLElement, options: TerminalOptions = {}): TerminalInstance {
    const terminal = new Terminal({
      fontSize: options.fontSize || 14,
      fontFamily: options.fontFamily || 'monospace',
      theme: {
        background: options.theme?.background || '#1e1e1e',
        foreground: options.theme?.foreground || '#ffffff',
        cursor: options.theme?.cursor || '#ffffff',
        selectionBackground: options.theme?.selection || 'rgba(255, 255, 255, 0.3)',
        ...this.getDefaultTheme(),
      },
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 10000,
      allowTransparency: true,
    })

    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    const webglAddon = new WebglAddon()

    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    terminal.loadAddon(webglAddon)

    terminal.open(container)
    fitAddon.fit()

    const id = `terminal-${++this.terminalCount}`
    const instance: TerminalInstance = {
      terminal,
      fitAddon,
      webLinksAddon,
      webglAddon,
      state: {
        id,
        title: `Terminal ${this.terminalCount}`,
        cwd: '/',
        active: true,
      },
    }

    this.terminals.set(id, instance)
    return instance
  }

  disposeTerminal(instance: TerminalInstance): void {
    instance.webglAddon.dispose()
    instance.webLinksAddon.dispose()
    instance.fitAddon.dispose()
    instance.terminal.dispose()
    this.terminals.delete(instance.state.id)
  }

  resizeTerminal(instance: TerminalInstance): void {
    instance.fitAddon.fit()
  }

  focusTerminal(instance: TerminalInstance): void {
    instance.terminal.focus()
  }

  writeToTerminal(instance: TerminalInstance, data: string): void {
    instance.terminal.write(data)
  }

  onTerminalData(instance: TerminalInstance, callback: (data: string) => void): void {
    instance.terminal.onData(callback)
  }

  onTerminalResize(
    instance: TerminalInstance,
    callback: (cols: number, rows: number) => void
  ): void {
    instance.terminal.onResize(({ cols, rows }) => callback(cols, rows))
  }

  getState(instance: TerminalInstance): TerminalState {
    return instance.state
  }

  updateState(instance: TerminalInstance, state: Partial<TerminalState>): void {
    instance.state = {
      ...instance.state,
      ...state,
    }
  }

  private getDefaultTheme() {
    return {
      black: '#000000',
      red: '#cd3131',
      green: '#0dbc79',
      yellow: '#e5e510',
      blue: '#2472c8',
      magenta: '#bc3fbc',
      cyan: '#11a8cd',
      white: '#e5e5e5',
      brightBlack: '#666666',
      brightRed: '#f14c4c',
      brightGreen: '#23d18b',
      brightYellow: '#f5f543',
      brightBlue: '#3b8eea',
      brightMagenta: '#d670d6',
      brightCyan: '#29b8db',
      brightWhite: '#e5e5e5',
    }
  }
}
