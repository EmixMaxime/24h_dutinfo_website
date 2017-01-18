require('./_form.scss')
import AnimateForm from './AnimateForm'

const options = {
    labeledClass: 'has-label',
    focusedClass: 'is-focused'
}

const inputs = document.querySelectorAll('.field-input')
new AnimateForm(inputs, options) // eslint-disable-line no-new
