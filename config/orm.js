// Import MySQL connection
const connection = require("../config/connection.js");


// Convert object key/value pairs to SQL syntax
function objToSql() {
    let arr = [];

    for (var key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            };
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// Object for SQL statement functions
const orm = {
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne: function (table, values, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += "VALUES (";
        queryString += values;
        queryString += ") ";

        connection.query(queryString, values, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    UpdateOne: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
}

module.exports = orm;