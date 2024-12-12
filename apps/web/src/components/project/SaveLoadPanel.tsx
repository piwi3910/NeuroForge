import { SaveLoadPanelProps } from './save-load/types';
import { SaveDialog } from './save-load/SaveDialog';
import { LoadDialog } from './save-load/LoadDialog';
import { SaveLoadButtons } from './save-load/SaveLoadButtons';
import { useSaveLoad } from './save-load/useSaveLoad';

export function SaveLoadPanel({
  projectId,
  projectPath,
  isLoading,
  setIsLoading,
  setProjectDetails,
  setIsGitRepo
}: SaveLoadPanelProps) {
  const {
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    isLoadDialogOpen,
    setIsLoadDialogOpen,
    savedStates,
    totalSavedProjects,
    handleSaveState,
    handleLoadState,
    isDisabled
  } = useSaveLoad(
    projectId,
    projectPath,
    isLoading,
    setIsLoading,
    setProjectDetails,
    setIsGitRepo
  );

  return (
    <>
      <SaveLoadButtons
        onSave={() => setIsSaveDialogOpen(true)}
        onLoad={() => setIsLoadDialogOpen(true)}
        isDisabled={isDisabled}
        totalSavedProjects={totalSavedProjects}
      />

      <SaveDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveState}
      />

      <LoadDialog
        isOpen={isLoadDialogOpen}
        onClose={() => setIsLoadDialogOpen(false)}
        savedStates={savedStates}
        onLoad={handleLoadState}
      />
    </>
  );
}
