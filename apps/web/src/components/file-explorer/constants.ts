import { FileNode } from './types';

export const INITIAL_FILES: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { name: 'Editor.tsx', type: 'file' },
          { name: 'FileExplorer.tsx', type: 'file' },
          { name: 'Terminal.tsx', type: 'file' },
          { name: 'AiChat.tsx', type: 'file' },
          { name: 'Layout.tsx', type: 'file' },
        ],
      },
      {
        name: 'app',
        type: 'folder',
        expanded: true,
        children: [
          { name: 'page.tsx', type: 'file' },
          { name: 'layout.tsx', type: 'file' },
          { name: 'globals.css', type: 'file' },
        ],
      },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
];
