import axios from 'axios';

const baseUrl = '/api/persons';

function retrieve () {
  return axios.get(`${baseUrl}`)
    .then(response => response.data);
}

function create (newObj) {
  return axios.post(`${baseUrl}`, newObj)
    .then(response => response.data);
}

function remove (id) {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data);
}

function update (person, id) {
  return axios.put(`${baseUrl}/${id}`, person) 
    .then(response => response.data);
}

export default {retrieve, create, remove, update};