import { ProjectDetails } from '../../../types/project-info';

export function isProjectDefined(projectDetails: ProjectDetails): boolean {
  return projectDetails.status?.name === 'complete' && 
         projectDetails.status?.description === 'complete' && 
         projectDetails.status?.stack === 'complete';
}
