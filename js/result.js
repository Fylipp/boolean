$(function () {
    var result = JSON.parse(atob(getQueryArgument('r')));
    var quizLink = decodeURIComponent(getQueryArgument('ql'));

    $('#header-title').text(result.quizName);
    $("#quiz-link").attr('href', quizLink);
    $('#result-score').text(result.score);
    $('#result-total').text(result.total);
});
