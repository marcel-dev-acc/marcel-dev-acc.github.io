/* Game code here */
const baseUrl = 'http://127.0.0.1:5500';
const htmlFolder = '/js-legacy-war/assets/html/';

function loadWelcome() {
    $(document).ready(function(){
        loadHtml(baseUrl+htmlFolder+'welcome.html');
        /* For development you will want to re-route to relevant html page */
        loadHtml(baseUrl+htmlFolder+'choose-civilisation.html');
    });
}

function loadHtml(path) {
    $.get(path,
        { '_': $.now() } // Prevents caching
    ).done(function(data) {
        // Here's the HTML
        var html = data;
        rendHtml(html);
    }).fail(function(jqXHR, textStatus) {
        // Handle errors here
    });
}

function rendHtml(html) {
    $('#root').html(html);
}

function loadCivilisations() {
    $(document).ready(function(){
        loadHtml(baseUrl+htmlFolder+'choose-civilisation.html');
    });
}