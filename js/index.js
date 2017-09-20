var list;

$(function () {
    list = $('#questions');
    addQuestion(false);
});

function toggleButton(button) {
    button = $(button);
    var value = button.hasClass('true');

    if (value) {
        button.removeClass('true');
        button.addClass('false');
        button.text('False');
    } else {
        button.removeClass('false');
        button.addClass('true');
        button.text('True');
    }
}

function removeQuestion(questionItem) {
    questionItem.remove();

    if (list.children.length !== 0) {
        return;
        var elements = list.children[list.children.length - 1].children;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];

            if (el.prop('tagName') === 'INPUT') {
                el.focus();
                break;
            }
        }
    }
}

function addQuestion(removeable) {
    var item = $('<li></li>');
    item.addClass('question');

    var question = $('<input></input>');
    question.attr('placeholder', 'Enter your statement here...');

    var btnTrueFalseToggle = $('<button></button>');
    btnTrueFalseToggle.click(function () {
        toggleButton(btnTrueFalseToggle);
    });
    btnTrueFalseToggle.addClass('true');
    btnTrueFalseToggle.text('True');

    if (removeable) {
        var btnRemove = $('<a></a>');
        btnRemove.addClass('btn-remove');
        btnRemove.click(function () {
            removeQuestion(item);
        });
        var btnRemoveText = $('<i></i>');
        btnRemoveText.addClass('material-icons');
        btnRemoveText.text('delete');
        btnRemove.append(btnRemoveText);

        item.append(btnRemove);
    }

    item.append(question);
    item.append(btnTrueFalseToggle);

    list.append(item);

    return {
        giveFocus: function () {
            question.focus();
        }
    }
}

function done() {
    var questions = [];

    list.children().each(function (i, item) {
        item = $(item);

        var question = $(item).children('input').val().trim();
        var answer = item.children('button').text() === 'True';

        if (question.length !== 0) {
            questions.push([question, answer]);
        }
    });

    if (questions.length === 0) {
        $('#modal-error').modal();
    } else {
        var path = '/quiz.html?q=' + btoa(JSON.stringify(questions));
        var longLink = window.location.host + path;

        console.log("Window.location.host: " + window.location.host);
        console.log("path: " + path);

        shortenURL(longLink, function(url) {
            if(url != null){
                $('#text-done').text(url);
                $('#text-done').attr('href', url);
                $('#modal-done').modal();
            }
            else{
                $('#modal-error').modal();
            }
        });
    }
}