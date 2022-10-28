$(document).ready(function () {
    console.log(responsetoq)
    $('#noeditresp').append("<div>"+responsetoq+"</div>");

    $("#restbutton").click(function(e) {
        window.location.replace("/");
        e.preventDefault()
    })
});
