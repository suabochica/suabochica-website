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
  $(".sc-general").addClass('bg-teal')
  $(".sc-games").addClass('bg-orange')
  $(".sc-events").addClass('bg-springreen')
  $(".sc-iarts").addClass('bg-crimson')
  $(".sc-backpack").addClass('bg-mediumorchid')

  $(".row").each ->
    $(this).find(".box-identity").addClass('bg-green')
    $(this).find(".box-editorial").addClass('bg-purple')
    $(this).find(".box-web").addClass('bg-blue')
    $(this).find(".box-types").addClass('bg-yellow')
    $(this).find(".box-furniture").addClass('bg-red')
    $(this).find(".box-games").addClass("bg-orange")
    $(this).find(".box-general").addClass('bg-teal')
    $(this).find(".box-iarts").addClass('bg-crimson')
    $(this).find(".box-backpack").addClass('bg-mediumorchid')
    $(this).find(".box-events").addClass('bg-springreen')
    return

  $('p').each ->
    $this = $(this)
    if $this.html().replace(/\s|&nbsp;/g, '').length == 0
      $this.remove()
    return

  return


