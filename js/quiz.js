$(function () {
    var statementsString = getQueryArgument('q');
    var statements = convert(JSON.parse(atob(statementsString)));

    var statementIndex = 0;

    var answers = [];

    var txtStatement = $('#statement');

    $('#btn-false').click(function () {
        submit(false);
    });

    $('#btn-true').click(function () {
        submit(true);
    });

    showStatement();

    function submit(response) {
        var statement = statements[statementIndex];
        statement.correct = response === statement.answer;

        if (statementIndex === statements.length - 1) {
            alert('You answered ' + statements.filter(function (q) {
                return q.correct;
            }).length + ' of ' + statements.length + ' question correctly');
        } else {
            statementIndex++;
            showStatement();
        }
    }

    function showStatement() {
        txtStatement.text(statements[statementIndex].statement);
    }
});

function getQueryArgument(queryParameter) {
    var re = new RegExp('(?:\\?|&)' + encodeURIComponent(queryParameter) + '=([^&]*)');
    var match = re.exec(window.location.search);

    return (!match || match.length === 0) ? undefined : match[match.length - 1];
}

function convert(raw) {
    var statements = [];

    for (var i = 0; i < raw.length; i++) {
        var q = raw[i];

        statements.push({
            statement: q[0],
            answer: q[1]
        });
    }

    return statements;
}