$(document).ready(function() {

  $("#save").click(function(e) {
    e.preventDefault();
    var name = $('#companyName').val();
    var location = $('#companyLocation').val();
    var image = $('#companyUrl').val();
    var contactEmail = $('#contactEmail').val();
    var contactName = $('#contactName').val();
    var contactPhone = $('#contactPhone').val();

    var data = {
      "jwt_token": localStorage.getItem('jwt'),
      "usertype": 'emp',
      "name": name,
      "location": location,
      "image": image,
      "contact_person": contactName,
      "contact_email": contactEmail,
      "contact_phone": contactPhone
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/employers/profile",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        console.log('Saved! - ', data);
        $('#companyName').val('');
        $('#companyLocation').val('');
        $('#companyUrl').val('');
        $('#contactEmail').val('');
        $('#contactName').val('');
        $('#contactPhone').val('');
      },
      error: function(e) {
        console.log('Create! Failure: ', e);
      }
    });
  });
    
});