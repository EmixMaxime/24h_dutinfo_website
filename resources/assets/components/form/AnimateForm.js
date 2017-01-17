export default class AnimateForm {

    constructor (inputs, options = {}) {

        const defaults = {
            labeledClass: 'has-label',
            focusedClass: 'is-focused'
        }

        const settings = Object.assign({}, defaults, options)
        settings.inputs = inputs
        this.settings = settings
        Object.freeze(this.settings)

        this._animate()
    }

    _animate () {
        const { inputs, focusedClass, labeledClass } = this.settings
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentNode.classList.add(focusedClass, labeledClass) // has-label = show the label on top of the input
            })

            input.addEventListener('blur', function () {
                const label = this.parentNode
                if (this.value === '') {
                    label.classList.remove(labeledClass)
                }
                label.classList.remove(focusedClass)
            })
        })
    }
}
