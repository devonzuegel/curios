export const passwordConstraints = [
  {
    constraint: (s: string) => s.length > 0,
    message: 'Must not be empty',
  },
  {
    constraint: (s: string) => s.length > 8,
    message: '8 characters minimum',
  },
]

export const notEmpty = {
  constraint: (s: string) => s.length > 0,
  message: 'Must not be empty',
}
