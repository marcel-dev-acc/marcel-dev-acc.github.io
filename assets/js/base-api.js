var BASE_URL = 'http://127.0.0.1:8000';
//var BASE_URL = '';

async function api_call_general(path, headers, method, payload) {
    var url = BASE_URL+path;
    var headings = {};
    for (var header in headers) {
        if (headers[header]) {
            headings[header] = headers[header];
        }
    }
    var requestOptions = {
        headers: headings,
        method: method,
        redirect: 'follow'
    };
    if (method != 'GET') {
        requestOptions['body'] = JSON.stringify(payload);
    }
    var response = await fetch(url, requestOptions);
    var json_response = await response.json();
    return {
        'status': response.status, 
        'response': json_response
    };
}

async function api_call_specific(path, headers, method, payload) {
    var url = path;
    var headings = {};
    for (var header in headers) {
        if (headers[header]) {
            headings[header] = headers[header];
        }
    }
    var requestOptions = {
        headers: headings,
        method: method,
        redirect: 'follow'
    };
    if (method != 'GET') {
        requestOptions['body'] = JSON.stringify(payload);
    }
    var response = await fetch(url, requestOptions);
    var json_response = await response.json();
    return {
        'status': response.status, 
        'response': json_response
    };
}

function validate_target(id) {
    if (document.getElementById(id).value.length == 0) {
        var class_list = document.getElementById(id).className;
        if (class_list.indexOf('is-invalid') == -1) {
            document.getElementById(id).className = (
                class_list
                +' is-invalid'
            );
        }
        return true;
    }
    return false;
}

async function index_page_test_api() {
    var path = '/api/status';
    var headers = {};
    var method = 'GET';
    var payload = {};
    /* For simplifying page */
    try {
        /* Execute API */
        var response = await api_call_general(
            path, 
            headers, 
            method,
            payload
        );
        if (response['status'] == 200) {
        } else {}
        console.log(response['status']);
        console.log(response['response']);
    } catch(e) {
        console.log(e);
    }
}

async function get_chuck_norris_jokes() {
    var path = 'http://api.icndb.com/jokes/random/10';
    var headers = {};
    var method = 'GET';
    var payload = {};
    /* For simplifying page */
    try {
        /* Execute API */
        var response1 = await api_call_specific(
            path, 
            headers, 
            method,
            payload
        );
        if (response1['status'] == 200) {
            var jokes_list1 = response1['response']['value'];
            var response2 = await api_call_specific(
                path, 
                headers, 
                method,
                payload
            );
            if (response2['status'] == 200) {
                $(document).ready(function(){
                    var jokes_list2 = response2['response']['value'];
                    $('#rolling-jokes').html('');
                    $('#rolling-jokes').append(
                        '<h4 class="text-center mb-4">Good old Chuck Norris Jokes</h4>'
                    );
                    
                    for (var i = 0; i < jokes_list1.length; i++) {
                        $('#rolling-jokes').append(
                            '<p class="text-justify"><i>Joke ' + (i + 1).toString() + '</i>: <b>' + jokes_list1[i]['joke'] + '</b></p>'
                        );
                    }
                    for (var i = 0; i < jokes_list2.length; i++) {
                        $('#rolling-jokes').append(
                            '<p class="text-justify"><i>Joke ' + (i + 11).toString() + '</i>: <b>' + jokes_list2[i]['joke'] + '</b></p>'
                        );
                    }
                    $('#rolling-jokes').append(
                        '<div class="my-3"><button onclick="get_chuck_norris_jokes();" class="btn btn-primary">Refresh</button></div>'
                    );
                });
            }
            
        } else {}
        // console.log(response['status']);
        // console.log(response['response']);
    } catch(e) {
        console.log(e);
    }
}