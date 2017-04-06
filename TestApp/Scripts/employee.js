/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.nama + '</td>';
                html += '<td>' + item.status + '</td>';
                html += '<td>' + item.airport + '</td>';
                html += '<td>' + item.company + '</td>';
                html += '<td>' + item.tgl_daftar + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var empObj = {
        id: $('#id').val(),
        nama: $('#nama').val(),
        status: $('#status').val(),
        airport: $('#airport').val(),
        company: $('#company').val(),
        tgl_daftar: $('#tgl_daftar').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#nama').css('border-color', 'lightgrey');
    $('#status').css('border-color', 'lightgrey');
    $('#airport').css('border-color', 'lightgrey');
    $('#company').css('border-color', 'lightgrey');
    $('#tgl_daftar').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#nama').val(result.nama);
            $('#status').val(result.status);
            $('#airport').val(result.airport);
            $('#company').val(result.company);
            $('#tgl_daftar').val(result.tgl_daftar);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var empObj = {
        id: $('#id').val(),
        nama: $('#nama').val(),
        status: $('#status').val(),
        airport: $('#airport').val(),
        company: $('#company').val(),
        tgl_daftar: $('#tgl_daftar').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#id').val("");
            $('#nama').val("");
            $('#status').val("");
            $('#airport').val("");
            $('#company').val("");
            $('#tgl_daftar').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#barcode').val("");
    $('#nama').val("");
    $('#status').val("");
    $('#airport').val("");
    $('#company').val("");
    $('#tgl_daftar').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#nama').css('border-color', 'lightgrey');
    $('#status').css('border-color', 'lightgrey');
    $('#airport').css('border-color', 'lightgrey');
    $('#company').css('border-color', 'lightgrey');
    $('#tgl_daftar').css('border-color', 'lightgrey');
    $('#barcode').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#nama').val().trim() == "") {
        $('#nama').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#nama').css('border-color', 'lightgrey');
    }
    if ($('#status').val().trim() == "") {
        $('#status').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#status').css('border-color', 'lightgrey');
    }
    if ($('#airport').val().trim() == "") {
        $('#airport').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#airport').css('border-color', 'lightgrey');
    }
    if ($('#company').val().trim() == "") {
        $('#company').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#company').css('border-color', 'lightgrey');
    }
    if ($('#tgl_daftar').val().trim() == "") {
        $('#tgl_daftar').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#tgl_daftar').css('border-color', 'lightgrey');
    }   
    return isValid;
}