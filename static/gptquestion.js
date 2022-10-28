$(document).ready(function () {



    $('#keywords').keypress(function (e) {
        if (e.which == 13) {
            submit()
        }
    });


    $('#keywords').keypress(function (e) {
        if (e.which == 13) {
            submit()
        }
    });


    $("#q3").click(function(e) {
        e.preventDefault()
        submit()
    })

    function submit() {
        console.log("hello");
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
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
    }
});