//document.getElementById("contactform").addEventListener("submit", function (event) {
//    event.preventDefault(); // Prevents the form from submitting in the traditional way

//    // Fetch form values
//    var name = document.getElementById("name").value;
//    var email = document.getElementById("email").value;
//    var phoneNumber = document.getElementById("phoneNumber").value;
//    var comments = document.getElementById("comments").value;

//    // Create an object with form data
//    var formData = {
//        "name": name,
//        "email": email,
//        "phoneNumber": phoneNumber,
//        "comments": comments
//    };

//    // Check if all fields have values
//    if (name && email && phoneNumber) {
//        // Convert object to JSON
//        var inputData = JSON.stringify(formData);

//        // Call the submitTrigger function with the form data
//        submitTrigger(inputData);
//    } else {
//        // Show alert to fill the form details
//        alert("Please fill in all the form details");
//    }
//});

//function submitTrigger(inputData) {
//    var flowUrl = "https://prod-191.westus.logic.azure.com:443/workflows/ac778d7c8ab344d48eed4ead5759714c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mG0UNau7YfS3BrUEQ-IkcJBSXuvZ2Ux0sX2zkxET0vM";

//    var req = new XMLHttpRequest();
//    req.open("POST", flowUrl, true);
//    req.setRequestHeader('Content-Type', 'application/json');
//    req.send(inputData);
//    alert("Your information has been submitted successfully. Our team shall get back to you in 1-2 business days");

//    // Clear the form fields
//    document.getElementById("contactform").reset();
//}


document.getElementById("contactform").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way
    debugger;
    var ipAddress = "";
    var city = "";
    var country = "";
    var region = "";
    var osVersion = "";
    var cityLatLong = "";
    var browserVersion = "";

    VisitorAPI("5Myl8uBF8lRCKvEZkNnP", function (data) {
        debugger;
        ipAddress = data.ipAddress;
        city = data.city;
        country = data.countryName;
        region = data.region;
        osVersion = data.os + "-" + data.osVersion;
        cityLatLong = data.cityLatLong;
        browserVersion = data.browser + "-" + data.browserVersion;

        // Fetch form values
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var comments = document.getElementById("comments").value;

        // Create an object with form data
        var formData = {
            "name": name,
            "email": email,
            "phoneNumber": phoneNumber,
            "comments": comments,
            "ipAddress": ipAddress,
            "city": city,
            "country": country,
            "region": region,
            "osVersion": osVersion,
            "cityLatLong": cityLatLong,
            "browserVersion": browserVersion
        };

        // Check if all fields have values
        if (name && email && phoneNumber) {
            // Convert object to JSON
            var inputData = JSON.stringify(formData);

            // Call the submitTrigger function with the form data
            submitTrigger(inputData);
        } else {
            // Show alert to fill the form details
            alert("Please fill in all the form details");
        }
    }, function (errorCode, errorMessage) {
        console.log(errorCode, errorMessage);
    });
});

var VisitorAPI = function (t, e, a) {
    debugger;
    var s = new XMLHttpRequest; s.onreadystatechange = function () {
        var t; s.readyState === XMLHttpRequest.DONE && (200 === (t = JSON.parse(s.responseText)).status ? e(t.data) : a(t.status, t.result))
    }, s.open("GET", "https://api.visitorapi.com/api/?pid=" + t), s.send(null)
};

function submitTrigger(inputData) {
    var flowUrl = "https://prod-191.westus.logic.azure.com:443/workflows/ac778d7c8ab344d48eed4ead5759714c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mG0UNau7YfS3BrUEQ-IkcJBSXuvZ2Ux0sX2zkxET0vM";

    var req = new XMLHttpRequest();
    req.open("POST", flowUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(inputData);
    alert("Your information has been submitted successfully. Our team shall get back to you in 1-2 business days");

    // Clear the form fields
    document.getElementById("contactform").reset();
}





