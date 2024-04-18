$(document).ready(function () {
   // Your code here

   //start functions

   let tab_exists = false;
   let tabs_list = ["#breakfast", "#lunch", "#dinner"]

   if (tabs_list.includes(window.location.hash))
      tab_exists = true;

   if (tab_exists) {
      hideShow(window.location.hash);
   }
   else {
      hideShow('#breakfast')
   }



   // click functions
   $("#b1").click(function () {
      console.log("button 1 clicked");
   });

   $("#b2").click(function () {
      console.log("button 2 clicked");
   });

   $("#breakfast-b").click(function () {
      console.log("button 3 clicked");
      hideShow('#breakfast')

   });

   $("#lunch-b").click(function () {
      console.log("button 4 clicked");
      hideShow('#lunch')

   });

   $("#dinner-b").click(function () {
      console.log("button 5 clicked");
      hideShow('#dinner')

   });

   $('.tab').click(function (e) {
      window.location.hash = $(this).attr('href');
      hideShow($(this).attr('href'));
      return false;
   });



});

function hideShow(el) {
   //hide/show elements
   $('.box').hide()
   $(el).show()
   $('.tab').removeClass('active')
   $('a[href="' + el + '"]').addClass('active')

   //hide button of current tab
   //show all buttons based on class
   $('.hidebutton').attr('disabled', false)
   // hide button of current tab
   $(el + '-b').attr('disabled', true)
}