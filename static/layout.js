function checkSearch(input) {
    let val = true
    if (input == ""){
        val = false
    }
    else if (input.replace(/\s+/g, "").length == 0) {
        val = false
    }

    return val
}
$(document).ready(function(){
    $( "#target" ).submit(function( event ) {
        let input = $("#input").val()
        console.log(input)
        if (checkSearch(input)) {
            window.location.replace("/search/"+input)
            event.preventDefault();
        }
        else {
            $("#input").focus();
            $("#input").val("");
            event.preventDefault();
        }
    });
});
