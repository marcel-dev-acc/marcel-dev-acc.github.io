function show_entry_screen() {
    $(document).ready(function(){
        $("#loading").slideDown(1000);
        $('#welcome-notification').delay(1000).fadeIn(1000);
    });
}

function toggle_welcome_to_main() {
    $(document).ready(function(){
        $('#loading').fadeOut(1000);
        $('#main').delay(1000).fadeIn(2000);
    });
}