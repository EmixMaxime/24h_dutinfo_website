export const trackStateOfElement = (opts) => {

  const defaultOpts = {
    visibleClass: 'show',
    ELEM_VISIBLE_STATE: 'visible',
    ELEM_NOT_VISIBLE_STATE: 'notVisible'
  }

  const state = Object.assign({}, defaultOpts, opts)

  return {
    on (element) {
      return new Promise((resolve) => {

        element.addEventListener('transitionend', function () {
          const visibleClass = Array.from(state.visibleClass) // TODO : p-e pas optimal pour les performances

          if (this.classList.contains(...visibleClass)) return resolve(state.ELEM_VISIBLE_STATE)
          return resolve(state.ELEM_NOT_VISIBLE_STATE)
        })

      })
    }
  }
}

export const enterMotion = (opts, trackStateOfElementParam) => {

  const defaultOpts = {
    visibleClass: ['visible'],
    enterClass: 'enter-transition',
    ELEM_VISIBLE_STATE: 'visible'
  }

  const state = Object.assign({}, defaultOpts, opts)

  if (!Array.isArray(state.visibleClass)) state.visibleClass = [state.visibleClass]
  Object.freeze(state)

  let TrackStateOfElement
  if (typeof trackStateOfElementParam !== 'function') { // TODO: vérifier que c'est la bonne fonction aussi p-e ?
    // On l'instancie
    TrackStateOfElement = trackStateOfElement(state)
  } else {
    TrackStateOfElement = trackStateOfElementParam
  }

  const dep = {
    trackStateOfElement: TrackStateOfElement
  }

  return {
    /* Faitre entrer un élement sur la page */
    on (element) {
      const { visibleClass, enterClass } = state
      visibleClass.push(enterClass)
      console.log({visibleClass})

      element.classList.add(...visibleClass)
      return dep.trackStateOfElement.on(element)
    }
  }
}

export const leaveMotion = (opts) => {

  const defaultOpts = {
    visibleClass: 'visible',
    enterClass: 'enter-transition',
    leaveClass: 'leave-transition',
    ELEM_NOT_VISIBLE_STATE: 'notVisible'
  }

  const state = Object.assign({}, defaultOpts, opts)
  Object.freeze(state)

  const dep = {
    trackStateOfElement: trackStateOfElement(state)
  }

  return {
    on (element) {
/*
* enterClass / leaveClass = gestion du timing de l'animation !
* visibleClass = la class qui anime l'élement, exemple celle qui met le translateY(0)
*/
      const { enterClass, leaveClass, visibleClass, ELEM_NOT_VISIBLE_STATE } = state
      element.classList.remove(visibleClass, enterClass)
      element.classList.add(leaveClass)

      const trackState = dep.trackStateOfElement.on(element)

			trackState.then(stateOfElement => { // eslint-disable-line no-tabs
        console.log({stateOfElement})
        console.log({leaveClass})

        stateOfElement === ELEM_NOT_VISIBLE_STATE ? element.classList.remove(leaveClass) : ''
      })
      return trackState
    }
  }

}
