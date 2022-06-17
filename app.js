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

// Bouton close du form
const add = document.getElementById('add');

// FONCTIONS de l'APPLICATION TODO

// Ajout eventListerner bouton submit avec correction comportement par défaut (reload browser)
form.addEventListener('submit', (e) => {
    // suppresion comportement par défautbouton click submit du form
    e.preventDefault();
    // appel de la fonction validant ou invalidant le formulaire
    formValidation();
})

// CATCH STORE USER INPUT DATA

// Initiation objet vide récupérant infos task créé
let taskEntries = [];


// Fonction créant objet avec nos inputs pour une task et les met dans le tableau vide taskEntries
function getAndStoreUserTaskData(title, date, description){
    
    // Création objet avec nos 3 inputs
    const logEntryTask = {
        title: title,
        date: date,
        description: description
    };
    
    // insertion dans tableau
    taskEntries.push(logEntryTask);
    
    // Check dans console des inputs dans tableau logEntry
    console.log('1) BRAND NEW TASK ADDED:', logEntryTask);
    console.log('2) TABLEAU TASKENTRIES:', taskEntries);
    
    // utilisation du localStorage pour stocker objet en mémoire
    localStorage.setItem('taskEntries', JSON.stringify(taskEntries));
    
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
        // display no errorMsg on screen 
        errorMsg.innerHTML = '';      
        
        // Accept and store data => appel de getAndStoreUserTaskData avec les 3 params (title | date | description)
        getAndStoreUserTaskData(
            titleTaskInput.value, 
            dateTaskInput.value, 
            textTask.value
        );
        
        // Upload on screen with createTask()
        createTask();
        
        // close modal-form after adding a task
        add.setAttribute('data-bs-dismiss', 'modal'); // Element.setAttribute(name, value); data-bs-dismiss et modal
        add.click(); // simulation du click afin que le form se ferme sinon click twice
        
        // IIFE imediately invoked function expression
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })()
        
    }
}

// Réinitialisation du formulaire reset des champs à champ vide
function resetForm(){
    // reset form input values
    titleTaskInput.value = '';
    dateTaskInput.value = '';
    textTask.value = '';
}


// CRUD

// create an d display new task on screen
function createTask() {
    
    
    tasks.innerHTML = '';
    
    
    taskEntries.map( (value,index) => {
        
        // template litteral élément dynamique peuvent être ceux du tableau logEntryTask et ses clés:valeur
        return(
            tasks.innerHTML += `
                <div id=${index}>
                    <span class="fw-bold">${value.title}</span>
                    <span class="small font-italic">${value.date}</span>
                    <p>${value.description}</p>
                    <span class="optionsBtns">
                        <i onClick="updateTask(this)" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#form"></i>
                        <i onClick="deleteTask(this); createTask()" class="fa-solid fa-trash-can"></i>
                    </span>
                </div>
            `
        );
    })
    
    // reset form
    resetForm();
    
}

// edit task
function updateTask(e){
    
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
    taskEntries.splice(e.parentElement.parentElement.id, 1);
    console.log('3) INDEX OF TASKENTRIES DELETED', e.parentElement.parentElement.id);
    localStorage.setItem('taskEntries', JSON.stringify(taskEntries));
    console.log('4) NEW TASKENTRIES AFTER DELETED ONE TASK', taskEntries);

}


// FONCTION IIFE qui get les éléments du localStorage
(() => {
    // retrieving taskEntries from localStorage
    taskEntries = JSON.parse(localStorage.getItem("taskEntries")) || [];  // Ajout de || [] pour le cas ou localStorage est vide sinon error avec .map()
    console.log('5) TABLEAU DES TACHES STOCKEES DANS LE LOCALSTORAGE:', taskEntries);
    
    // Appel 
    createTask();
})()
