$(document).ready(function () {
    myHeight = $("nav").height();
    if ($("article").height() > myHeight)
        myHeight = $("article").height();
    $("nav").css({ height: myHeight });
    $("article").css({ height: myHeight });
});