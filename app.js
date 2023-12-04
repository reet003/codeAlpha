app.js

document.addEventListener('DOMContentLoaded', function () {
    // Initialize CodeMirror with the codeEditor div
    var editor = CodeMirror(document.getElementById('codeEditor'), {
        value: 'function helloWorld() {\n\tconsole.log("Hello, world!");\n}',
        mode: 'javascript',
        lineNumbers: true,
        theme: 'default'
    });

    // Connect to the Socket.IO server
    var socket = io.connect('http://your-backend-server');

    // Listen for changes from other users and update the editor
    socket.on('codeChange', function (newCode) {
        editor.setValue(newCode);
    });

    // Listen for local code changes and broadcast them to other users
    editor.on('change', function (instance, changeObj) {
        var newCode = editor.getValue();
        socket.emit('codeChange', newCode);
});