

function save() {
    // Get form elements
    var title = document.getElementById("title").value;
    var votType = document.querySelector('input[name="vot-type"]:checked').value;
    var numCan = document.getElementById("numCan").value;
    var candidatesArray = [];
    var voteData = [];

    for (let i = 1; i <= numCan; i++) {
        var candidateName = document.getElementById("candidate" + i).value;
        console.log(document.getElementById("candidate" + i).value);
        candidatesArray.push(candidateName);
        voteData.push(0);
        
    }

    // Create an object to store form data
    var formData = {
        title: title,
        votType: votType,
        candidates: candidatesArray
        //numCan: numCan
        // Add more properties for additional form fields if needed
    };

    // Convert the object to a JSON string
    var formDataJSON = JSON.stringify(formData);

    // Store the JSON string in local storage
    localStorage.setItem("formData", formDataJSON);
    localStorage.setItem("voteData",voteData);
}

// Add a submit event listener to the form
document.getElementById("submit").addEventListener("click", save);
