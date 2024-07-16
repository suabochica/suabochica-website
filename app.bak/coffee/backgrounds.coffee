###!
# background.js is a script to set the color background for the differents sections
#
# @author  Sergio Leonardo Benítez Díaz
#
###

$(document).ready ->
  $("#section-about").addClass('background-porange')
  $("#section-showcase").addClass('background-porange')
  $(".section-identity").addClass('background-green')
  $(".section-editorial").addClass('background-purple')
  $(".section-web").addClass('background-blue')
  $(".section-types").addClass('background-yellow')
  $(".section-furniture").addClass('background-red')
  $(".section-games").addClass('background-orange')
  $(".section-general").addClass('background-teal')
  $(".section-iarts").addClass('background-crimson')
  $(".section-backpack").addClass('background-mediumorchid')
  $(".section-events").addClass('background-springreen')

  $(".row").each ->
    $(this).find(".showcase-item-identity").addClass('background-green')
    $(this).find(".showcase-item-editorial").addClass('background-purple')
    $(this).find(".showcase-item-web").addClass('background-blue')
    $(this).find(".showcase-item-types").addClass('background-yellow')
    $(this).find(".showcase-item-furniture").addClass('background-red')
    $(this).find(".showcase-item-games").addClass("background-orange")
    $(this).find(".showcase-item-general").addClass('background-teal')
    $(this).find(".showcase-item-iarts").addClass('background-crimson')
    $(this).find(".showcase-item-backpack").addClass('background-mediumorchid')
    $(this).find(".showcase-item-events").addClass('background-springreen')
    return

  $('p').each ->
    $this = $(this)
    if $this.html().replace(/\s|&nbsp;/g, '').length == 0
      $this.remove()
    return

  return


