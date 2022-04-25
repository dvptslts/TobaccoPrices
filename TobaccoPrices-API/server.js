const express = require('express')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const https = require('https')
const mysql = require('mysql')
const CronJob = require('cron').CronJob

const app = express()
const port = 3000

const pool = mysql.createPool({
  host: 'localhost',
  user: 'dvptsolutions',
  password: 'Dvptsolutions2022',
  database: 'tobaccoprices'
})

var updateCronJob = new CronJob({
  cronTime: '06 00 00 * * * ',
  onTick: update(),
  start: true,
  runOnInit: false
});

function update() {
  //DownloadXlsx
  let url = 'https://sztfh.hu/downloads/dohany/arkozzetetel/alkalmazando_dohanygyartmany_kiskereskedelmi_eladasi_arak_20220422120001.xlsx'
  https.get(url ,(res) => {
    res.pipe(fs.createWriteStream('tmp/source.xlsx'));
  })

  //XlsxToJson
  const result = excelToJson({
    sourceFile: './tmp/source.xlsx',
    name: 'Munka1',
    range: 'A3:J30000',
    columnToKey: {
      A: "manufacturer",
      B: "ndn",
      C: "ean",
      D: "category",
      E: "name",
      F: "brand",
      G: "qtn",
      H: "qtntype",
      I: "price",
      J: "date"
    }
  })
  
  for (item of result.Munka1) {
    pool.query('REPLACE INTO data VALUES (\"'+item.manufacturer+'\", \"'+item.ndn+'\", \"'+item.ean+'\", \"'+item.category+'\", \"'+item.name+'\", \"'+item.brand+'\", '+item.qtn+', \"'+item.qtntype+'\", '+item.price+')', (err, rows, field) => {})
  }
}

app.get('/update', (req, res) => {
  update()
  res.end()
})

app.get('/priceList', (req, res) => {
  pool.query('SELECT * FROM data', (err, rows, field) => {
    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})