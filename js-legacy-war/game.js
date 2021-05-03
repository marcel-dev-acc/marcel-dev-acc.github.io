/* Game code here */
const baseUrl = 'http://127.0.0.1:5500';
const htmlFolder = '/js-legacy-war/assets/html/';

function main() {
    $(document).ready(function(){
        /* Code Snippets below */

        loadHtml(baseUrl+htmlFolder+'welcome.html');
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