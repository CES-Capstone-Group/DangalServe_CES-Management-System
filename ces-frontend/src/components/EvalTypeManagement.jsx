// EvaluationFormManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// Button Component
const ManageButton = ({ formId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/manage/manage-eval-form', { state: { formId } });  // Pass formId through state
  };

  return (
    <button style={styles.button} onClick={handleClick}>
      Manage
    </button>
  );
};

// Modal Component for Adding New Form
const AddNewFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form submission
    if (formName.trim()) {
      onSubmit(formName, formDescription);
      setFormName("");
      setFormDescription("");
    } else {
      alert("Please enter a form name.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={styles.modalHeader}>Add New Evaluation Form</h3>
        
        <input 
          type="text" 
          value={formName} 
          onChange={(e) => setFormName(e.target.value)} 
          placeholder="Enter form name" 
          style={styles.input}
        />
        
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Enter form description"
          style={styles.textarea}
        />
        
        <div style={styles.modalActions}>
          <button onClick={handleSubmit} style={styles.submitButton}>Add</button>
          <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};


// Modal Component for Editing Form
const EditModal = ({ isOpen, onClose, onSubmit, formName, formDescription }) => {
  const [name, setName] = useState(formName || "");
  const [description, setDescription] = useState(formDescription || "");

  // Update local state whenever formName or formDescription props change
  useEffect(() => {
    if (isOpen) {
      setName(formName || "");
      setDescription(formDescription || "");
    }
  }, [isOpen, formName, formDescription]);

  const handleSubmit = () => {
    onSubmit(name, description);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={styles.modalHeader}>Edit Evaluation Form</h3>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter form name" 
          style={styles.input}
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter form description" 
          style={styles.textarea}
        />
        <div style={styles.modalActions}>
          <button onClick={handleSubmit} style={styles.submitButton}>Save</button>
          <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const EvaluationFormItem = ({ evaluation_type_id, name, description, onEdit, onDelete }) => {
  return (
    <div style={styles.formItem}>
      <p style={styles.formName}>{name}</p>
      <p style={styles.formDescription}>{description}</p> {/* Add description here */}
      <div style={styles.buttonGroup}>
        <ManageButton formId={evaluation_type_id} />
        <button style={styles.editButton} onClick={() => onEdit(evaluation_type_id, name, description)}>Edit</button>
        <button style={styles.deleteButton} onClick={() => onDelete(evaluation_type_id)}>Delete</button>
      </div>
    </div>
  );
};


// Main Component
const EvalTypeManagement = () => {
  const [forms, setForms] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch evaluation forms from backend
  const fetchEvaluationForms = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/evaluation/evaluation-types/');
      if (!response.ok) throw new Error('Failed to fetch evaluation forms');
      const data = await response.json();
      setForms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluationForms();
  }, []);


// Add a new evaluation form
const addEvaluationForm = async (formName, formDescription) => {
  // Retrieve access token from localStorage
  const accessToken = localStorage.getItem('access_token'); 
  const formData = new FormData();
  formData.append("name", formName);
  formData.append("description", formDescription);

  if (!accessToken) {
      console.error('Access token not found in local storage');
      alert('Please log in to add a form');
      return;
  }

  // Decode the token to get the user ID
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.user_id; // Ensure your token includes "user_id"

  if (!userId) {
      console.error('User ID not found in access token');
      alert('Unable to determine user ID');
      return;
  }


  formData.append("name", formName);
  formData.append("description", formDescription);
  formData.append("created_by", userId); // Pass user ID as 'created_by'

  try {
      const response = await fetch("http://127.0.0.1:8000/evaluation/evaluation-types/create/", {
          method: "POST",
          body: formData,
      });

      if (response.ok) {
          // Update the form list or trigger a reload
          const newForm = await response.json();
          setForms([...forms, newForm]);

          // Close the modal
          setAddModalOpen(false);
          alert("Evaluation form added successfully!");
      } else {
          alert("There was an error adding the evaluation form.");
      }
  } catch (error) {
      console.error("Error during form creation:", error);
      alert("An error occurred. Please try again later.");
  }
};
// Edit an existing evaluation form
const editEvaluationForm = async (formName, formDescription) => {
 

  // Retrieve access token from localStorage
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
      console.error('Access token not found in local storage');
      alert('Please log in to edit the form');
      return;
  }

  // Decode the token to get the user ID
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.user_id; // Ensure your token includes "user_id"

  if (!userId) {
      console.error('User ID not found in access token');
      alert('Unable to determine user ID');
      return;
  }

  const formData = new FormData();
  formData.append("name", formName);
  formData.append("description", formDescription);
  formData.append("updated_by", userId); // Append user ID as 'updated_by'

  try {
      const response = await fetch(`http://127.0.0.1:8000/evaluation/evaluation-types/${editingForm.evaluation_type_id}/`, {
          method: "PUT",
          body: formData,
      });

      if (response.ok) {
          const updatedForm = await response.json();

          // Update the forms list with the updated form data
          setForms(forms.map((form) => 
              (form.evaluation_type_id === editingForm.evaluation_type_id ? updatedForm : form)
          ));

          // Close the edit modal
          setEditModalOpen(false);
          alert("Evaluation form updated successfully!");
      } else {
          alert("There was an error updating the evaluation form.");
      }
  } catch (error) {
      console.error("Error during form update:", error);
      alert("There was an error updating the evaluation form.");
  }
};

 // Delete an existing evaluation form
const handleDelete = async (evaluation_type_id) => {
  try {
      const response = await fetch(`http://127.0.0.1:8000/evaluation/evaluation-types/${evaluation_type_id}/`, {
          method: "DELETE",
      });

      if (response.ok) {
          alert("Evaluation form deleted successfully!");

          // Update the forms list after deletion
          setForms(forms.filter((form) => form.evaluation_type_id !== evaluation_type_id));
      } else {
          alert("There was an error deleting the evaluation form.");
      }
  } catch (error) {
      alert("There was an error deleting the evaluation form.");
  }
};


  // Handle editing
  const handleEdit = (evaluation_type_id, name, description) => {
    setEditingForm({ evaluation_type_id, name, description });
    setEditModalOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>&lt; Back</button>
      <h2 style={styles.header}>Evaluation Form Management</h2>

      {/* Render each form item */}
      {forms.map((form) => (
        <EvaluationFormItem 
          key={form.evaluation_type_id} 
          evaluation_type_id={form.evaluation_type_id} 
          name={form.name} 
          description={form.description} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ))}

      <button style={styles.addButton} onClick={() => setAddModalOpen(true)}>
        Add Evaluation
      </button>

      {/* Modal for adding evaluation form */}
      <AddNewFormModal 
        isOpen={isAddModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onSubmit={addEvaluationForm} 
      />

      {/* Edit Modal */}
      {editingForm && (
        <EditModal 
          isOpen={isEditModalOpen} 
          onClose={() => setEditModalOpen(false)} 
          onSubmit={(name, description) => editEvaluationForm(name, description)} 
          formName={editingForm.name} 
          formDescription={editingForm.description} 
        />
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#4CAF50'
  },
  backButton: {
    fontSize: '20px',
    color: '#4CAF50',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '10px'
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px'
  },
  formItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '18px',
    margin: '0',
    color: '#4CAF50',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  editButton: {
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center'
  },
  modalHeader: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#4CAF50'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '60px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default EvalTypeManagement;
