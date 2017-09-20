const urlShortenerKey = config.GUSKey;

function shortenURL(/* string */ url, callback){
    $.ajax({
        method: 'POST',
        url: 'https://www.googleapis.com/urlshortener/v1/url?key=' + urlShortenerKey,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ "longUrl": url }),
        success: function(result){
            let jsonResult = result.id
            if(callback) callback(jsonResult);
        },
        error: function(error){
            console.error(error)
            if(callback) callback(null);
        }
    });
}