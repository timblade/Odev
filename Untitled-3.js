const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const dataFilePath = './data.json';

function readDataFile() {
  try {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeDataFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

app.get('/api/biographic', (req, res) => {
  const data = readDataFile();
  res.json(data.biographic);
});

app.post('/api/biographic', (req, res) => {
  const data = readDataFile();
  data.biographic = req.body;
  writeDataFile(data);
  res.sendStatus(200);
});

app.get('/api/aboutme', (req, res) => {
  const data = readDataFile();
  res.json(data.aboutme);
});

app.post('/api/aboutme', (req, res) => {
  const data = readDataFile();
  data.aboutme = req.body;
  writeDataFile(data);
  res.sendStatus(200);
});

app.get('/api/skills', (req, res) => {
  const data = readDataFile();
  res.json(data.skills);
});

app.post('/api/skills', (req, res) => {
  const data = readDataFile();
  data.skills = req.body;
  writeDataFile(data);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
  
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSectionId = event.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetSectionId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    const biographicForm = document.getElementById('biographic-form');
    const aboutmeForm = document.getElementById('aboutme-form');
    const skillsForm = document.getElementById('skills-form');
  
    biographicForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formDataObject = Object.fromEntries(formData.entries());
      sendData('/api/biographic', formDataObject);
    });
  
    aboutmeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formDataObject = Object.fromEntries(formData.entries());
      sendData('/api/aboutme', formDataObject);
    });
  
    skillsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formDataObject = Object.fromEntries(formData.entries());
      sendData('/api/skills', formDataObject);
    });
  
    function sendData(url, data) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert('Data updated successfully!');
          } else {
            alert('Failed to update data!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }      
        fetch('/api/biographic')
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              showBiographicForm(data);
            } else {
              createBiographicForm();
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
      
      function createBiographicForm() {
        const biographicFormContainer = document.getElementById('biographic-form-container');
      
        const form = document.createElement('form');
        form.id = 'biographic-form';
      
        form.innerHTML = `
          <label for="name">Name:</label>
          <input type="text" id="name" required>
          <label for="dob">Date of Birth:</label>
          <input type="date" id="dob" required>
          <label for="address">Address:</label>
          <input type="text" id="address" required>
          <button type="submit">Save Biographic Info</button>
        `;
      
        biographicFormContainer.appendChild(form);
      
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const formDataObject = Object.fromEntries(formData.entries());
          sendData('/api/biographic', formDataObject);
        });
      }
      
      function showBiographicForm(data) {
        const biographicFormContainer = document.getElementById('biographic-form-container');
      
        const form = document.createElement('form');
        form.id = 'biographic-form';
      
        form.innerHTML = `
          <label for="name">Name:</label>
          <input type="text" id="name" value="${data.name}" required>
          <label for="dob">Date of Birth:</label>
          <input type="date" id="dob" value="${data.dob}" required>
          <label for="address">Address:</label>
          <input type="text" id="address" value="${data.address}" required>
          <button type="submit">Save Biographic Info</button>
          <button type="button" id="edit-biographic">Edit</button>
        `;
      
        biographicFormContainer.appendChild(form);
      
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const formDataObject = Object.fromEntries(formData.entries());
          sendData('/api/biographic', formDataObject);
        });
      
        const editButton = document.getElementById('edit-biographic');
        editButton.addEventListener('click', () => {
          form.remove();
          createBiographicForm();
        });      
};  
