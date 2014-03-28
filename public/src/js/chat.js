$(function() {
    // connect
    var socket = io.connect();
    console.log("connected", socket);
    // 入室
    var $posts = $('div#posts');
    socket.on('login', function(data) {
        console.log('Login');
        $posts.prepend('<div class="alert alert-info mB0">' + data + 'さんが入室しました.</div>');
    });
    // 退室
    socket.on('logout', function(data) {
        console.log("Logout");
        $posts.prepend('<div class="alert alert-warning mB0">' + data + 'さんが退室しました.</div>');
    });
    // コメント
    var $message = $('#message');
    $('#update').on('click', function(e) {
        if ($message.val().length === 0) return;
        socket.emit('post', $message.val());
        $message.val('');
    });
    socket.on('post', function(data) {
        console.log(data);
        $posts.prepend('<div class="alert alert-success mB0">' + data.id + 'さんのコメント: ' + data.post + '</div>');
    });
});