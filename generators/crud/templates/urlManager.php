// Generated url manager
[
    'class' => 'yii\rest\UrlRule',
    'controller' => [
        '<%= controller %>'
    ],
    'prefix' => '<%= prefix %>',
    'tokens' => [
        '{advid}' => '<advid:\\d+>'
    ],
    'patterns' => [
        '<%= httpMethod %>' => '<%= method %>',
    ],
    'only' => [
        '<%= method %>'
    ],
    'pluralize' => '<%= pluralize %>',
]