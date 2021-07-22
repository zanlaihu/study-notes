new Promise(function (resolve, reject) {
  var a = 0;
  var b = 1;
  if (b == 0) reject("Divide zero");
  else resolve(a / b);
})
  .then(function (value) {
    console.log("a / b = " + value);
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(function () {
    console.log("End");
  });
