import express from 'express'
import { middleware } from './handlers/middleware'
import { project } from './handlers/project'
import { getProjects, getProjectsById } from './handlers/getProjects'

const PORT = process.env.PORT ?? 3001
const app = express()
app.use(express.json())

//Creating a new project
app.post("/project", middleware, project);

//Don't know brain is getting sluggish get a break
app.post("/projects/conversation/:projectId", middleware, project);

//fetch project by Id
app.get("/project/:projectId", middleware, getProjectsById);

//fetch all projects
app.get("/projects", middleware, getProjects);


app.listen(PORT, () => {
  console.log("WELCOME TO THE NEW WORLD")
})