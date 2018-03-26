import {configure} from '@storybook/react'

/**
 * In the actual app we import this as a CSS module at the root. It
 * sets the base styles/fonts for the app. Without importing it here
 * we'd have a mismatch of this base within Storybook, which would
 * require us to set those base styles on each component individually.
 */
import '@client/global.css'

function loadStories() {
  require('../storybook')
}

configure(loadStories, module)
