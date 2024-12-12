import { DialogType } from './types';

export function getDialogTitle(type: DialogType): string {
  switch (type) {
    case 'new-file':
      return 'New File';
    case 'new-folder':
      return 'New Folder';
    case 'rename':
      return 'Rename';
    default:
      return '';
  }
}
