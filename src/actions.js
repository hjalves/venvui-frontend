
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';


export const fetchProjects = () => ({
  type: FETCH_PROJECTS
});

export function createProject(name) {
  return {
    type: CREATE_PROJECT,
    name
  }
}


