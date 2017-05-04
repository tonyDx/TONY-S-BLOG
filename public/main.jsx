// main.js
var update = document.getElementById('update');
var name1 = document.getElementById('name1');
var name2 = document.getElementById('name2');


update.addEventListener('click', function () {
    // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name1': name1.value,
            'name2': name2.value,
            'quote': '哈哈哈，更改成功'
        })
    }).then(function (res) {
        if (res.ok) return res.json()
    }).then(function (data) {
        console.log(data);
        window.location.reload();
    })
});

var del = document.getElementById('delete');
var del_input = document.getElementById('del_input');

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': del_input.value
        })
    }).then(function (res) {
        window.location.reload();
    })
});