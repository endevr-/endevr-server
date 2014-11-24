$(document).ready(function() {
  $("#add_row").on("click", function() {
    // Get max row id and set new id
    var newid = 0;
    $.each($("#tab_logic tr"), function() {
      if (parseInt($(this).data("id")) > newid) {
        newid = parseInt($(this).data("id"));
      }
    });
    newid++;
    var tr = $("<tr></tr>", {
      id: "addr" + newid,
      "data-id": newid
    });
    // loop through each td and create new elements with name of newid
    $.each($("#tab_logic tbody tr:nth(0) td"), function() {
      var cur_td = $(this);
      var children = cur_td.children();
      // add new td and element if it has a nane
      if ($(this).data("name") !== undefined) {
        var td = $("<td></td>", {
          "data-name": $(cur_td).data("name")
        });
        var c = $(cur_td).find($(children[0]).prop('tagName')).clone()
          .val("");
        c.attr("name", $(cur_td).data("name") + newid);
        c.appendTo($(td));
        td.appendTo($(tr));
      } else {
        var td = $("<td></td>", {
          'text': $('#tab_logic tr').length
        }).appendTo($(tr));
      }
    });

    $(tr).appendTo($('#tab_logic'));

    $(tr).find("td button.row-remove").on("click", function() {
      $(this).closest("tr").remove();
    });

    $('tr').find("td button.row-add").on("click", function() {
      var num = this.id;
      num = num.slice(3);
      var desc = desc + num;
      var reqs = reqs + num;
      var prefs = prefs + num;
      var loc = '"' + "textarea[name=" + "'" + 'desc' + num + "']" + '"';
      var sal = sal + num;

      desc = $().val();
      reqs = $().val();
      prefs = $().val();
      loc = $().val();
      sal = $().val();

      console.log(desc,reqs,prefs,loc,sal);

    });

  });
  var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(index) {
      $(this).width($originals.eq(index).width())
    });
    return $helper;
  };
  $(".table-sortable tbody").sortable({
    helper: fixHelperModified
  }).disableSelection();
  $(".table-sortable thead").disableSelection();
  $("#add_row").trigger("click");
});
