const tableBody = document.getElementById('table-body');

const getFlight = () => {
  fetch('http://localhost:8000/flights')
    .then((res) => res.json())
    .then((flights) => {
      console.log(flights);
      populateTable(flights);
    })
    .catch((err) => console.log(err));
};

getFlight();

const populateTable = (flights) => {
  for (const flight of flights) {
    const tableRow = document.createElement('tr');
    const tableIcon = document.createElement('td');
    tableIcon.textContent = '✈︎';
    tableRow.append(tableIcon);

    const flightDetails = {
      time: flight.programedHour.slice(0, 5),
      destination: flight.destiny,
      flight: `${flight.acronym} ${flight.flightNumber}`,
      gate: flight.firstDoor,
      status: flight.state,
    };

    for (const key in flightDetails) {
      const tableCell = document.createElement('td');
      const word = Array.from(flightDetails[key]);

      for (const [index, letter] of word.entries()) {
        const letterEle = document.createElement('div');

        setTimeout(() => {
          letterEle.textContent = letter;
          letterEle.classList.add('flip');
          tableCell.append(letterEle);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }

    tableBody.append(tableRow);
  }
};
