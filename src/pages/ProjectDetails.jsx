//import React and necessary hooks for state and lifecycle management
import React, { useEffect, useState } from "react";
//import routing hooks for parameter extraction and navigation
import { useParams, useNavigate } from "react-router-dom";
//import API functions for project and task operations
import { getProject } from "../api/projects";
import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
//import Material-UI components for styling and layout
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
//import Material-UI icons for edit and delete actions
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProjectDetails() {
  //extract project ID from URL parameters
  const { id } = useParams();
  //initialize navigate function for programmatic routing
  const navigate = useNavigate();

  //state for storing project data
  const [project, setProject] = useState(null);
  //state for storing tasks associated with the project
  const [tasks, setTasks] = useState([]);
  //loading state to show progress indicator
  const [loading, setLoading] = useState(true);

  //state for managing task dialog visibility
  const [openTask, setOpenTask] = useState(false);
  //state for task form data
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  //state to track which task is being edited (null for new tasks)
  const [editTaskId, setEditTaskId] = useState(null);
  //state for snackbar messages (success/error notifications)
  const [message, setMessage] = useState(null);

  //function to fetch both project details and associated tasks
  const fetchProjectAndTasks = async () => {
    setLoading(true);
    try {
      //use Promise.all to fetch project and tasks concurrently
      const [pRes, tRes] = await Promise.all([
        getProject(id),
        getProjectTasks(id),
      ]);
      setProject(pRes.data);
      setTasks(tRes.data);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to load project",
      });
    } finally {
      setLoading(false);
    }
  };

  //useEffect hook to fetch data when component mounts or project ID changes
  useEffect(() => {
    fetchProjectAndTasks();
    // eslint-disable-next-line
  }, [id]);

  //function to open dialog for creating a new task
  const handleOpenCreate = () => {
    setTaskForm({ title: "", description: "", status: "To Do" });
    setEditTaskId(null);
    setOpenTask(true);
  };

  //function to open dialog for editing an existing task
  const handleEditTask = (t) => {
    setTaskForm({
      title: t.title,
      description: t.description,
      status: t.status,
    });
    setEditTaskId(t._id);
    setOpenTask(true);
  };

  //function to delete a task with confirmation
  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      setMessage({ type: "success", text: "Task deleted" });
      fetchProjectAndTasks(); //refresh the task list
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Delete failed",
      });
    }
  };

  //function to handle form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTaskId) {
        await updateTask(editTaskId, taskForm);
        setMessage({ type: "success", text: "Task updated" });
      } else {
        await createTask(id, taskForm);
        setMessage({ type: "success", text: "Task created" });
      }
      setOpenTask(false);
      fetchProjectAndTasks(); //refresh the task list
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Save failed",
      });
    }
  };

  //show loading spinner while data is being fetched
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  //show error message if project is not found
  if (!project)
    return (
      <Container>
        <Typography variant="h6">
          Project not found or you are not authorized.
        </Typography>
        <Button onClick={() => navigate("/dashboard")}>Back</Button>
      </Container>
    );

  return (
    <Container sx={{ py: 3 }}>
      {/* Project header with title and create task button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">{project.name}</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          New Task
        </Button>
      </Box>
      <Typography variant="body1" mb={3}>
        {project.description}
      </Typography>

      {/* Tasks grid layout */}
      <Grid container spacing={2}>
        {tasks.length === 0 && (
          <Grid item xs={12}>
            <Typography>No tasks yet.</Typography>
          </Grid>
        )}
        {tasks.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t._id}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Box>
                    <Typography variant="h6">{t.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {t.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {t.status}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEditTask(t)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTask(t._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for creating/editing tasks */}
      <Dialog open={openTask} onClose={() => setOpenTask(false)} fullWidth>
        <DialogTitle>{editTaskId ? "Edit Task" : "New Task"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              fullWidth
              margin="normal"
              multiline
              rows={3}
              required
            />
            <Box mt={1}>
              <TextField
                select
                label="Status"
                value={taskForm.status}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, status: e.target.value })
                }
                fullWidth
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTask(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editTaskId ? "Save" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for showing success/error messages */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
      >
        {message ? <Alert severity={message.type}>{message.text}</Alert> : null}
      </Snackbar>
    </Container>
  );
}
