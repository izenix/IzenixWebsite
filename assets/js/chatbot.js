document.addEventListener("DOMContentLoaded", function () {
    const para = document.getElementById('chatbox');

    // After 5 seconds, open the chat box
    setTimeout(function () {
        toggleClass();
        //    playAlertSound(); // Play audio alert
    }, 5000);

    // Toggle class 'open' and 'closed' on click
    para.addEventListener('click', function () {
        toggleClass();
    });

    function toggleClass() {
        //para.classList.toggle('closed');
        para.classList.toggle('open');
    }

});