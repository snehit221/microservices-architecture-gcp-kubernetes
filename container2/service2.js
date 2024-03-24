const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');  // using file system for validation purposes..
const parse = require("csv-parse");
app.use(express.json());

app.post('/calculate-product-sum', (req, res) => {
  const jsonData = req.body;
  const fileName = jsonData.file;
  let totalSum = 0;

  fs.createReadStream('/snehit_PV_dir/' + jsonData.file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
      const product = row[0];
      const amount = row[1];

      if (product === jsonData.product) {
        totalSum += parseInt(amount);
      }
    })
    .on('end', () => {
      if (totalSum === 0) {
        // If totalSum is still 0, it means the file is invalid
        return res.status(200).json({ file: fileName, error: "Input file not in CSV format." });
      } else {
        // Otherwise, return the sum
        return res.status(200).json({ file: fileName, sum: totalSum });
      }
    })
    .on("error", function (error) {
      return res.status(200).json({ file: fileName, error: "Input file not in CSV format." });
    });

});

app.listen(port, () => {
  console.log(`Service App 2 is listening at ${port}`);
});

