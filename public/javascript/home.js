$(document).ready(function() {
  $("select").material_select();

  $("#modal1").modal({
    dismissible: false
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();
    var newPerson = {
      name: $("[name=\"name\"]").val().trim(),
      photo: $("[name=\"img\"]").val().trim(),
      scores: [
        $("[name=\"q1\"]").val(),
        $("[name=\"q2\"]").val(),
        $("[name=\"q3\"]").val(),
        $("[name=\"q4\"]").val(),
        $("[name=\"q5\"]").val(),
        $("[name=\"q6\"]").val(),
        $("[name=\"q7\"]").val(),
        $("[name=\"q8\"]").val(),
        $("[name=\"q9\"]").val(),
        $("[name=\"q10\"]").val()
      ]
    };

    $.post("/api/friends", newPerson)
    .done(function(data) {
      if (data) {
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);
        $("#modal1").modal("open");
      }
    });
  });

  $("#modal-close").click(function() {
    window.location = "/survey";
  });
});