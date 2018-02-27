// Generated url manager
[
    'class' => 'yii\rest\UrlRule',
    'controller' => [
        '<%= controller %>'
    ],
    <% if (prefix) { %>
    'prefix' => [
        '{advid}' => '<advid:\\d+>'
    ],
    <% } %>
    'patterns' => [
        'GET' => 'index',
    ],
    'only' => [
        'index'
    ],
    'pluralize' => <%= pluralize %>,
]