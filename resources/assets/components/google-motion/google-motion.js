require('./google-motion.sass')
import { trackStateOfElement, enterMotion, leaveMotion } from './Motion'

if (!window.Emix) window.Emix = {}

window.Emix.trackStateOfElement = trackStateOfElement
window.Emix.enterMotion = enterMotion
window.Emix.leaveMotion = leaveMotion
