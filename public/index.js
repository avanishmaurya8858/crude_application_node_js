 dataForTable();
function submitdata() {
    var FIRSTNAME = document.getElementById("firstname").value
    var LASTNAME = document.getElementById("lastname").value
    var EMAIL = document.getElementById("email").value
    var ADDRESS = document.getElementById("address").value


    var jsonobj = {};
    jsonobj["FIRSTNAME"] = FIRSTNAME
    jsonobj["LASTNAME"] = LASTNAME
    jsonobj["EMAIL"] = EMAIL
    jsonobj["ADDRESS"] = ADDRESS
    console.log(jsonobj)

    $.ajax({
        "url": "/mat/create",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(jsonobj)
    })
    dataForTable();
}
function dataForTable() {

    let tableData = document.getElementById('tableData')
    $.ajax({
        "url": "/mat/dataForTable",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "authorization": "Bearer " + sessionStorage.getItem("authToken")
        }
    }).done(function (data) {
        console.log(data);
        document.getElementById('tableData').innerHTML = ''
        for (let i = 0; i < data.length; i++) {

            var td1 = document.createElement("td");
            td1.innerHTML = data[i].FIRSTNAME

            var td2 = document.createElement("td");
            td2.innerHTML = data[i].LASTNAME

            var td3 = document.createElement("td");
            td3.innerHTML = data[i].EMAIL

            var td4 = document.createElement("td");
            td4.innerHTML = data[i].ADDRESS

            var td5 = document.createElement("td");
            td5.innerHTML = `<button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editForm('${data[i].EMAIL}')">Edit</button>`

            // var td6 = document.createElement("td");
            // td6.innerHTML = `<button data-bs-toggle="modal"  onclick="deleteForm('${data[i].email}')">DELETE </button>`


            var tr = document.createElement("tr");

            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            // tr.append(td6);

            document.getElementById('tableData').append(tr)

        }
    })

}

function editForm(EMAIL) {
    sessionStorage.setItem("reqid", EMAIL);
    //alert("tdasz")
    var jsonobj = {}
    jsonobj["EMAIL"] = EMAIL
    $.ajax({
        "url": "/mat/getByID",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(jsonobj)
    }).done(function (data) {
        $("#editfirstname").val(data[0].FIRSTNAME);
        $("#editlastname").val(data[0].LASTNAME);
        $("#editemail").val(data[0].EMAIL);
        $("#editaddress").val(data[0].ADDRESS);
    })
}

function submitFormEdit() {
    //let reqid = sessionStorage.getItem("reqid");
    var FIRSTNAME = document.getElementById("editfirstname").value
    var LASTNAME = document.getElementById("editlastname").value
    var EMAIL = document.getElementById("editemail").value
    var ADDRESS = document.getElementById("editaddress").value

    //var jsonobj = {}
    //jsonobj["EMAIL"] = reqid
    var jsonobj = {};
    jsonobj["FIRSTNAME"] = FIRSTNAME
    jsonobj["LASTNAME"] = LASTNAME
    jsonobj["EMAIL"] = EMAIL
    jsonobj["ADDRESS"] = ADDRESS
    console.log(jsonobj)

    $.ajax({
        "url": "/mat/updateByID",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(jsonobj)
    }).done(function (data) {
        if (data.status == 200) {
            alert('Update Success')
            dataForTable();
        }
    })
}


function deleteForm() {
    //sessionStorage.setItem("reqid", email)
    console.log("ok ")
    var FIRSTNAME = document.getElementById("FIRSTNAME").value
    var jsonobj = {};
    jsonobj["FIRSTNAME"] = FIRSTNAME
    $.ajax({
        "url": "/mat/deleteForm",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(jsonobj)
    }).done(function (data) {
        if (data.status == 200) {
            alert('delete Success')
            dataForTable();
        }
    })
    
}




