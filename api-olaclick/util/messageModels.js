module.exports = {
  minCharacters: (number) => {
    return [number, `Escriba mínimo ${number} caracteres, por favor`]
  },
  textRequired: (text) => {
    return [true, `Escriba ${text}, por favor`]
  }
}
