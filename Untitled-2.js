function addSubmission() {
    const form = document.getElementById('contact-form');
    const submissionsContainer = document.createElement('div');
    submissionsContainer.classList.add('submission');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Your Name';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Your Email';
    
    const messageTextarea = document.createElement('textarea');
    messageTextarea.name = 'message';
    messageTextarea.placeholder = 'Your Message';
    
    submissionsContainer.appendChild(nameInput);
    submissionsContainer.appendChild(emailInput);
    submissionsContainer.appendChild(messageTextarea);
    
    form.appendChild(submissionsContainer);
  }
  
  function addSkill() {
    const skillsContainer = document.getElementById('skills');
    const skillInput = document.createElement('input');
    skillInput.type = 'text';
    skillInput.name = 'skill';
    skillInput.placeholder = 'Enter a Skill';
    
    skillsContainer.appendChild(skillInput);
  }
  
  function addTextSection() {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'section-title';
    titleInput.placeholder = 'Section Title';
    
    const contentTextarea = document.createElement('textarea');
    contentTextarea.name = 'section-content';
    contentTextarea.placeholder = 'Section Content';
    
    section.appendChild(titleInput);
    section.appendChild(contentTextarea);
    
    main.appendChild(section);

  } 
function showPopup() {
  const popup = document.getElementById('popup-dialog');
  popup.style.display = 'block';
}

function hidePopup() {
  const popup = document.getElementById('popup-dialog');
  popup.style.display = 'none';
}
function handleAddBiographicInfo(event) {
  event.preventDefault();
  showPopup('biographic-form', addBiographicInfo);
}

function handleAddAboutMe(event) {
  event.preventDefault();
  showPopup('aboutme-form', addAboutMe);
}

function handleAddSkill(event) {
  event.preventDefault();
  showPopup('skill-form', addSkill);
}
function showPopup(formId, submitFunction) {
  const popup = document.getElementById('popup-dialog');
  const form = document.getElementById(formId);
  
  form.reset();

  form.onsubmit = function(event) {
    event.preventDefault();
    submitFunction(event);
  };

  popup.style.display = 'block';
}

function addNewInfo() {
  const infoName = document.getElementById('info-name').value;
  const infoDate = document.getElementById('info-date').value;
  const infoText = document.getElementById('info-text').value;

  if (infoName && infoDate && infoText) {
    const infoList = document.getElementById('info-list');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-item');

    const infoTitle = document.createElement('h3');
    infoTitle.textContent = infoName + ' - ' + infoDate;

    const infoParagraph = document.createElement('p');
    infoParagraph.textContent = infoText;

    infoDiv.appendChild(infoTitle);
    infoDiv.appendChild(infoParagraph);

    infoList.appendChild(infoDiv);

    hidePopup();
  }
}

function addNewSkill() {
  const skillName = document.getElementById('new-skill-name').value;
  const fileInput = document.getElementById('new-skill-image');
  const file = fileInput.files[0];
  
  if (skillName && file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageURL = event.target.result;
      const skillsList = document.getElementById('skills-list');
      const newSkillLi = document.createElement('li');
      
      const skillImg = document.createElement('img');
      skillImg.src = imageURL;
      skillImg.alt = skillName;
      
      const skillNameSpan = document.createElement('span');
      skillNameSpan.textContent = skillName;
      
      newSkillLi.appendChild(skillImg);
      newSkillLi.appendChild(skillNameSpan);
      
      skillsList.appendChild(newSkillLi);
      
      hidePopup();
    };
    reader.readAsDataURL(file);
  }
}

const addSkillBtn = document.getElementById('add-skill-btn');
addSkillBtn.addEventListener('click', showPopup);

const addSkillConfirmBtn = document.getElementById('add-skill-confirm');
addSkillConfirmBtn.addEventListener('click', addNewSkill);

const addSkillCancelBtn = document.getElementById('add-skill-cancel');
addSkillCancelBtn.addEventListener('click', hidePopup);

  function sendMessage() {
    const form = document.getElementById('contact-form');
    const nameInput = form.elements['name'];
    const emailInput = form.elements['email'];
    const messageTextarea = form.elements['message'];
  
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageTextarea.value;
  
    const xhr = new XMLHttpRequest();
    const url = 'your-server-url'; 
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Message sent successfully');
      }
    };
  
    const data = JSON.stringify({ name, email, message });
  
    xhr.send(data);
  }
  const form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  sendMessage();
});
