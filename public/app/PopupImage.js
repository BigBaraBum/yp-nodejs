class PopupImage extends Popup {
    constructor() {
        super();
        this.popup = document.querySelector('.popup-image');
        this.img = document.querySelector('.popup-image__photo');
    }
    add() {
        this.img.src = event.target.style.backgroundImage.slice(5, -2);
    }
    delete() {
        this.img.src = '';
    }
}