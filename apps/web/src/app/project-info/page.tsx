"use client";

import { ProjectInfoLayout } from "./ProjectInfoLayout";
import { useProjectInfo } from "./useProjectInfo";

export default function ProjectPage() {
  const projectInfo = useProjectInfo();
  return <ProjectInfoLayout {...projectInfo} />;
}
