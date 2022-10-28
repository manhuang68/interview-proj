$(document).ready(function () {
    if(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(position[0])) {
        $("#listtitle").html("Here is the most asked multi-part question related to " + topic + " for an " + position + " interview: ")
    }
    else {
        $("#listtitle").html("Here is the most asked multi-part question related to " + topic + " for a " + position + " interview: ")
    }
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