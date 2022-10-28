$(document).ready(function () {
    if(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(position[0])) {
        $("#listtitle").html("Here is a list of potential topics for an " + position + " interview: ")
    }
    else {
        $("#listtitle").html("Here is a list of potential topics for a " + position + " interview: ")
    }
    for (var i = 0; i < topics.length; i++) {
        $('#topic').append("<div>"+topics[i]+"</div>")
    }
    

    $('#topicq2').keypress(function (e) {
        if (e.which == 13) {
            submit()
        }
    });


    $("#q2").click(function(e) {
        e.preventDefault()
        submit()
    })


    function submit() {
        console.log("hello");
        $(".load").html("<img src = 'https://media4.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif'>")
        
        t = $('#topicq2').val().trim()
        $.ajax({
            type : "POST",
            url : '/question2',
            dataType: "json",
            data: JSON.stringify([t]),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log(result['q']);
                window.location.replace("/gptquestion");

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