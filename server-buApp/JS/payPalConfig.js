const payPalData = (thisArray) => {
  let holdItems = []
  return new Promise((resolve, reject) => {
    try {
      thisArray.map((data) => {
        holdItems.push(
          Object.assign({
            name: data.thisPrName,
            sku: data.thisPrId,
            price: data.thisPrPrice,
            currency: 'USD',
            quantity: data.thisPrQuantity,
          }),
        )
        resolve(holdItems)
      })
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = { payPalData }
