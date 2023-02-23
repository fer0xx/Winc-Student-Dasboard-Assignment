import Papa from "papaparse";
import csv from "./data.csv";

Papa.parse(
    csv,
    {
        header: true,
        download: true,
        complete: function (results) {
            const data = results.data.map(result => {
                result.difficulty = parseInt(result.difficulty);
                result.fun = parseInt(result.fun);

                return result;
            });

            console.log(data);
        }
    }
);