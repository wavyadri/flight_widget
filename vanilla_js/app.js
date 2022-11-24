const tableBody = document.getElementById('table-body');

let flights = [
  {
    time: '08:11',
    destination: 'SAN JOSE',
    flight: 'SJ 203',
    gate: 'A 01',
    status: 'BOARDING',
  },
  {
    time: '12:39',
    destination: 'CALGARY',
    flight: 'CL 320',
    gate: 'C 31',
    status: 'ON TIME',
  },
  {
    time: '13:21',
    destination: 'ATHENS',
    flight: 'AT 201',
    gate: 'A 19',
    status: 'ON TIME',
  },
  {
    time: '14:01',
    destination: 'MALTA',
    flight: 'MA 402',
    gate: 'B 02',
    status: 'DELAYED',
  },
  {
    time: '15:22',
    destination: 'AGADIR',
    flight: 'MO 211',
    gate: 'A 32',
    status: 'ON TIME',
  },
  {
    time: '15:22',
    destination: 'HAVANA',
    flight: 'CU 234',
    gate: 'E 32',
    status: 'CANCELLED',
  },
];

const destinations = ['LIMA', 'BANGKOK', 'ROMA', 'CAIRO', 'LA PAZ', 'SEOUL'];
const statuses = ['ON TIME', 'DELAYED', 'CANCELLED'];
let hour = 16;

function populateTable() {
  for (const flight of flights) {
    const tableRow = document.createElement('tr');
    for (const key in flight) {
      const tableCell = document.createElement('td');
      const word = Array.from(flight[key]);

      for (const [index, letter] of word.entries()) {
        const letterEle = document.createElement('div');

        setTimeout(() => {
          letterEle.classList.add('flip');
          letterEle.textContent = letter;
          tableCell.append(letterEle);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }
    tableBody.append(tableRow);
  }
}

populateTable();

function generateRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateRandomNumber(max) {
  let numbers = '0123456789';
  if (max) {
    numbers = '012345';
  }
  return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function generateTime() {
  let displayHour = hour;
  if (hour < 24) {
    hour++;
  }
  if (hour >= 23) {
    hour = 1;
    displayHour = hour;
  }
  if (hour < 10) {
    displayHour = '0' + hour;
  }

  return (
    displayHour + ':' + generateRandomNumber(true) + generateRandomNumber()
  );
}

function shuffleUp() {
  flights.shift();
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight: `${generateRandomLetter()}${generateRandomLetter()} ${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}`,
    gate: `${generateRandomLetter()}  ${generateRandomNumber()}${generateRandomNumber()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  });
  tableBody.textContent = '';
  populateTable();
}

setInterval(() => {
  shuffleUp();
}, 3000);
