export class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        });

        return value;
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = '';
        });
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];

            let isValid = true;
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid;
            });

            isValid ? clearError(this.form[control]) : setError(this.form[control]);

            isFormValid = isFormValid && isValid;
        });

        return isFormValid;
    }
}

function setError($controll) {
    clearError($controll);
    const error = '<p class="validator-error">Введите корректное значение</p>';
    $controll.classList.add('invalid');
    $controll.insertAdjacentHTML('afterend', error);
}

function clearError($controll) {
    $controll.classList.remove('invalid');

    $controll.closest('.form-control').removeChild($controll.nextSibling);
}