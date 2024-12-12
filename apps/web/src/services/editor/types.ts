import type { editor } from 'monaco-editor'

export interface EditorOptions extends editor.IStandaloneEditorConstructionOptions {
  language?: string
  theme?: string
  readOnly?: boolean
}

export interface EditorState {
  value: string
  language: string
  path: string
  modified: boolean
}

export interface EditorServiceInterface {
  createEditor(container: HTMLElement, options?: EditorOptions): editor.IStandaloneCodeEditor
  disposeEditor(editor: editor.IStandaloneCodeEditor): void
  updateOptions(editor: editor.IStandaloneCodeEditor, options: EditorOptions): void
  setValue(editor: editor.IStandaloneCodeEditor, value: string): void
  getValue(editor: editor.IStandaloneCodeEditor): string
  setLanguage(editor: editor.IStandaloneCodeEditor, language: string): void
  formatDocument(editor: editor.IStandaloneCodeEditor): Promise<void>
  onDidChangeContent(editor: editor.IStandaloneCodeEditor, callback: () => void): void
  getState(editor: editor.IStandaloneCodeEditor): EditorState
}
