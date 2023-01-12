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

export default {retrieve, create};