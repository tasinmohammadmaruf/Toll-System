let recordId = 1;
let totalVehicles = 0;
let totalCollection = 0;

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

function addRecord() {
    let vehicleNumber = document.getElementById("vehicleNumber").value;
    let vehicleType = document.getElementById("vehicleType").value;

    if (vehicleNumber == "" || vehicleType == "") {
        alert("Please enter vehicle number and select vehicle type");
        return;
    }

    let fee = getFee(vehicleType);
    let now = new Date();

    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    let table = document.getElementById("recordTable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = recordId;
    row.insertCell(1).innerHTML = vehicleNumber;
    row.insertCell(2).innerHTML = vehicleType;
    row.insertCell(3).innerHTML = fee + " Tk";
    row.insertCell(4).innerHTML = date;
    row.insertCell(5).innerHTML = time;

    totalVehicles++;
    totalCollection = totalCollection + fee;

    document.getElementById("totalVehicles").innerHTML = totalVehicles;
    document.getElementById("totalAmount").innerHTML = totalCollection + " Tk";

    document.getElementById("lastReceipt").innerHTML =
        "Record ID: " + recordId + "<br>" +
        "Vehicle Number: " + vehicleNumber + "<br>" +
        "Vehicle Type: " + vehicleType + "<br>" +
        "Toll Fee: " + fee + " Tk<br>" +
        "Date: " + date + "<br>" +
        "Time: " + time;

    recordId++;

    document.getElementById("vehicleNumber").value = "";
    document.getElementById("vehicleType").value = "";
}