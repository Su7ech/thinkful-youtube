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
        type: 'video',
        key: 'AIzaSyDuJn991RJ55MWCO8Uv5HPkzH0-iqp3ups'
    }
    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function(data) {
        // displayResults(data.items.title);
        console.log(data.items);
        displayResults(data.items);
    });
}

function displayResults (data) {
    var html = "";
    $.each(data, function (i, item) {
        var videoTitle = item.snippet.title;
        var desc = item.snippet.description;
        var videoId = item.id.videoId;
        var vidThumbnail = item.snippet.thumbnails.medium.url;
        // console.log(videoTitle);
        // console.log(videoId);
        console.log(vidThumbnail);
        html += "<li class='clearfix'><h4>" + videoTitle + "</h4><a href='https://youtu.be/" + videoId + "' target='_blank'><img src='" + vidThumbnail + "'/></a><p>" + desc + "</p></li>";

        // <h4>" + videoTitle + "</h4>
        // $('#search-results ul').prepend("<li><p><span>" + videoTitle + "</span></p></li>");
    });
    $('#search-results ul').html(html);
}