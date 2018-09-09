###!
# background.js is a script to set the color background for the differents
# sections
#
# @author  Sergio Leonardo Benítez Díaz
#
###

$(document).ready ->
  $("#sc-about").addClass('bg-porange')
  $("#sc-showcase").addClass('bg-porange')
  $(".sc-identity").addClass('bg-green')
  $(".sc-editorial").addClass('bg-purple')
  $(".sc-web").addClass('bg-blue')
  $(".sc-types").addClass('bg-yellow')
  $(".sc-furniture").addClass('bg-red')
  $(".sc-games").addClass('bg-orange')
  $(".sc-general").addClass('bg-teal')
  $(".sc-iarts").addClass('bg-crimson')
  $(".sc-backpack").addClass('bg-mediumorchid')
  $(".sc-events").addClass('bg-springreen')

  $(".row").each ->
    $(this).find(".showcase-item-identity").addClass('bg-green')
    $(this).find(".showcase-item-editorial").addClass('bg-purple')
    $(this).find(".showcase-item-web").addClass('bg-blue')
    $(this).find(".showcase-item-types").addClass('bg-yellow')
    $(this).find(".showcase-item-furniture").addClass('bg-red')
    $(this).find(".showcase-item-games").addClass("bg-orange")
    $(this).find(".showcase-item-general").addClass('bg-teal')
    $(this).find(".showcase-item-iarts").addClass('bg-crimson')
    $(this).find(".showcase-item-backpack").addClass('bg-mediumorchid')
    $(this).find(".showcase-item-events").addClass('bg-springreen')
    return

  $('p').each ->
    $this = $(this)
    if $this.html().replace(/\s|&nbsp;/g, '').length == 0
      $this.remove()
    return

  return


