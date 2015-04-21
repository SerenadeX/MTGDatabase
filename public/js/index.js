function setupEvents() {
  var button = document.getElementById('queryButton');
  button.addEventListener('click', function() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
      if (xml.readyState == 4 && xml.status == 200) {
        document.querySelector('#result').innerText = JSON.stringify(JSON.parse(xml.responseText), ' ', 2);

      }

    };

    xml.open(
      "GET",
      "/getSd",
      true
    );

    xml.send();

  });
}


setupEvents();
