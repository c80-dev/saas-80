const fs = require("fs");
const csv = require("csv-parser");
const readXlsxFile = require("read-excel-file/node");

const Analysis = require("../models/analysis");

const readCSVFile = (path, res, params) => {
  const results = [];
  let splicedArray;

  let rows = [];
  const tempRows = [];

  const cols = [];
  let rowCount = 0;

  const transactionId = Math.floor(10000 + Math.random() * 90000);

  const next = async () => {
    const data = { cols, rowCount, rows };

    const newTransaction = await new Analysis({
      filePath: path,
      data,
      transactionId,
    });

    try {
      await newTransaction.save();
      res.send({ ...data, transactionId });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Something went wrong wile processing your request" });
    }
  };

  fs.createReadStream(path)
    .pipe(csv({ headers: params.hasHeader }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      if (!params.hasHeader) {
        Object.values(results[0]).forEach((result, index) => {
          const obj = {
            index: index + 1,
            title: "",
            dataType: "",
            default: "",
            position: index + 1,
          };
          cols.push(obj);
        });

        rowCount = results.length;
        rows = results.splice(0, 100);

        next();
        return;
      }

      // Fetch header values and store them in cols array
      const header = Object.values(results.splice(0, 1)[0]);
      header.forEach((item, index) => {
        const obj = {
          index: index + 1,
          title: item,
          dataType: "",
          default: "",
          position: index + 1,
        };
        cols.push(obj);
      });
      //

      // Get the first 100 elements of the array and set them to their corresponding header
      let splicedArray = [...results];
      splicedArray = splicedArray.splice(0, 100);

      splicedArray.forEach((_, index) => {
        tempRows.push(Object.values(splicedArray[index]));
      });

      tempRows.forEach((row) => {
        const obj = {};
        row.forEach((item, index) => {
          obj[header[index]] = item;
        });
        rows.push(obj);
      });
      //

      rowCount = results.length;
      next();
    });
};

const readXLSXFile = (path, res, params) => {
  const results = [];
  let splicedArray;

  let rows = [];
  const tempRows = [];

  const cols = [];
  let rowCount = 0;

  const transactionId = Math.floor(10000 + Math.random() * 90000);

  const next = async () => {
    const data = { cols, rowCount, rows };

    const newTransaction = await new Analysis({
      filePath: path,
      data,
      transactionId,
    });

    try {
      await newTransaction.save();
      res.send({ ...data, transactionId });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Something went wrong wile processing your request" });
    }
  };

  readXlsxFile(path).then((row) => {
    if (!params.hasHeader) {
      row[0].forEach((_, index) => {
        const obj = {
          index: index + 1,
          title: "",
          dataType: "",
          default: "",
          position: index + 1,
        };
        cols.push(obj);
      });

      row.forEach((row) => {
        const obj = Object.assign({}, row);
        results.push(obj);
      });

      rowCount = results.length;
      rows = results.splice(0, 100);
      next();

      return;
    }

    const header = row.splice(0, 1);
    header[0].forEach((item, index) => {
      const obj = {
        index: index + 1,
        title: item,
        dataType: "",
        default: "",
        position: index + 1,
      };
      cols.push(obj);
    });

    row.forEach((row) => {
      const obj = Object.assign({}, row);
      results.push(obj);
    });

    let splicedArray = [...results];
    splicedArray = splicedArray.splice(0, 100);

    splicedArray.forEach((row) => {
      const obj = {};
      Object.values(row).forEach((item, index) => {
        obj[header[0][index]] = item;
      });
      rows.push(obj);
    });

    rowCount = results.length;
    next();

    return;
  });
};

const analysis = { readCSVFile, readXLSXFile };

module.exports = analysis;
