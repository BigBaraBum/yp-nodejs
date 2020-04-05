class FormValidator {
    constructor() {
        this.valueMissing = 'Это обязательное поле';
        this.tooShort = 'Должно быть от 2 до 30 символов';
        this.typeMismatch = 'Введите URL';

        this.errorName = document.querySelector('.error-first-name');
        this.errorAbout = document.querySelector('.error-about');
        this.errorPlaceName = document.querySelector('.error-name');
        this.errorLink = document.querySelector('.error-link');
    }
    checkInputValidity(form) {
        this.name = form.elements.name;
        this.about = form.elements.about;
        this.submit = form.elements.submit;
        if (form == document.forms.new) {
            this.displayError(this.name, this.errorPlaceName);
            this.displayError(this.about, this.errorLink);
        } else if (form == document.forms.profile) {
            this.displayError(this.name, this.errorName);
            this.displayError(this.about, this.errorAbout);
        }


        this.setSubmitButtonState(this.name, this.about, this.submit);
    }
    displayError(input, error) {
        if (input.validity.valueMissing) {
            error.textContent = this.valueMissing;
        } else if (input.validity.typeMismatch) {
            error.textContent = this.typeMismatch;
        } else if (input.validity.tooShort) {
            error.textContent = this.tooShort;
        } else {
            error.textContent = null;
        }
    }
    setSubmitButtonState(name, about, submit) {
        if (name.validity.valid && about.validity.valid) {
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', true);
        }
    }
}