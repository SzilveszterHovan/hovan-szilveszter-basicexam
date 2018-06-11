function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  console.log(userDatas);
  deleteNull(userDatas);
  changeNull(userDatas);
  sortByPrice(userDatas);
  console.log(userDatas);
  createShipBox(userDatas);
  crewcount(userDatas)
  console.log(crewcount(userDatas))
  var statistic = document.createElement('div')
  var crewOne = document.createElement('div')
  statistic.className = 'StatisticBox';
  document.querySelector('.shapceship-list').appendChild(statistic);

  statistic.appendChild(crewOne);
  crewOne.innerHTML = crewResult


}

function sortByPrice(arr) {
  var i = arr.length;
  var swap = false;

  do {
    swap = false;
    for (var j = 0; j < i - 1; j++) {
      if (arr[j].cost_in_credits > arr[j + 1].cost_in_credits) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swap = true;
      }
    }
    i--;
  } while (i >= 0 && swap);
  return arr;
}

function changeNull(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].cost_in_credits == null) {
      arr[i].cost_in_credits = "unknown";
    }
    if (arr[i].denomination == null) {
      arr[i].denomination = "unknown";
    }
    if (arr[i].cargo_capacity == null) {
      arr[i].cargo_capacity = "unknown";
    }
    if (arr[i].passengers == null) {
      arr[i].passengers = "unknown";
    }
    if (arr[i].max_atmosphering_speed == null) {
      arr[i].max_atmosphering_speed = "unknown";
    }
    if (arr[i].crew == null) {
      arr[i].crew = "unknown";
    }
    if (arr[i].lengthiness == null) {
      arr[i].lengthiness = "unknown";
    }
    if (arr[i].model == null) {
      arr[i].model = "unknown";
    }
    if (arr[i].manufacturer == null) {
      arr[i].manufacturer = "unknown";
    }
    if (arr[i].image == null) {
      arr[i].image = "unknown";
    }
  }
  return arr;
}

function deleteNull(arr) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].consumables === null) {

      arr.splice(i, 1);
      i = 0;
    }

  }


}

function createShipBox(arr) {
  for (var i = 0; i < arr.length; i++) {
    var shipBox = document.createElement('div')
    var shipPictureBox = document.createElement('div')
    var shipPicture = document.createElement('img')
    var shipList = document.createElement('div')
    var listing = document.createElement('ul')

    shipBox.className = 'ShipBox';
    shipPictureBox.className = 'ShipPicture';
    shipList.className = 'shipList';


    document.querySelector('.shapceship-list').appendChild(shipBox);
    shipBox.appendChild(shipPictureBox);
    shipPictureBox.appendChild(shipPicture);
    shipPicture.setAttribute('src', 'img/' + arr[i].image)
    shipBox.appendChild(shipList);
    shipList.appendChild(listing);
    listing.innerHTML = '<li>' + "Consumables: " + arr[i].consumables + '</li><li>' + "Denomination " + arr[i].denomination + '</li><li>' + "Cargo: " + arr[i].cargo_capacity + '</li><li>' + "Passengers: " + arr[i].passengers + '</li><li>' + "Max Speed: " + arr[i].max_atmosphering_speed + '</li><li>' + "Crew: " + arr[i].crew + '</li><li>' + "Length: " + arr[i].lengthiness + '</li><li>' + "Model: " + arr[i].model + '</li><li>' + "Cost: " + arr[i].cost_in_credits + '</li><li>' + "Manufacturer: " + arr[i].manufacturer + '</li>'


  }
}
var crewResult;

function crewcount(arr) {

  for (i = 0; i < arr.length; i++) {
    if (arr[i].crew = 1) {
      crewResult += arr[i].model;
    }
  }
  return crewResult
}

getData('/json/spaceships.json', successAjax);