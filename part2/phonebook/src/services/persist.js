import axios from "axios";

const baseUrl = 'http://localhost:3001';

function retrieve () {
  return axios.get(`${baseUrl}/persons`)
              .then(response => response.data);
}

function create (newObj) {
  return axios.post(`${baseUrl}/persons`, newObj)
              .then(response => response.data);
}

function remove (id) {
  return axios.delete(`${baseUrl}/persons/${id}`)
              .then(response => response.data);
}

function update (person, id) {
  return axios.put(`${baseUrl}/persons/${id}`, person) 
              .then(response => response.data);
}

export default {retrieve, create, remove, update};