function saveToCache() {
  console.log("Save data to cache!");

  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const transaction = document.getElementById("transaction").value;

  const headerJSON = {
    description: "Beschreibung",
    date: "Datums",
    category: "Kategorie",
    transaction: "Transaktion",
  };
  const entityJSON = {
    description,
    date,
    category: category,
    transaction,
  };
  if (localStorage["someKey"]) {
    const allData = JSON.parse(localStorage["someKey"]);
    allData[allData.length] = entityJSON;
    localStorage["someKey"] = JSON.stringify(allData);
  } else {
    localStorage["someKey"] = JSON.stringify([headerJSON, entityJSON]);
  }
}

function showDataTable() {
  const allData = JSON.parse(localStorage["someKey"]);

  console.log(allData[0].description);

  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < allData.length; i++) {
    // creates a table row
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    const cellDescription = document.createTextNode(allData[i].description);
    const cellDate = document.createTextNode(allData[i].date);
    const cellCategory = document.createTextNode(allData[i].category);
    const cellTransaction = document.createTextNode(allData[i].transaction);
    cell1.appendChild(cellDescription);
    cell2.appendChild(cellDate);
    cell3.appendChild(cellCategory);
    cell4.appendChild(cellTransaction);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    // add the row to the end of the table body
    //tblBody.appendChild(rowHeader);
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
