$(document).ready(function(){
    $("#q1").click(function(e) {
        console.log("hello");
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
        e.preventDefault()
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
    })
});