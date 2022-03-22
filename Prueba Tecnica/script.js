$("#agno").click(function() {
  $("#info").html('');
  $("#resp").html('');
  $("#info").html('Introduce un año <br>' +
    '<input type="number" placeholder="Año" class="form-control input-lg" id="fecha">');
  $("#divres").attr("hidden", false);
  $("#succ_agno").attr("hidden", false);
  $("#succ_tabla").attr("hidden", true);
});

$("#succ_agno").click(function() {
  var agno = $("#fecha").val();
  if (((agno % 4 == 0) && (agno % 100 != 0)) || (agno % 400 == 0)) {
    $("#resp").html('Es Bisiesto');

  } else {
    $("#resp").html('No Es Bisiesto');
  }
});

$("#succ_tabla").click(function() {
  $("#resp").html('');

  var filas = $("#filas").val();
  var columnas = $("#columnas").val();
  var resp = "";
  for (var i = 0; i < filas; i++) {
    resp = resp + "<tr>";
    for (var j = 0; j < columnas; j++) {
      resp = resp + "<td></td>";
    }
    resp = resp + "</tr>";
  }

  $("#resp").html(resp);
});

$("#tabla").click(function() {
  $("#info").html('');

  $("#resp").html('');
  $("#info").html('Introduce el número de filas <br>' +
    '<input type="number" placeholder="Filas" class="form-control input-lg" id="filas"> <br>' +
    'Introduce el número de columnas <br>' +
    '<input type="number" placeholder="Columnas" class="form-control input-lg" id="columnas"> <br>');
  $("#divres").attr("hidden", false);
  $("#succ_agno").attr("hidden", true);
  $("#succ_tabla").attr("hidden", false);

});

$("#numeros").click(function() {
  $("#info").html('');
  $("#resp").html('');

  $("#info").html('Lista de Números<br>' +
    '<b id="array_generado"></b><br>' +
    'Lista de Números Ordenados<br>' +
    '<b id="array_ordenado"></b>');
  $("#divres").attr("hidden", true);
  $("#succ_tabla").attr("hidden", true);
  $("#succ_agno").attr("hidden", true);
  var lista = [];
  for (var i = 0; i < 20; i++) {
    lista.push(Math.floor(Math.random() * (100 - 1)) + 1);
  }
  var listades = "";
  var listaord = "";
  //Lista Desordenada
  for (var j = 0; j < lista.length; j++) {
    listades = listades + " " + lista[j];
  }
  $("#array_generado").html(listades);
  //Lista Ordenada
  var listaOrdenada = lista;
  for (var k = 0; k < lista.length; k++) {
    for (var l = 0; l < lista.length; l++) {
      if (l + 1 != lista.length) {
        if (listaOrdenada[l] > listaOrdenada[l + 1]) {
          var lor = listaOrdenada[l + 1];
          listaOrdenada[l + 1] = listaOrdenada[l];
          listaOrdenada[l] = lor;
        }
      }
    }
  }
  for (var j = 0; j < lista.length; j++) {
    listaord = listaord + " " + listaOrdenada[j];
  }
  $("#array_ordenado").html(listaord);

});

$("#letras").click(function() {
  $("#info").html('');
  $("#resp").html('');
  $("#divres").attr("hidden", false);
  $("#succ_tabla").attr("hidden", true);
  $("#succ_agno").attr("hidden", true);

  $("#info").html('Lista A<br>' +
    '<b id="array_generado_a"></b><br>' +
    'Lista B<br>' +
    '<b id="array_generado_b"></b>');

  $("#resp").html('<div>Unión <br>' +
    '<p id="union"></p>' +
    '</div>' +
    '<div>Intersección <br>' +
    '<p id="inter"></p>' +
    '</div>' +
    '<div>Diferencia <br>' +
    '<p id="dif"></p>' +
    '</div>' +
    '<div>Diferencia Simetrica <br>' +
    '<p id="difsim"></p>' +
    '</div>');

  var arrayA = [];
  var arrayB = [];
  var arrayAprint = "";
  var arrayBprint = "";
  var unionprint = "";
  var interprint = "";
  var difprint = "";
  var difsimprint = "";

  for (var i = 0; i < 10; i++) {
    var randomA = Math.ceil(Math.random() * 25);
    var randomB = Math.ceil(Math.random() * 25);
    arrayA.push(String.fromCharCode(65 + randomA));
    arrayB.push(String.fromCharCode(65 + randomB));
  }


  var union = new Set([...arrayA, ...arrayB]);
  var inter = new Set([...arrayA].filter(x => arrayB.includes(x)));
  var dif = new Set([...arrayA].filter(x => !arrayB.includes(x)));
  var difsim = new Set([...union].filter(x => !inter.has(x)));

  for (var i = 0; i < arrayA.length; i++) {
    arrayAprint = arrayAprint + " " + arrayA[i];
    arrayBprint = arrayBprint + " " + arrayB[i];
  }
  $("#array_generado_a").html(arrayAprint);
  $("#array_generado_b").html(arrayBprint);
  union.forEach(function(value) {
    unionprint = unionprint + " " + value;
  })
  $("#union").html(unionprint);
  inter.forEach(function(value) {
    interprint = interprint + " " + value;
  })
  $("#inter").html(interprint);
  dif.forEach(function(value) {
    difprint = difprint + " " + value;
  })
  $("#dif").html(difprint);
  difsim.forEach(function(value) {
    difsimprint = difsimprint + " " + value;
  })
  $("#difsim").html(difsimprint);

});

$("#banco").click(function() {
  $("#info").html('');
  $("#resp").html('');
  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var año = fecha.getFullYear();
  var hoy = año + "-" + mes + "-" + dia
  var past = año + "-" + mes + "-" + (dia - 5)
  const token = "90c31e73504f68b7981ffbae29b97ba8f302f7da9105124ed080d21015b66ad3";
  const serie = "SF63528";
  $.ajax({
    url: "https://www.banxico.org.mx/SieAPIRest/service/v1/series/" + serie + "/datos/" + past + "/" + hoy + "?token=" + token,
    method: "GET",
    jsonp: "callback",
    dataType: "jsonp",
    success: function(response) {
      var datos = response.bmx.series[0]["datos"];
      var data = '<thead><tr>' +
        '<th>Fecha</th>' +
        '<th>Tipo de Cambio</th>' +
        '</tr></thead><tbody>';
      for (var i = 0; i < datos.length; i++) {
        data = data + '<tr><td>' +
          datos[i]["fecha"] + '</td><td>' +
          datos[i]["dato"] + '</td></tr>'
      }
      $("#resp").html('<table id="tcambio">' + data + '</tbody></table>');
    }
  });
  $("#info").html('');
  $("#divres").attr("hidden", false);
  $("#succ_tabla").attr("hidden", true);
  $("#succ_agno").attr("hidden", true);
});