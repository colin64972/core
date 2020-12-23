import { Bounce } from 'gsap'

export function setAnimation(
  direction = 'x',
  position = 0,
  delay = Math.random(),
  duration = 1,
  threshold = 0.5,
  paused = true
) {
  return {
    duration,
    delay,
    threshold,
    paused,
    to: {
      opacity: 1,
      ease: Bounce.easeOut
    },
    from: {
      [direction]: position,
      ease: Bounce.easeOut
    }
  }
}

export function parseValidationRules(fields) {
  return fields.reduce((acc, cur) => {
    acc[cur.name] = cur.validation
    return acc
  }, {})
}

export function setOrderButtonLabel(form, dirty, valid, value) {
  if (!dirty || !valid) {
    return 'Submit Order'
  }
  if (form === 'buyOrder') {
    return `Submit Order at ${value} ETH`
  }
  if (form === 'sellOrder') {
    return `Submit Order for ${value} ETH`
  }
}
