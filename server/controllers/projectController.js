import Project from "../models/projects.js";

export const createProject = async (req, res) => {
  try {
    const { user_id, title, Description, image_url, status } = req.body;

    // Validate required fields
    if (!user_id || !title) {
      return res.status(400).json({ message: "user_id and title are required" });
    }

    // Create the project
    const newProject = await Project.create({
      user_id,
      title,
      Description,
      image_url,
      status,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};
export const getProjectsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const projects = await Project.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { user_id, projectId } = req.params;
    const { title, Description, image_url, status } = req.body;

    const project = await Project.findOne({
      where: { id: projectId, user_id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title ?? project.title;
    project.Description = Description ?? project.Description;
    project.image_url = image_url ?? project.image_url;
    project.status = status ?? project.status;

    await project.save();

    return res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { user_id, projectId } = req.params;

    const project = await Project.findOne({
      where: { id: projectId, user_id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};
