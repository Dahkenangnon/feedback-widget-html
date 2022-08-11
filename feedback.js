const instance = axios.create();
const info = document.querySelector('#info');
const errorp = document.querySelector('#error');
const submitButton = document.querySelector('#submitButton');
const form = document.querySelector('form');

let category;
let contact;
let message;
let feedbackPostEndpoint = 'http://localhost:9000/feedback/api/new';


// Auto grow textarea function
function addAutoResize() {
    document.querySelectorAll('[data-autoresize]').forEach(function (element) {
        element.style.boxSizing = 'border-box';
        var offset = element.offsetHeight - element.clientHeight;
        element.addEventListener('input', function (event) {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + offset + 'px';
        });
        element.removeAttribute('data-autoresize');
    });
}


// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve information from form
    category = document.querySelector('#category').value;
    contact = document.querySelector('#contact').value;
    message = document.querySelector('#message').value;

    // Send feedback to server
    axios.post(feedbackPostEndpoint, {
        category: category,
        message: message,
        contact: contact
    })
        .then(function (response) {
            console.log("success");
            console.log(response);
            info.classList.remove('hidden');
            info.classList.add('show');
            errorp.classList.remove('show');
        })
        .catch(function (error) {
            console.log('error');
            console.log(error);
            errorp.classList.remove('hidden');
            errorp.classList.add('show');
            info.classList.remove('show');
        });
});