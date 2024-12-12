export interface DirectoryEntry {
    name: string;
    path: string;
    type: 'directory' | 'file';
}

export interface DirectoryBrowserProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (path: string) => void;
    initialPath: string;
}

export interface DirectoryListProps {
    entries: DirectoryEntry[];
    isLoading: boolean;
    error: string | null;
    onSelect: (entry: DirectoryEntry) => void;
}

export interface NewDirectoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (name: string) => void;
}
