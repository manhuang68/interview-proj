$(document).ready(function () {
    $('#quest').append("<div>"+question+"</div>")

    $("#q3").click(function(e) {
        console.log("hello");
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
        e.preventDefault()
        keys = $('#keywords').val().trim()
        $.ajax({
            type : "POST",
            url : '/question3',
            dataType: "json",
            data: JSON.stringify([keys]),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log(result['res']);
                window.location.replace("/responsepage");

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