$(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        $('hr').show();
        var userInput = $(event.target).children('[type=text]').val();
        getRequest(userInput);
        $('.search-box').val('').focus();

    })
});

function getRequest(query) {
    var params = {
        part: 'snippet',
        q: query,
        maxResults: 10,
        type: 'video',
        eventType: 'live',
        key: 'AIzaSyDuJn991RJ55MWCO8Uv5HPkzH0-iqp3ups'
    }
    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function(data) {
        // displayResults(data.items.title);
        displayResults(data.items);
    });
}

function displayResults (data) {
    var html = "";
    $.each(data, function (i, item) {
        var videoTitle = item.snippet.title;
        var videoId = item.id.videoId;
        // console.log(videoTitle);
        // console.log(videoId);

        html += "<li><p><span>" + videoTitle + "</span></p><iframe width='200px' src='https://www.youtube.com/embed/" + videoId + "'allowfullscreen></iframe></li>";
        // $('#search-results ul').prepend("<li><p><span>" + videoTitle + "</span></p></li>");
    });
    $('#search-results ul').html(html);
}