const menu = require('readline');

var givenmenu = menu.createInterface({
    input: process.stdin,
    output: process.stdout
});

var arr = ['ULYSSES', 'THE GREAT GATSBY', 'LOLITA', 'BRAVE NEW WORLD', 'CATCH-22']

const EventEmitter = require('events');
var eventemitter = new EventEmitter();

eventemitter.on('book', function (el) {
    // var arr = ['ULYSSES', 'THE GREAT GATSBY', 'LOLITA', 'BRAVE NEW WORLD', 'CATCH-22']
    if (el != undefined) {
        arr.push(el);
    }
    console.log(arr);
})

var showmenu = `press 1 - Show all books
press 2 - Add a new book
press 3 - Quit
`
show();

function show() {
    givenmenu.question(`${showmenu}`, function (num) {
        if (num == 1) {
            arr.forEach(function (el) {
                console.log(el);
            })
            show();
        }
        if (num == 2) {
            givenmenu.question("add book name", function (newbook) {
                eventemitter.emit('book', newbook);
                console.log('book added successfully')
                show();
            })
        }
        if (num == 3) {
            givenmenu.question('Are you sure you want to quit - press Y to quit', function (letter) {
                if (letter == 'Y') {
                    givenmenu.close();
                } else {
                    show();
                }
            })
        }
        if (num != 1 || num != 2 || num != 3) {
            givenmenu.question('You have selected an invalid entry so please press 1, 2 or 3', function () {
                show();
            })
        }
        
    })
}

givenmenu.on('close', function () {
    console.log('Bye Bye!')
})
