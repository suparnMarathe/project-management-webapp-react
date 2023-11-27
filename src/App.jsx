import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleCreateProject(projectData) {
    setProjectState((prevProjectState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  }
  function handleSelectProject(id) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: id,
      };
    });
  }
  function handleDeleteProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectId
        ),
      };
    });
  }
  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
    />
  );
  console.log(projectState);
  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onCreateProject={handleCreateProject}
        onCancelProject={handleCancelProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onAddProject={handleAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
