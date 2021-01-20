import { makeVar } from '@apollo/client'

export const favoriteMovies = makeVar([])
export const favoriteSeries = makeVar([])
export const modal = makeVar({
  show: false,
  dialog: '',
  type: ''
})

export const toggleModal = ({dialog, type}) => {
  modal({
    ...modal,
    show: true,
    dialog,
    type
  })
  setTimeout(() => {
    modal({
      ...modal,
      show: false,
      dialog: ''
    })
  }, 3000);
}