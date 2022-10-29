$(document).ready(function(){


    $('#pos').keypress(function (e) {
        if (e.which == 13) {
            submit()
        }
    });


    $("#q1").click(function(e) {
        e.preventDefault()
        submit()
    })

    function submit() {
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
        position = $('#pos').val().trim()
        $.ajax({
            type : "POST",
            url : '/question1',
            dataType: "json",
            data: JSON.stringify([position]),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log(result['topics']);
                window.location.replace("/topics");

            },
            error: function(request, status, error) {
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        
    } //end submit function


});