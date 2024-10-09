module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id); // this id i am using in the template-card.html

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

////
// how to export this ? there are mulutiple ways.
// Right now this is an * Anonomous function * . 👇
//module.export = (temp, product) => {
// In each module we have an access to variable called "module" , on there we can set the "export" property. and that we then set to what ever we want to export.
// Anonomous function - the function which does not have any name.
