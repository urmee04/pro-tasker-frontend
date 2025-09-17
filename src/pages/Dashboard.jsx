//import React and necessary hooks
import React, { useEffect, useState, useContext } from "react";
//import API functions for project operations
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projects";
//import authentication context to access user data
import { AuthContext } from "../context/AuthContext";
//import Material-UI components for styling and layout
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
//import Material-UI icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import navigation hook for routing
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  //access user data from authentication context
  const { user } = useContext(AuthContext);
  //initialize navigate function for programmatic routing
  const navigate = useNavigate();

  //state management for projects, loading, and UI controls
  const [projects, setProjects] = useState([]); // Array to store project data
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [openCreate, setOpenCreate] = useState(false); // Control create/edit dialog visibility
  const [form, setForm] = useState({ name: "", description: "" }); // Form data for create/edit
  const [editId, setEditId] = useState(null); // Track which project is being edited
  const [message, setMessage] = useState(null); // Store success/error messages

  //function to fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects(); //API call to get all projects
      setProjects(res.data); //update projects state with response data
    } catch (err) {
      console.error(err);
      //set error message for snackbar notification
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to load projects",
      });
    } finally {
      setLoading(false); //always stop loading regardless of success/failure
    }
  };

  // useEffect hook to fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []); //empty dependency array means run only once on mount

  //function to open create project dialog
  const handleOpenCreate = () => {
    setForm({ name: "", description: "" }); //reset form
    setEditId(null); //clear edit ID
    setOpenCreate(true); //open dialog
  };

  //function to populate form with project data for editing
  const handleEdit = (project) => {
    setForm({ name: project.name, description: project.description }); //Pre-fill form
    setEditId(project._id); //set project ID being edited
    setOpenCreate(true); //open dialog
  };

  //function to delete a project with confirmation
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return; //confirm deletion
    try {
      await deleteProject(id); //API call to delete project
      setMessage({ type: "success", text: "Project deleted" }); //success message
      fetchProjects(); //refresh project list
    } catch (err) {
      //error handling with snackbar notification
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Delete failed",
      });
    }
  };

  //function to handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission
    try {
      if (editId) {
        //if editing existing project
        await updateProject(editId, form); // API call to update project
        setMessage({ type: "success", text: "Project updated" });
      } else {
        //if creating new project
        await createProject(form); //API call to create project
        setMessage({ type: "success", text: "Project created" });
      }
      setOpenCreate(false); //close dialog
      fetchProjects(); //refresh project list
    } catch (err) {
      //error handling with snackbar notification
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

  //main component render
  return (
    <Container sx={{ py: 3 }}>
      {/* Header section with title and create button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Your Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          New Project
        </Button>
      </Box>

      {/* Projects grid layout */}
      <Grid container spacing={2}>
        {/* Empty state message */}
        {projects.length === 0 && (
          <Grid item xs={12}>
            <Typography>No projects yet, create a new one.</Typography>
          </Grid>
        )}
        {/* Map through projects and render cards */}
        {projects.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {p.description}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Button to navigate to project detail page */}
                <Button
                  size="small"
                  onClick={() => navigate(`/projects/${p._id}`)}
                >
                  Open
                </Button>
                {/* Edit button */}
                <IconButton size="small" onClick={() => handleEdit(p)}>
                  <EditIcon />
                </IconButton>
                {/* Delete button */}
                <IconButton size="small" onClick={() => handleDelete(p._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit project dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth>
        <DialogTitle>{editId ? "Edit Project" : "New Project"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* Project name input field */}
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            {/* Project description input field */}
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editId ? "Save" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for success/error notifications */}
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
