$(document).ready(function () {
   // Your code here
   $("#b1").click(function () {
      console.log("button 1 clicked");
   });

   $("#b2").click(function () {
      console.log("button 2 clicked");
   });

   $("#b3").click(function () {
      console.log("button 3 clicked");
      hideShow('#breakfast')
      $('#b3').attr('disabled', true);
      $('#b4').attr('disabled', false);
      $('#b5').attr('disabled', false);
   });

   $("#b4").click(function () {
      console.log("button 4 clicked");
      hideShow('#lunch')
      $('#b3').attr('disabled', false);
      $('#b4').attr('disabled', true);
      $('#b5').attr('disabled', false);
   });

   $("#b5").click(function () {
      console.log("button 5 clicked");
      hideShow('#dinner')
      $('#b3').attr('disabled', false);
      $('#b4').attr('disabled', false);
      $('#b5').attr('disabled', true);
   });



});

function hideShow(el) {
   $('.box').hide()
   $(el).show()
   $('.tab').removeClass('active')
   $('a[href="' + el + '"]').addClass('active')
}