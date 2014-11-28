_ = require 'underscore'
url = require 'url'
request = require 'request'

module.exports = (options) ->

  defaults = {
    account: false
    apiKey: false
    applicationName: false

    apiProtocol: 'https:'
    apiUrl: 'mite.yo.lk'
    apiExtension: '.json'
    query: false

    request: request

    urls: {
      account: 'account'
      myself: 'myself'

      services: 'services'
      service: 'services/{id}'
      servicesArchived: 'services/archived'

      customers: 'customers'
      customer: 'customers/{id}'
      customersArchived: 'customers/archived'

      projects: 'projects'
      project: 'projects/{id}'
      projectsArchived: 'projects/archived'

      users: 'users'
      user: 'users/{id}'
      usersArchived: 'users/archived'

      timeEntries: 'time_entries'
      timeEntry: 'time_entries/{id}'
      daily: 'daily'
      dailyDate: 'daily/{year}/{month}/{day}'
    }
  }

  options = _.extend defaults, options

  api = {}

  handleResponse = (err, response, body, done) ->
    if err
      done err, null
    else
      switch response.req.method
        when 'GET', 'PUT', 'DELETE'
          if response.statusCode == 200
            body = JSON.parse body
            err = null
          else
            err = response.statusCode + body

        when 'POST'
          if response.statusCode == 201
            body = JSON.parse body
            err = null
          else
            err = body

        else
          body = null
          err = 500

      done err, body

  makeRequest = (args..., done) ->
    requestOptions = _.extend {
      url: args[0]
      headers: {
        'User-Agent': options.applicationName
      }
    }, args[1]

    if _.indexOf ['POST', 'PUT', 'DELETE'], requestOptions.method != -1
      requestOptions.headers['Content-Type'] = 'application/json'

    if options.query == false
      requestOptions.headers['X-MiteApiKey'] = options.apiKey

    options.request requestOptions, (err, response, body) ->
      handleResponse(err, response, body, done)

  api.getOption = (name) ->
    if options[name]?
      return options[name]
    else
      return null

  api.getAccount = (args..., done) ->
    apiUrl = api.getUrl 'account', args[0]
    makeRequest apiUrl, done

  api.getMyself = (args..., done) ->
    apiUrl = api.getUrl 'myself', args[0]
    makeRequest apiUrl, done

  api.getTimeEntries = (args..., done)->
    apiUrl = api.getUrl 'timeEntries', args[0]
    makeRequest apiUrl, done

  api.getDailyTimeEntries = (args..., done)->
    if args.length >= 3
      query = args[3] || {}
      query.year = args[0]
      query.month = args[1]
      query.day = args[2]
      apiUrl = api.getUrl 'dailyDate', query
    else
      query = args[0]
      apiUrl = api.getUrl 'daily', query

    makeRequest apiUrl, done

  api.getTimeEntry = (id, args..., done)->
    query = (args[0]) || {}
    query.id = id
    apiUrl = api.getUrl 'timeEntry', query
    makeRequest apiUrl, done

  api.addTimeEntry = (entry, done) ->
    apiUrl = api.getUrl 'timeEntries'

    if !entry.time_entry?
      entry = { time_entry: entry }

    makeRequest apiUrl, { method: 'POST', body: JSON.stringify entry }, done

  api.updateTimeEntry = (id, entry, done)->
    apiUrl = api.getUrl 'timeEntry', { id: id }

    if !entry.time_entry?
      entry = { time_entry: entry }

    makeRequest apiUrl, { method: 'PUT', body: JSON.stringify entry }, done

  api.deleteTimeEntry = (id, done)->
    apiUrl = api.getUrl 'timeEntry', { id: id }
    makeRequest apiUrl, { method: 'DELETE' }, done

  api.getUsers = (args..., done)->
    apiUrl = api.getUrl 'users', args[0]
    makeRequest apiUrl, done

  api.getArchivedUsers = (args..., done)->
    apiUrl = api.getUrl 'usersArchived', args[0]
    makeRequest apiUrl, done

  api.getUser = (id, args..., done)->
    query = (args[0]) || {}
    query.id = id
    apiUrl = api.getUrl 'user', query
    makeRequest apiUrl, done

  api.getProjects = (args..., done)->
    apiUrl = api.getUrl 'projects', args[0]
    makeRequest apiUrl, done

  api.getArchivedProjects = (args..., done)->
    apiUrl = api.getUrl 'projectsArchived', args[0]
    makeRequest apiUrl, done

  api.getProject = (id, args..., done)->
    query = (args[0]) || {}
    query.id = id
    apiUrl = api.getUrl 'project', query
    makeRequest apiUrl, done

  api.addProject = (project, done) ->
    apiUrl = api.getUrl 'projects'

    if !project.project?
      project = { project: project }

    makeRequest apiUrl, { method: 'POST', body: JSON.stringify project }, done

  api.updateProject = (id, project, done)->
    apiUrl = api.getUrl 'project', { id: id }

    if !project.project?
      project = { project: project }

    makeRequest apiUrl, { method: 'PUT', body: JSON.stringify project }, done

  api.deleteProject = (id, done)->
    apiUrl = api.getUrl 'project', { id: id }
    makeRequest apiUrl, { method: 'DELETE' }, done

  api.getCustomers = (args..., done)->
    apiUrl = api.getUrl 'customers', args[0]
    makeRequest apiUrl, done

  api.getArchivedCustomers = (args..., done)->
    apiUrl = api.getUrl 'customersArchived', args[0]
    makeRequest apiUrl, done

  api.getCustomer = (id, args..., done)->
    query = (args[0]) || {}
    query.id = id
    apiUrl = api.getUrl 'customer', query
    makeRequest apiUrl, done

  api.addCustomer = (customer, done) ->
    apiUrl = api.getUrl 'customers'

    if !customer.customer?
      customer = { customer: customer }

    makeRequest apiUrl, { method: 'POST', body: JSON.stringify customer }, done

  api.updateCustomer = (id, customer, done)->
    apiUrl = api.getUrl 'customer', { id: id }

    if !customer.customer?
      customer = { customer: customer }

    makeRequest apiUrl, { method: 'PUT', body: JSON.stringify customer }, done

  api.deleteCustomer = (id, done)->
    apiUrl = api.getUrl 'customer', { id: id }
    makeRequest apiUrl, { method: 'DELETE' }, done

  api.getServices = (args..., done)->
    apiUrl = api.getUrl 'services', args[0]
    makeRequest apiUrl, done

  api.getArchivedServices = (args..., done)->
    apiUrl = api.getUrl 'servicesArchived', args[0]
    makeRequest apiUrl, done

  api.getService = (id, args..., done)->
    query = (args[0]) || {}
    query.id = id
    apiUrl = api.getUrl 'service', query
    makeRequest apiUrl, done

  api.addService = (service, done) ->
    apiUrl = api.getUrl 'services'

    if !service.service?
      service = { service: service }

    makeRequest apiUrl, { method: 'POST', body: JSON.stringify service }, done

  api.updateService = (id, service, done)->
    apiUrl = api.getUrl 'service', { id: id }

    if !service.service?
      service = { service: service }

    makeRequest apiUrl, { method: 'PUT', body: JSON.stringify service }, done

  api.deleteService = (id, done)->
    apiUrl = api.getUrl 'service', { id: id }
    makeRequest apiUrl, { method: 'DELETE' }, done

  api.getUrl = (name, query = {}) ->
    if options.urls[name]?
      apiUrl = options.urls[name]
      apiUrl = apiUrl.replace /\{([^}]+)\}/g, (token) ->
        token = token.substr 1, token.length - 2

        if query[token]?
          replaceValue = query[token]
          delete query[token]
          return replaceValue
        else
          return token

      apiUrl = {
        protocol: options.apiProtocol,
        hostname: options.account + '.' + options.apiUrl,
        pathname: apiUrl + options.apiExtension
        query: query
      }

      if options.query == true
        apiUrl.query.api_key = options.apiKey

      return url.format apiUrl
    else
      return false

  return api
