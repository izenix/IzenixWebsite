//Franchise Submit Form Trigger Code
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    var ipAddress = "";
    var city = "";
    var country = "";
    var region = "";
    var osVersion = "";
    var cityLatLong = "";
    var browserVersion = "";

    VisitorAPI(
        "5Myl8uBF8lRCKvEZkNnP",
        function (data) {
            debugger;
            ipAddress = data.ipAddress;
            city = data.city;
            country = data.countryName;
            region = data.region;
            osVersion = data.os + "-" + data.osVersion;
            cityLatLong = data.cityLatLong;
            browserVersion = data.browser + "-" + data.browserVersion;

            // Fetch form values
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var email = document.getElementById("email").value;
            var phoneNumber = document.getElementById("phoneNumber").value;
            var zipCode = document.getElementById("zipCode").value;
            var additionalDetails = document.getElementById("additionalDetails").value;
            var mobileUpdatesChecked = document.getElementById("mobileUpdates").checked;
            var emailUpdatesChecked = document.getElementById("emailUpdates").checked;

            if (mobileUpdatesChecked) {
                mobileUpdatesChecked = true;
            } else {
                mobileUpdatesChecked = false;
            }

            if (emailUpdatesChecked) {
                emailUpdatesChecked = true;
            } else {
                emailUpdatesChecked = false;
            }



            // Create an object with form data
            var formData = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phoneNumber": phoneNumber,
                "zipCode": zipCode,
                "additionalDetails": additionalDetails,
                "ipAddress": ipAddress,
                "city": city,
                "country": country,
                "region": region,
                "osVersion": osVersion,
                "cityLatLong": cityLatLong,
                "browserVersion": browserVersion,
                "mobileUpdatesChecked": mobileUpdatesChecked,
                "emailUpdatesChecked": emailUpdatesChecked
            };

            // Convert object to JSON
            var inputData = JSON.stringify(formData);

            // Call the submitTrigger function with the form data
            submitTrigger(inputData);
            //console.log(data)
        },
        function (errorCode, errorMessage) {
            console.log(errorCode, errorMessage)
        }
    );


});

var VisitorAPI = function (t, e, a) {
    debugger;
    var s = new XMLHttpRequest; s.onreadystatechange = function () {
        var t; s.readyState === XMLHttpRequest.DONE && (200 === (t = JSON.parse(s.responseText)).status ? e(t.data) : a(t.status, t.result))
    }, s.open("GET", "https://api.visitorapi.com/api/?pid=" + t), s.send(null)
};

function submitTrigger(input) {
    var flowUrl = "https://prod-45.westus.logic.azure.com:443/workflows/00032b41c6214a5a83ddd5a80bc6b10d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=X3J-Mw62N-S0BeqHYVg2X9cNikjCfV_bvi6e2cEDoWw";

    var req = new XMLHttpRequest();
    req.open("POST", flowUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(input);
    alert("Your Information has been Submitted Successfully Our Team Shall Get back in 1-2 Bussiness Days");

    // Clear the form fields
    document.getElementById("contactForm").reset();
}

var onloadCallback = function () {
    alert("grecaptcha is ready!");
};




const form = document.querySelector("#contactForm"); // Use # to select by ID

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0) {
        throw new Error("Captcha not Complete");
    }

    const fd = new FormData(e.target);
    fd.append('g-recaptcha-response', captchaResponse); // Add captcha response to FormData

    fetch("https://izenix.com", {
        method: "POST",
        body: fd,
    })
        .then(res => res.json())
        .then(data => {
            if (data.captchaSuccess) {
                console.log("Validation Successful");
            } else {
                console.error("Validation failed");
            }
        })
        .catch(err => console.log(err));
});


const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Import fetch module
const app = express();
const port = 3000; // Set a valid port number

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post('/upload', function (req, res) {
    const params = new URLSearchParams({
        secret: '6LfuuC8pAAAAAGEzwHH4cwupUD1KYARjq5Dd3Upp',
        response: req.body['g-recaptcha-response'],
        remoteip: req.ip
    });

    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: "POST",
        body: params,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                res.json({ captchaSuccess: true });
            } else {
                res.json({ captchaSuccess: false });
            }
        })
        .catch(error => {
            console.error("Error verifying captcha:", error);
            res.json({ captchaSuccess: false });
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});