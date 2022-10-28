$(document).ready(function () {
    console.log(responsetoq)
    $('#resp').append("<div>"+responsetoq+"</div>");

    $("#q4").click(function(e) {
        console.log("hello");
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
        e.preventDefault()
        editkeys = $('#keywsq4').val().trim()
        if(editkeys == "no") {
            window.location.replace("/noeditresponsepage");
        }
        $.ajax({
            type : "POST",
            url : '/question4',
            dataType: "json",
            data: JSON.stringify([editkeys]),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log(result['editres']);
                window.location.replace("/editresponsepage");

            },
            error: function(request, status, error) {
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    })
});
