$(document).ready(function() {


  if(localStorage.getItem('jwt')){
    var data = {'jwt_token': localStorage.getItem('jwt'), usertype: 'emp'};
    console.log(data);
    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/validate",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        if(data.status === 'logged in'){
          window.location.replace("http://localhost:9000/employers/profile");
        }
      },
      error: function(e){
        console.log('Error: ', e);
      }
    });
  }

  $("#create").click(function(e) {
    e.preventDefault();
    var email = $('#email').val();
    console.log(email);
    var pass = $('#pass').val();
    console.log(pass);
    var data = {
      "email": email,
      "password": pass
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/employers/new",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        console.log('Login! - ', data);
        $('#email').val('');
        $('#pass').val('');
      },
      error: function(e) {
        console.log('Create! Failure: ', e);
      }
    });
  });

  $("#login").click(function(e) {
    e.preventDefault();
    var email = $('#email').val();
    console.log(email);
    var pass = $('#pass').val();
    console.log(pass);
    var data = {
      "email": email,
      "password": pass
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/employers/login",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        localStorage.setItem('jwt', data.jwt);
        $('#email').val('');
        $('#pass').val('');
      },
      error: function(e) {
        console.log('Create! Failure: ', e.responseText);
      }
    });
  });

});