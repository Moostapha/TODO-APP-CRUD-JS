// div tasks injection dynamique task
const tasks = document.getElementById('tasks');

// Formulaire
const form = document.getElementById('form');

// Champ formulaire titre 
const titleTaskInput = document.getElementById('titleTaskInput');

// Champ formulaire date
const dateTaskInput = document.getElementById('dateTaskInput');

// Champ formulaire description 
const textTask = document.getElementById('textTask');

// Notification message erreur formValidation
const errorMsg = document.getElementById('errorMsg');


// FONCTIONS de l'APPLICATION TODO

// Ajout eventListerner bouton submit avec correction comportement par défaut (reload browser)
form.addEventListener('submit', (e) => {
    // suppresion comportement par défautbouton click submit du form
    e.preventDefault();
    // appel de la fonction validant ou invalidant le formulaire
    formValidation();
})

// CATCH STORE USER INPUT DATA (2 ways)

// Initiation objet vide récupérant infos task créé
let taskEntries = [];

// utilisation du localStorage pour stocker objet en mémoire


// a-Fonction créant objet avec nos inputs pour une task et les met dans le tableau vide taskEntries
function getUserInput(title, date, description){
    
    // Création objet avec nos 3 inputs
    const logEntryTask = {
        title: title,
        date: date,
        description: description
    };
    
    // insertion dans tableau
    taskEntries.push(logEntryTask);
    
    // Check dans console des inputs dans tableau logEntry
    console.log('BRAND NEW TASK ADDED:', logEntryTask);
}

// Fonction validation de formulaire donnant succès ou erreur (champs vides)
function formValidation(){
    if (titleTaskInput.value === '') {
        
        // succes
        console.log('ECHEC VALIDATION');
        // display errorMsg on screen
        errorMsg.innerHTML = 'Ce champ ne peut être vide !!!'; 
        
    }  else {
        
        // fail
        console.log('SUCCES VALIDATION');
        // display no errorMsg    
        errorMsg.innerHTML = '';      
        
        // Accept and store data => appel de getUserInput avec les 3 params (title | date | description)
        getUserInput(
            titleTaskInput.value, 
            dateTaskInput.value, 
            textTask.value
        );
        
        // Upload on screen with createTask()
        createTask();
        
    }
}

function resetForm(){
    // reset form
    titleTaskInput.value = '';
    dateTaskInput.value = '';
    textTask.value = '';
}

// CRUD
function createTask() {
    // template litteral élément dynamique peuvent être ceux du tableau logEntryTask et ses clés:valeur
    tasks.innerHTML += `
        
        <div>
            <span class="fw-bold">${titleTaskInput.value}</span>
            <span class="small font-italic">${dateTaskInput.value}</span>
            <p>${textTask.value}</p>
            <span class="optionsBtns">
                <i onClick="updateTask(this)" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#form"></i>
                <i onClick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
            </span>
        </div>
    `
    
    // reset form
    resetForm();

}

function updateTask(e){
    
    // task to update
    // let titleToUpdate = titleTaskInput.value;
    // let dateToUpdate = dateTaskInput.value;
    // let descriptionToUpdate = textTask.value;
    // console.log('INPUTS TASK:', titleToUpdate)
    
    // Access to values in DOM via template litteral
    // let showDescriptionInForm = e.parentElement.previousElementSibling.innerHTML;                                              // texte de description
    // let showDateInForm = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;                             // date
    // let showTitleInForm = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;    // title
    
    // console.log('VALEUR DE SAISIE DE TITLE:', showTitleInForm );
    // console.log('VALEUR DE SAISIE DE DATE:', showDateInForm );
    // console.log('VALEUR DE SAISIE DE DESCRIPTION:', showDescriptionInForm );
    
    // Sélection de la DIV parent possédant nos 3 inputs, en partant de update(this)
    let selectedTask = e.parentElement.parentElement;
    console.log('SELECTED TASK:', selectedTask);
    
    // écriture des valeurs dans les div enfants
    titleTaskInput.value = selectedTask.children[0].innerHTML;
    dateTaskInput.value = selectedTask.children[1].innerHTML;
    textTask.value = selectedTask.children[2].innerHTML;
    
    // remove ancien post
    deleteTask(e)
    
}

function deleteTask(e) {
    e.parentElement.parentElement.remove();
}


