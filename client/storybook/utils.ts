import {action as _action} from '@storybook/addon-actions'

export const action = (name: string) => (s: any) => {
  alert(JSON.stringify(s, null, 2))
  return _action(name)
}
