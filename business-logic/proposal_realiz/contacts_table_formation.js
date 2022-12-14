export default class contacts_table_formation{

    constructor(contactList){
        this.createTable(contactList);
    }

    createTable(tableData) {
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');
      
        tableData.forEach(function(rowData) {
          var row = document.createElement('tr');
      
          rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });
      
          tableBody.appendChild(row);
        });
      
        table.appendChild(tableBody);
        tableContainer=document.getElementById('contacts_container');
        tableContainer.appendChild(table);
    }




}