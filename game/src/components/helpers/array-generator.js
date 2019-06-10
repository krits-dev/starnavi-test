const generateArray = (length, generator) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(generator(i))
  }
  return result
}

const generateButtons = amount =>
  generateArray(amount, idx => ({
    id: idx,
    red: false,
    green: false,
    blue: false
  }))

export default generateButtons;