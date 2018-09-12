###!
# smoothState.js is jQuery plugin that progressively enhances
# page loads to behave more like a single-page application.
#
# @author  Miguel Ángel Pérez   reachme@miguel-perez.com
# @see     http://smoothstate.com
#
###

(($, window, document) ->
  'use strict'

  ###* Abort if browser does not support pushState ###

  if !window.history.pushState
    # setup a dummy fn, but don't intercept on link clicks

    $.fn.smoothState = ->
      this

    $.fn.smoothState.options = {}
    return

  ###* Abort if smoothState is already present *###

  if $.fn.smoothState
    return
  $body = $('html, body')
  consl = window.console
  defaults =
    debug: false
    anchors: 'a'
    forms: 'form'
    allowFormCaching: false
    repeatDelay: 500
    blacklist: '.no-smoothState'
    prefetch: false
    prefetchOn: 'mouseover touchstart'
    cacheLength: 0
    loadingClass: 'is-loading'
    alterRequest: (request) ->
      request
    onBefore: ($currentTarget, $container) ->
    onStart:
      duration: 0
      render: ($container) ->
    onProgress:
      duration: 0
      render: ($container) ->
    onReady:
      duration: 0
      render: ($container, $newContent) ->
        $container.html $newContent
        return
    onAfter: ($container, $newContent) ->
  utility =
    isExternal: (url) ->
      match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/)
      if typeof match[1] == 'string' and match[1].length > 0 and match[1].toLowerCase() != window.location.protocol
        return true
      if typeof match[2] == 'string' and match[2].length > 0 and match[2].replace(new RegExp(':(' + {
          'http:': 80
          'https:': 443
        }[window.location.protocol] + ')?$'), '') != window.location.host
        return true
      false
    stripHash: (href) ->
      href.replace /#.*/, ''
    isHash: (href, prev) ->
      prev = prev or window.location.href
      hasHash = if href.indexOf('#') > -1 then true else false
      samePath = if utility.stripHash(href) == utility.stripHash(prev) then true else false
      hasHash and samePath
    translate: (request) ->
      `var defaults`
      defaults =
        dataType: 'html'
        type: 'GET'
      if typeof request == 'string'
        request = $.extend({}, defaults, url: request)
      else
        request = $.extend({}, defaults, request)
      request
    shouldLoadAnchor: ($anchor, blacklist) ->
      href = $anchor.prop('href')
      # URL will only be loaded if it's not an external link, hash, or blacklisted
      !utility.isExternal(href) and !utility.isHash(href) and !$anchor.is(blacklist) and !$anchor.prop('target')
    clearIfOverCapacity: (cache, cap) ->
      # Polyfill Object.keys if it doesn't exist
      if !Object.keys

        Object.keys = (obj) ->
          keys = []
          k = undefined
          for k of obj
            `k = k`
            if Object::hasOwnProperty.call(obj, k)
              keys.push k
          keys

      if Object.keys(cache).length > cap
        cache = {}
      cache
    storePageIn: (object, url, doc, id) ->
      $html = $('<html></html>').append($(doc))
      object[url] =
        status: 'loaded'
        title: $html.find('title').first().text()
        html: $html.find('#' + id)
      object
    triggerAllAnimationEndEvent: ($element, resetOn) ->
      resetOn = ' ' + resetOn or ''
      animationCount = 0
      animationstart = 'animationstart webkitAnimationStart oanimationstart MSAnimationStart'
      animationend = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd'
      eventname = 'allanimationend'

      onAnimationStart = (e) ->
        if $(e.delegateTarget).is($element)
          e.stopPropagation()
          animationCount++
        return

      onAnimationEnd = (e) ->
        if $(e.delegateTarget).is($element)
          e.stopPropagation()
          animationCount--
          if animationCount == 0
            $element.trigger eventname
        return

      $element.on animationstart, onAnimationStart
      $element.on animationend, onAnimationEnd
      $element.on 'allanimationend' + resetOn, ->
        animationCount = 0
        utility.redraw $element
        return
      return
    redraw: ($element) ->
      $element.height()
      return

  onPopState = (e) ->
    if e.state != null
      url = window.location.href
      $page = $('#' + e.state.id)
      page = $page.data('smoothState')
      if page.href != url and !utility.isHash(url, page.href)
        page.load url, false
    return

  Smoothstate = (element, options) ->
    $container = $(element)
    elementId = $container.prop('id')
    targetHash = null
    isTransitioning = false
    cache = {}
    currentHref = window.location.href

    clear = (url) ->
      url = url or false
      if url and cache.hasOwnProperty(url)
        delete cache[url]
      else
        cache = {}
      $container.data('smoothState').cache = cache
      return

    fetch = (request, callback) ->
      # Sets a default in case a callback is not defined
      callback = callback or $.noop
      # Allows us to accept a url string or object as the ajax settings
      settings = utility.translate(request)
      # Check the length of the cache and clear it if needed
      cache = utility.clearIfOverCapacity(cache, options.cacheLength)
      # Don't prefetch if we have the content already or if it's a form
      if cache.hasOwnProperty(settings.url) and typeof settings.data == 'undefined'
        return
      # Let other parts of the code know we're working on getting the content
      cache[settings.url] = status: 'fetching'
      # Make the ajax request
      ajaxRequest = $.ajax(settings)
      # Store contents in cache variable if successful
      ajaxRequest.success (html) ->
        utility.storePageIn cache, settings.url, html, elementId
        $container.data('smoothState').cache = cache
        return
      # Mark as error to be acted on later
      ajaxRequest.error ->
        cache[settings.url].status = 'error'
        return
      # Call fetch callback
      if callback
        ajaxRequest.complete callback
      return

    repositionWindow = ->
      # Scroll to a hash anchor on destination page
      if targetHash
        $targetHashEl = $(targetHash, $container)
        if $targetHashEl.length
          newPosition = $targetHashEl.offset().top
          $body.sectionrollTop newPosition
        targetHash = null
      return

    updateContent = (url) ->
      # If the content has been requested and is done:
      containerId = '#' + elementId
      $newContent = if cache[url] then $(cache[url].html.html()) else null
      if $newContent.length
        # Update the title
        document.title = cache[url].title
        # Update current url
        $container.data('smoothState').href = url
        # Remove loading class
        if options.loadingClass
          $body.removeClass options.loadingClass
        # Call the onReady callback and set delay
        options.onReady.render $container, $newContent
        $container.one 'ss.onReadyEnd', ->
          # Allow prefetches to be made again
          isTransitioning = false
          # Run callback
          options.onAfter $container, $newContent
          repositionWindow()
          return
        window.setTimeout (->
          $container.trigger 'ss.onReadyEnd'
          return
        ), options.onReady.duration
      else if !$newContent and options.debug and consl
        # Throw warning to help debug in debug mode
        consl.warn 'No element with an id of ' + containerId + ' in response from ' + url + ' in ' + cache
      else
        # No content availble to update with, aborting...
        window.location = url
      return

    load = (request, push, cacheResponse) ->
      settings = utility.translate(request)

      ###* Makes these optional variables by setting defaults. ###

      if typeof push == 'undefined'
        push = true
      if typeof cacheResponse == 'undefined'
        cacheResponse = true
      hasRunCallback = false
      callbBackEnded = false
      responses =
        loaded: ->
          eventName = if hasRunCallback then 'ss.onProgressEnd' else 'ss.onStartEnd'
          if !callbBackEnded or !hasRunCallback
            $container.one eventName, ->
              updateContent settings.url
              if !cacheResponse
                clear settings.url
              return
          else if callbBackEnded
            updateContent settings.url
          if push
            window.history.pushState { id: elementId }, cache[settings.url].title, settings.url
          if callbBackEnded and !cacheResponse
            clear settings.url
          return
        fetching: ->
          if !hasRunCallback
            hasRunCallback = true
            # Run the onProgress callback and set trigger
            $container.one 'ss.onStartEnd', ->
              # Add loading class
              if options.loadingClass
                $body.addClass options.loadingClass
              options.onProgress.render $container
              window.setTimeout (->
                $container.trigger 'ss.onProgressEnd'
                callbBackEnded = true
                return
              ), options.onProgress.duration
              return
          window.setTimeout (->
            # Might of been canceled, better check!
            if cache.hasOwnProperty(settings.url)
              responses[cache[settings.url].status]()
            return
          ), 10
          return
        error: ->
          if options.debug and consl
            consl.log 'There was an error loading: ' + settings.url
          else
            window.location = settings.url
          return
      if !cache.hasOwnProperty(settings.url)
        fetch settings
      # Run the onStart callback and set trigger
      options.onStart.render $container
      window.setTimeout (->
        $body.sectionrollTop 0
        $container.trigger 'ss.onStartEnd'
        return
      ), options.onStart.duration
      # Start checking for the status of content
      responses[cache[settings.url].status]()
      return

    hoverAnchor = (event) ->
      request = undefined
      $anchor = $(event.currentTarget)
      if utility.shouldLoadAnchor($anchor, options.blacklist) and !isTransitioning
        event.stopPropagation()
        request = utility.translate($anchor.prop('href'))
        request = options.alterRequest(request)
        fetch request
      return

    clickAnchor = (event) ->
      # Ctrl (or Cmd) + click must open a new tab
      $anchor = $(event.currentTarget)
      if !event.metaKey and !event.ctrlKey and utility.shouldLoadAnchor($anchor, options.blacklist)
        # stopPropagation so that event doesn't fire on parent containers.
        event.stopPropagation()
        event.preventDefault()
        # Apply rate limiting.
        if !isRateLimited()
          # Set the delay timeout until the next event is allowed.
          setRateLimitRepeatTime()
          request = utility.translate($anchor.prop('href'))
          isTransitioning = true
          targetHash = $anchor.prop('hash')
          # Allows modifications to the request
          request = options.alterRequest(request)
          options.onBefore $anchor, $container
          load request
      return

    submitForm = (event) ->
      $form = $(event.currentTarget)
      if !$form.is(options.blacklist)
        event.preventDefault()
        event.stopPropagation()
        # Apply rate limiting.
        if !isRateLimited()
          # Set the delay timeout until the next event is allowed.
          setRateLimitRepeatTime()
          request =
            url: $form.prop('action')
            data: $form.serialize()
            type: $form.prop('method')
          isTransitioning = true
          request = options.alterRequest(request)
          if request.type.toLowerCase() == 'get'
            request.url = request.url + '?' + request.data
          # Call the onReady callback and set delay
          options.onBefore $form, $container
          load request, undefined, options.allowFormCaching
      return

    rateLimitRepeatTime = 0

    isRateLimited = ->
      isFirstClick = options.repeatDelay == null
      isDelayOver = parseInt(Date.now()) > rateLimitRepeatTime
      !(isFirstClick or isDelayOver)

    setRateLimitRepeatTime = ->
      rateLimitRepeatTime = parseInt(Date.now()) + parseInt(options.repeatDelay)
      return

    bindEventHandlers = ($element) ->
      if options.anchors
        $element.on 'click', options.anchors, clickAnchor
        if options.prefetch
          $element.on options.prefetchOn, options.anchors, hoverAnchor
      if options.forms
        $element.on 'submit', options.forms, submitForm
      return

    restartCSSAnimations = ->
      classes = $container.prop('class')
      $container.removeClass classes
      utility.redraw $container
      $container.addClass classes
      return

    ###* Merge defaults and global options into current configuration ###

    options = $.extend({}, $.fn.smoothState.options, options)

    ###* Sets a default state ###

    if window.history.state == null
      window.history.replaceState { id: elementId }, document.title, currentHref

    ###* Stores the current page in cache variable ###

    utility.storePageIn cache, currentHref, document.documentElement.outerHTML, elementId

    ###* Bind all of the event handlers on the container, not anchors ###

    utility.triggerAllAnimationEndEvent $container, 'ss.onStartEnd ss.onProgressEnd ss.onEndEnd'

    ###* Bind all of the event handlers on the container, not anchors ###

    bindEventHandlers $container

    ###* Public methods ###

    {
      href: currentHref
      cache: cache
      clear: clear
      load: load
      fetch: fetch
      restartCSSAnimations: restartCSSAnimations
    }

  declaresmoothState = (options) ->
    @each ->
      tagname = @tagName.toLowerCase()
      # Checks to make sure the smoothState element has an id and isn't already bound
      if @id and tagname != 'body' and tagname != 'html' and !$.data(this, 'smoothState')
        # Makes public methods available via $('element').data('smoothState');
        $.data this, 'smoothState', new Smoothstate(this, options)
      else if !@id and consl
        # Throw warning if in debug mode
        consl.warn 'Every smoothState container needs an id but the following one does not have one:', this
      else if (tagname == 'body' or tagname == 'html') and consl
        # We dont support making th html or the body element the smoothstate container
        consl.warn 'The smoothstate container cannot be the ' + @tagName + ' tag'
      return

  ###* Sets the popstate function ###

  window.onpopstate = onPopState

  ###* Makes utility functions public for unit tests ###

  $.smoothStateUtility = utility

  ###* Defines the smoothState plugin ###

  $.fn.smoothState = declaresmoothState

  ### expose the default options ###

  $.fn.smoothState.options = defaults
  return
) jQuery, window, document
