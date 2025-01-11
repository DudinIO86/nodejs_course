const fs = require("fs");
const path = require("path");

function writting() {

    const ar = JSON.parse(fs.readFileSync(path.join(__dirname, "database.json"), "utf-8"));

    const us = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf-8"));

    for (i = 0; i < us.length; i++) {
        ar.push(us[i]);
        ar[i].id=i+1;
    }

    fs.writeFileSync(path.join(__dirname, "database.json"), JSON.stringify(ar, null, 2), { flag: "w" });

}

module.exports = writting;