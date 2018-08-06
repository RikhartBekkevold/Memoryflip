let Settings = {
    peekTime: 1000,
    num_cards: 16,
    num_rows:  4,
    randomEvents: false
};

if(localStorage.getItem('Settings') !== null) {
    Settings = JSON.parse(localStorage.getItem('Settings'));
}
