// set the
let Settings = {
    peekTime: 1000,
    num_cards: 16,
    num_rows:  4,
    randomEvents: false
};

if(localStorage.getItem('Settings') !== null) {
    Settings = JSON.parse(localStorage.getItem('Settings'));
}


// let Settings = localStorage.getItem('settings') === null ? obj : localStorage.getItem('settings');

//wont change the obj, just other props vlues? so const?.. meaning i wont add values to the object during runtime
//another file called config? read upon load.. while this reads everytime/before game starts?
//obj here that alters. style: style kinda thing?
//wont add valaues to it, the obj


    // this.nrOfCards = 8;
    // this.nrOfRows = 2;
    //
    // this.nrOfCards = 12;
    // this.nrOfRows = 3;
    //
    // this.nrOfCards = 16;
    // this.nrOfRows = 4;

    // localStorage.setItem('myCat', 'Tom');
    //
    // var cat = localStorage.getItem('myCat');
    //
    // localStorage.removeItem('myCat');
    //
    // // clear all items
    // localStorage.clear();
