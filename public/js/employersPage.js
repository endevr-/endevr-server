$(document).ready(function(){

  $( "#create" ).click(function(e) {
   e.preventDefault();
   var email = $('#createEmail').val();
   console.log(email);
   var pass = $('#createPass').val();
   console.log(pass);

   var data =  {"email": email, "password": pass};

    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/employers/new",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(){
        $('#createEmail').val('');
        $('#createPass').val('');
      }
    });
  });

  $( "#login" ).click(function(e) {
   e.preventDefault();
   var email = $('#loginEmail').val();
   console.log(email);
   var pass = $('#loginPass').val();
   console.log(pass);

   var data =  {"email": email, "password": pass};

    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/employers/login",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(){
        $('#loginEmail').val('');
        $('#loginPass').val('');
      }
    });
  });

});