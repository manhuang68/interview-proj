$(document).ready(function () {
    console.log(editresponse)
    $('#editresp').append("<div>"+editresponse+"</div>");

    $("#restbutton").click(function(e) {
        window.location.replace("/");
        e.preventDefault()
    })
});