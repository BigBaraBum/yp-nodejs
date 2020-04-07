class PopupCard extends Popup {
    constructor(cardList, validation) {
        super();
        this.form = document.forms.new;
        this.cardList = cardList;
        this.validation = validation;
    }
    setEventListeners() {
        const _this = this;
        const _validation = this.validation;
        const _cardList = this.cardList;
        this.form.addEventListener('input', function(event) {
            _validation.checkInputValidity(this);
        });
        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            _cardList.addCard(this.name.value, this.about.value);
            this.name.value = '';
            this.about.value = '';
            _this.close();
        });
    }

}