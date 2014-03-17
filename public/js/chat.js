$(function() {
    // connect
    var socket = io.connect();
    console.log("connected", socket);
    // print joined
    var $posts = $('ul#posts');
    socket.on('login', function(data) {
        $posts.prepend('<li>' + data + 'さんが入室しました.</li>');
    });
    // print post data
    var $message = $('input#message');
    $('input#update').on('click', function(e) {
        if ($message.val().length === 0) return;
        socket.emit('post', $message.val());
        $message.val('');
    });
    socket.on('post', function(data) {
        console.log(data);
        $posts.prepend('<li>' + data.id + 'さんのコメント: ' + data.post + '</li>');
    });
});