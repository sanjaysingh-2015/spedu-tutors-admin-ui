import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getDashboard = () => api.get('/api/dashboard/stats-data')
export const getDashboardQuickActions = () => api.get('/api/dashboard/quick-actions')

export const getCountries = () => api.get('/api/countries')
export const searchCountries = (param) => api.get(`/api/countries/search?${param}`)

export const getRoles = () => api.get('/api/roles')
export const searchRoles = (param) => api.get(`/api/roles/search?${param}`)

export const getUsers = () => api.get('/api/users')
export const searchUsers = (param) => api.get(`/api/users/search?${param}`)

export const getSubjects = () => api.get('/api/subjects')
export const searchSubjects = (param) => api.get(`/api/subjects/search?${param}`)

export const getTutors = () => api.get('/api/tutors')
export const searchTutors = (param) => api.get(`/api/tutors/search?${param}`)

export const getStudents = () => api.get('/api/students')
export const searchStudents = (param) => api.get(`/api/students/search?${param}`)

export const getFees = () => api.get('/api/fee-configs')
export const searchFees = (param) => api.get(`/api/fee-configs/search?${param}`)

export const getDocumentCategories = () => api.get('/api/document-categories')
export const searchDocumentCategories = (param) => api.get(`/api/document-categories/search?${param}`)

export const getDocuments = () => api.get('/api/documents')
export const searchDocuments = (param) => api.get(`/api/documents/search?${param}`)

export const getTutorFeeStructures = () => api.get('/api/tutor-fee-structures')
export const searchTutorFeeStructures = (param) => api.get(`/api/tutor-fee-structures/search?${param}`)

export const getTutorDocuments = () => api.get('/api/tutor-documents')
export const searchTutorDocuments = (param) => api.get(`/api/tutor-documents/search?${param}`)

export const getTutorAddresses = () => api.get('/api/tutor-addresses')
export const searchTutorAddresses = (param) => api.get(`/api/tutor-addresses/search?${param}`)

export const getLevels = () => api.get('api/levels')
export const searchLevels = (param) => api.get(`api/levels/search?${param}`)

export const getMetricCategories = () => api.get('/api/metric-categories')
export const searchMetricCategories = (param) => api.get(`/api/metric-categories/search?${param}`)

export const getMetrics = () => api.get('/api/metrics')
export const searchMetrics = (param) => api.get(`/api/metrics/search?${param}`)

export const getGamifications = () => api.get('/api/gamification-configs')
export const searchGamifications = (param) => api.get(`/api/gamification-configs/search?${param}`)

export const createRole = payload => api.post('/api/roles', payload)
export const updateRole = (id, payload) => api.put(`/api/roles/${id}`, payload)
export const deleteRole = id => api.delete(`/api/roles/${id}`)

export const createUser = payload => api.post('/api/users', payload)
export const updateUser = (id, payload) => api.put(`/api/users/${id}`, payload)
export const deleteUser = id => api.delete(`/api/users/${id}`)

export const createSubject = payload => api.post('/api/subjects', payload)
export const updateSubject = (id, payload) => api.put(`/api/subjects/${id}`, payload)
export const deleteSubject = id => api.delete(`/api/subjects/${id}`)

export const createTutor = payload => api.post('/api/tutors', payload)
export const updateTutor = (id, payload) => api.put(`/api/tutors/${id}`, payload)
export const deleteTutor = id => api.delete(`/api/tutors/${id}`)
export const approveRejectTutor = (id, status) => api.put(`api/tutors/${id}/approve/${status}`)

export const createStudent = payload => api.post('/api/students', payload)
export const updateStudent = (id, payload) => api.put(`/api/students/${id}`, payload)
export const deleteStudent = id => api.delete(`/api/students/${id}`)

export const createFee = payload => api.post('/api/fee-configs', payload)
export const updateFee = (id, payload) => api.put(`/api/fee-configs/${id}`, payload)
export const deleteFee = id => api.delete(`/api/fee-configs/${id}`)

export const createDocumentCategory = (payload) => api.post('/api/document-categories', payload)
export const updateDocumentCategory = (id, payload) => api.put(`/api/document-categories/${id}`, payload)
export const deleteDocumentCategory = id => api.delete(`/api/document-categories/${id}`)

export const createDocument = (payload) => api.post('/api/documents', payload)
export const updateDocument = (id, payload) => api.put(`/api/documents/${id}`, payload)
export const deleteDocument = id => api.delete(`/api/documents/${id}`)

export const createTutorFeeStructure = payload => api.post('/api/tutor-fee-structures', payload)
export const updateTutorFeeStructure = (id, payload) => api.put(`/api/tutor-fee-structures/${id}`, payload)
export const deleteTutorFeeStructure = id => api.delete(`/api/tutor-fee-structures/${id}`)

export const createTutorDocument = payload => api.post('/api/tutor-documents', payload)
export const updateTutorDocument = (id, payload) => api.put(`/api/tutor-documents/${id}`, payload)
export const deleteTutorDocument = id => api.delete(`/api/tutor-documents/${id}`)

export const createTutorAddress = payload => api.post('/api/tutor-addresses', payload)
export const updateTutorAddress = (id, payload) => api.put(`/api/tutor-addresses/${id}`, payload)
export const deleteTutorAddress = id => api.delete(`/api/tutor-addresses/${id}`)

export const createLevel = payload => api.post('/api/levels', payload)
export const updateLevel = (id, payload) => api.put(`/api/levels/${id}`, payload)
export const deleteLevel = id => api.delete(`/api/levels/${id}`)

export const createMetricCategory = payload => api.post('/api/metric-categories', payload)
export const updateMetricCategory = (id, payload) => api.put(`/api/metric-categories/${id}`, payload)
export const deleteMetricCategory = id => api.delete(`/api/metric-categories/${id}`)

export const createMetric = payload => api.post('/api/metrics', payload)
export const updateMetric = (id, payload) => api.put(`/api/metrics/${id}`, payload)
export const deleteMetric = id => api.delete(`/api/metrics/${id}`)

export const createGamification = payload => api.post('/api/gamification-configs', payload)
export const updateGamification = (id, payload) => api.put(`/api/gamification-configs/${id}`, payload)
export const deleteGamification = id => api.delete(`/api/gamification-configs/${id}`)

export const extractSkills = (text) => api.post('/api/ai/extract-skills', { profile: text })

export const uploadResume = async (file, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem('spedu_token')
    const response = await axios.post(`${API_BASE}/api/tutors/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });

    return response.data.filePath; // could be file path / success message
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};
