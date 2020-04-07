class Popup {
    constructor() {
        this.popup = null;
    }
    open(params) {
        this.popup = document.querySelector(`.${params}`);
        this.popup.classList.add('popup_is-opened');
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
}