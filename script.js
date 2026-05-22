let records = [];
let deletedCount = 0;

window.onload = function () {
    checkLogin();
    loadRecords();
    loadDeletedCount();
};

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let error = document.getElementById("loginError");

    error.innerHTML = "";

    if (email == "" || password == "") {
        error.innerHTML = "Please fill all fields";
        return;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        error.innerHTML = "Please enter valid email";
        return;
    }

    if (password.length < 4) {
        error.innerHTML = "Password must be at least 4 characters";
        return;
    }

    localStorage.setItem("login", "yes");

    alert("Login successful");

    checkLogin();
}

function checkLogin() {
    let login = localStorage.getItem("login");

    if (login == "yes") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block";
    } else {
        document.getElementById("loginBox").style.display = "block";
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("logoutBtn").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("login");

    alert("Logout successful");

    checkLogin();
}

function getFee(type) {
    if (type == "Bike") {
        return 20;
    } else if (type == "Small Van") {
        return 20;
    } else if (type == "Car / Private Car") {
        return 50;
    } else if (type == "Bus / Micro Bus") {
        return 100;
    } else if (type == "Truck") {
        return 150;
    } else if (type == "Other / Undetected Vehicle") {
        return 70;
    } else {
        return 0;
    }
}

function saveRecord(event) {
    event.preventDefault();

    let editIndex = document.getElementById("editIndex").value;

    let vehicleNumber = document.getElementById("vehicleNumber").value.trim();

    let vehicleType = document.getElementById("vehicleType").value;

    let payment = document.querySelector('input[name="payment"]:checked');

    let fastLane = document.getElementById("fastLane").checked;

    let heavyLoad = document.getElementById("heavyLoad").checked;

    let error = document.getElementById("formError");

    let success = document.getElementById("successMsg");

    error.innerHTML = "";
    success.innerHTML = "";

    if (vehicleNumber == "" || vehicleType == "") {
        error.innerHTML = "Please fill all fields";
        return;
    }

    if (payment == null) {
        error.innerHTML = "Please select payment method";
        return;
    }

    let fee = getFee(vehicleType);

    if (fastLane) {
        fee = fee + 10;
    }

    if (heavyLoad) {
        fee = fee + 20;
    }

    let extra = "";

    if (fastLane) {
        extra = extra + "Fast Lane ";
    }

    if (heavyLoad) {
        extra = extra + "Heavy Load";
    }

    if (extra == "") {
        extra = "None";
    }

    let now = new Date();

    let record = {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
        fee: fee,
        payment: payment.value,
        extra: extra,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    if (editIndex == "") {
        records.push(record);

        success.innerHTML = "Record added successfully";

        alert("Record added successfully");
    } else {
        records[editIndex] = record;

        success.innerHTML = "Record updated successfully";

        document.getElementById("formTitle").innerHTML = "Add Toll Record";

        alert("Record updated successfully");
    }

    localStorage.setItem("records", JSON.stringify(records));

    showReceipt(record);

    clearForm();

    displayRecords();
}

function loadRecords() {
    let data = localStorage.getItem("records");

    if (data != null) {
        records = JSON.parse(data);
    }

    displayRecords();
}

function displayRecords() {
    let table = document.getElementById("recordTable");

    table.innerHTML = "";

    let totalAmount = 0;

    for (let i = 0; i < records.length; i++) {

        totalAmount = totalAmount + records[i].fee;

        let row = table.insertRow();

        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = records[i].vehicleNumber;
        row.insertCell(2).innerHTML = records[i].vehicleType;
        row.insertCell(3).innerHTML = records[i].fee + " Tk";
        row.insertCell(4).innerHTML = records[i].payment;
        row.insertCell(5).innerHTML = records[i].extra;
        row.insertCell(6).innerHTML = records[i].date;
        row.insertCell(7).innerHTML = records[i].time;

        row.insertCell(8).innerHTML =
            '<button class="edit-btn" onclick="editRecord(' + i + ')">Edit</button>' +
            '<button class="delete-btn" onclick="deleteRecord(' + i + ')">Delete</button>';
    }

    document.getElementById("totalVehicles").innerHTML = records.length;

    document.getElementById("totalAmount").innerHTML = totalAmount + " Tk";
}

function editRecord(index) {

    document.getElementById("editIndex").value = index;

    document.getElementById("vehicleNumber").value = records[index].vehicleNumber;

    document.getElementById("vehicleType").value = records[index].vehicleType;

    document.getElementById("formTitle").innerHTML = "Update Toll Record";

    let payments = document.getElementsByName("payment");

    for (let i = 0; i < payments.length; i++) {

        if (payments[i].value == records[index].payment) {
            payments[i].checked = true;
        }
    }

    document.getElementById("fastLane").checked =
        records[index].extra.indexOf("Fast Lane") != -1;

    document.getElementById("heavyLoad").checked =
        records[index].extra.indexOf("Heavy Load") != -1;

    document.getElementById("add").scrollIntoView();
}

function deleteRecord(index) {

    let result = confirm("Do you want to delete this record?");

    if (result) {

        records.splice(index, 1);

        deletedCount++;

        localStorage.setItem("records", JSON.stringify(records));

        localStorage.setItem("deletedCount", deletedCount);

        document.getElementById("deletedCount").innerHTML = deletedCount;

        displayRecords();

        alert("Record deleted successfully");
    }
}

function loadDeletedCount() {

    let data = localStorage.getItem("deletedCount");

    if (data != null) {
        deletedCount = Number(data);
    }

    document.getElementById("deletedCount").innerHTML = deletedCount;
}

function showReceipt(record) {

    document.getElementById("lastReceipt").innerHTML =

        "Vehicle Number: " + record.vehicleNumber + "<br>" +

        "Vehicle Type: " + record.vehicleType + "<br>" +

        "Fee: " + record.fee + " Tk<br>" +

        "Payment: " + record.payment + "<br>" +

        "Extra: " + record.extra + "<br>" +

        "Date: " + record.date + "<br>" +

        "Time: " + record.time;
}

function clearForm() {

    document.getElementById("editIndex").value = "";

    document.getElementById("vehicleNumber").value = "";

    document.getElementById("vehicleType").value = "";

    document.getElementById("fastLane").checked = false;

    document.getElementById("heavyLoad").checked = false;

    let payments = document.getElementsByName("payment");

    for (let i = 0; i < payments.length; i++) {
        payments[i].checked = false;
    }
}

function toggleTable() {

    let table = document.getElementById("recordTableBox");

    if (table.style.display == "none") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}

function toggleMode() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        document.getElementById("modeBtn").innerHTML = "Light";
    } else {
        document.getElementById("modeBtn").innerHTML = "Dark";
    }
}

function changeText() {

    let text = document.getElementById("welcomeText");

    text.innerHTML = "This project helps to manage toll records easily.";

    text.style.color = "#007bff";

    text.style.fontSize = "20px";
}
