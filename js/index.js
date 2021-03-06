var list;
var quizName;

$(function () {
    list = $('#questions');
    quizName = $('#quiz-name');
    addQuestion();
});

function toggleButton(button, item) {
    button = $(button);
    var value = button.hasClass('true');

    if (value) {
        button.removeClass('true');
        button.addClass('false');
        button.text('False');
        item.attr('data-toggle', '0');
    } else {
        button.removeClass('false');
        button.addClass('true');
        button.text('True');
        item.attr('data-toggle', '1');
    }
}

function addQuestion() {
    var item = $('<li></li>');
    item.attr('data-toggle', '1');
    item.addClass('question');

    var question = $('<input/>');
    question.keyup(function () {
        if (question.val().trim().length === 0 && list.children().length > 1) {
            if (!item.is(':last-child')) {
                list.children(':last-child').remove();
            }
        }
    });
    question.keyup(function () {
        if (question.val().length !== 0 && item.is(':last-child')) {
            addQuestion();
        }
    });
    question.attr('placeholder', 'Enter your statement here...');

    var btnTrueFalseToggle = $('<button></button>');
    btnTrueFalseToggle.addClass('btn-toggle');
    btnTrueFalseToggle.click(function () {
        toggleButton(btnTrueFalseToggle, item);
    });
    btnTrueFalseToggle.addClass('true');
    btnTrueFalseToggle.text('True');

    item.append(question);
    item.append(btnTrueFalseToggle);

    list.append(item);
}

function done() {
    var quiz = [];

    var name = quizName.val().trim();

    if (name.length > 20) {
        error('Your quiz name must be 20 characters at most.');
        return;
    }

    if (name.length === 0) {
        error('Your quiz must have a name.');
        return;
    }

    quiz.push(name);

    list.children().each(function (i, item) {
        item = $(item);

        if (item.children('button').hasClass('btn-toggle')) {
            var question = $(item).children('input').val().trim();
            var answer = item.children('button').hasClass('true');

            if (question.length !== 0) {
                quiz.push([question, answer]);
            }
        }
    });

    if (quiz.length <= 1) {
        error('Your quiz does not contain any statements.');        
    } else {
        var path = '/quiz.html?q=' + btoa(JSON.stringify(quiz));
        var longLink = window.location.href + path;

        shortenURL(longLink, function (url) {
            if (url !== null) {
                $('#text-done').text(url).attr('href', url);
                $('#modal-done').modal();
            } else {
                error('Your quiz could not be created do to an issue with the goo.gl service.');                
            }
        });
    }
}

function error(text) {
    $('#modal-error-text').text(text);
    $('#modal-error').modal();
}
