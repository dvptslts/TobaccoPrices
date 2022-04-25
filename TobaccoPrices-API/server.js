const express = require('express')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const https = require('https')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  //Download xlsx
  let url = 'https://sztfh.hu/downloads/dohany/arkozzetetel/alkalmazando_dohanygyartmany_kiskereskedelmi_eladasi_arak_20220422120001.xlsx'
  https.get(url ,(res) => {
    res.pipe(fs.createWriteStream('tmp/source.xlsx'));
  })

  const result = excelToJson({
    sourceFile: './tmp/source.xlsx',
    name: 'Munka1',
    range: 'A3:J30000',
    columnToKey: {
      A: "Termékregisztrátor megnevezése",
      B: "NDN cikkszám",
      C: "EAN kód",
      D: "Termék típus",
      E: "Termék megnevezése",
      F: "Márkanév",
      G: "Mennyiség",
      H: "Mennyiségi egység",
      I: "Kiskereskedelmi eladási ár",
      J: "Érvényesség kezdete"
    }
  })

  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})