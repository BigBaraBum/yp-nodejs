class PopupProfile extends Popup {
    constructor(user, validation) {
        super();
        this.form = document.forms.profile;
        this.user = user;
        this.validation = validation;
    }
    setEventListeners() {
        const _user = this.user;
        const _this = this;
        const _validation = this.validation;
        this.form.addEventListener('input', function(event) {
            _validation.checkInputValidity(this);
        });
        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            _user.setUserInfo(this.elements.name.value, this.elements.about.value);
            _user.updateUserInfo();
            _this.close();
        });
    }

}