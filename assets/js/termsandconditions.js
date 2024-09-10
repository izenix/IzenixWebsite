//// Get the dialog elements
//const dialogBox = document.getElementById('dialogBox');
//const openDialog = document.getElementById('openDialog');
//const closeDialog = document.getElementById('closeDialog');

//// Function to open the dialog box
//openDialog.addEventListener('click', function () {
//    dialogBox.style.display = 'flex';
//});

//// Function to close the dialog box
//closeDialog.addEventListener('click', function () {
//    dialogBox.style.display = 'none';
//});

//// Optional: Close dialog when clicking outside the content
//window.addEventListener('click', function (event) {
//    if (event.target === dialogBox) {
//        dialogBox.style.display = 'none';
//    }
//});
// Get the dialog elements
const dialogBox = document.getElementById('dialogBox');
const openTermsDialog = document.getElementById('openTermsDialog');
const openPrivacyDialog = document.getElementById('openPrivacyDialog');
const closeDialog = document.getElementById('closeDialog');
const dialogIframe = document.getElementById('dialogIframe');

// Function to open the dialog box with the appropriate content
function openDialog(content) {
    dialogIframe.src = content;
    dialogBox.style.display = 'flex';
}

// Event listeners for opening the dialog with the appropriate iframe source
openTermsDialog.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior
    openDialog('termsandconditions.html');
});

openPrivacyDialog.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior
    openDialog('privacypolicy.html');
});

// Function to close the dialog box
closeDialog.addEventListener('click', function () {
    dialogBox.style.display = 'none';
});

// Optional: Close dialog when clicking outside the content
window.addEventListener('click', function (event) {
    if (event.target === dialogBox) {
        dialogBox.style.display = 'none';
    }
});
