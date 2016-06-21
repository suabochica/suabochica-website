###!
# transitions.js is a plugin that manage the css transitions with the support
# of smootState.js
#
# @author  Sergio Leonardo Benítez
#
###

$ ->
  'use strict'
  $page = $('#main')
  options =
    debug: true
    prefetch: true
    cacheLength: 2
    onStart:
      duration: 250
      render: ($container) ->
        # Add your CSS animation reversing class
        $container.addClass 'is-exiting'
        # Restart your animation
        smoothState.restartCSSAnimations()
        return
    onReady:
      duration: 0
      render: ($container, $newContent) ->
        # Remove your CSS animation reversing class
        $container.removeClass 'is-exiting'
        # Inject the new content
        $container.html $newContent
        return
  smoothState = $page.smoothState(options).data('smoothState')
  return
