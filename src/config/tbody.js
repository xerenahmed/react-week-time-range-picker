export const weeks = [
  {
    iden: '0',
    week: 'Pazartesi'
  },
  {
    iden: '1',
    week: 'Salı'
  },
  {
    iden: '2',
    week: 'Çarşamba'
  },
  {
    iden: '3',
    week: 'Perşembe'
  },
  {
    iden: '4',
    week: 'Cuma'
  },
  {
    iden: '5',
    week: 'Cumartesi'
  },
  {
    iden: '6',
    week: 'Pazar'
  }
]

const weekMaps = new Map()
weeks.forEach((item) => {
  weekMaps.set(item.iden, item.week)
})

export {weekMaps}
