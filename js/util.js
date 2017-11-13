const urlShortenerKey = config.GUSKey;

function shortenURL(/* string */ url, callback){
    $.ajax({
        method: 'POST',
        url: 'https://www.googleapis.com/urlshortener/v1/url?key=' + urlShortenerKey,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ "longUrl": url }),
        success: function(result){
            var jsonResult = result.id;
            if(callback) callback(jsonResult);
        },
        error: function(error){
            console.error(error);
            if(callback) callback(null);
        }
    });
}

function getQueryArgument(queryParameter) {
    var re = new RegExp('(?:\\?|&)' + encodeURIComponent(queryParameter) + '=([^&]*)');
    var match = re.exec(window.location.search);

    return (!match || match.length === 0) ? undefined : match[match.length - 1];
}
