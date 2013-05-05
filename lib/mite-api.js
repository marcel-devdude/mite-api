(function() {
  var request, url, _,
    __slice = [].slice;

  _ = require('underscore');

  url = require('url');

  request = require('request');

  module.exports = function(options) {
    var api, defaults, handleResponse, makeRequest;
    defaults = {
      account: false,
      apiKey: false,
      applicationName: false,
      apiProtocol: 'https:',
      apiUrl: 'mite.yo.lk',
      apiExtension: '.json',
      query: false,
      request: request,
      urls: {
        account: 'account',
        myself: 'myself',
        services: 'services',
        service: 'services/{id}',
        servicesArchived: 'services/archived',
        customers: 'customers',
        customer: 'customers/{id}',
        customersArchived: 'customers/archived',
        projects: 'projects',
        project: 'projects/{id}',
        projectsArchived: 'projects/archived',
        users: 'users',
        user: 'users/{id}',
        usersArchived: 'users/archived',
        timeEntries: 'time_entries',
        timeEntry: 'time_entries/{id}',
        daily: 'daily',
        dailyDate: 'daily/{year}/{month}/{day}'
      }
    };
    options = _.extend(defaults, options);
    api = {};
    handleResponse = function(err, response, body, done) {
      if (err) {
        return done(err, null);
      } else {
        switch (response.req.method) {
          case 'GET':
          case 'PUT':
          case 'DELETE':
            if (response.statusCode === 200) {
              body = JSON.parse(body);
              err = null;
            } else {
              err = response.statusCode + body;
            }
            break;
          case 'POST':
            if (response.statusCode === 401) {
              body = JSON.parse(body);
              err = null;
            } else {
              err = body;
            }
            break;
          default:
            body = null;
            err = 500;
        }
        return done(err, body);
      }
    };
    makeRequest = function() {
      var args, done, requestOptions, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      requestOptions = _.extend({
        url: args[0],
        headers: {
          'User-Agent': options.applicationName
        }
      }, args[1]);
      if (_.indexOf(['POST', 'PUT', 'DELETE'], requestOptions.method !== -1)) {
        requestOptions.headers['Content-Type'] = 'application/json';
      }
      if (options.query === false) {
        requestOptions.headers['X-MiteApiKey'] = options.apiKey;
      }
      return options.request(requestOptions, function(err, response, body) {
        return handleResponse(err, response, body, done);
      });
    };
    api.getOption = function(name) {
      if (options[name] != null) {
        return options[name];
      } else {
        return null;
      }
    };
    api.getAccount = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('account', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getMyself = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('myself', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getTimeEntries = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('timeEntries', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getDailyTimeEntries = function() {
      var apiUrl, args, done, query, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      if (args.length >= 3) {
        query = args[3] || {};
        query.year = args[0];
        query.month = args[1];
        query.day = args[2];
        apiUrl = api.getUrl('dailyDate', query);
      } else {
        query = args[0];
        apiUrl = api.getUrl('daily', query);
      }
      return makeRequest(apiUrl, done);
    };
    api.getTimeEntry = function() {
      var apiUrl, args, done, id, query, _i;
      id = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), done = arguments[_i++];
      query = args[0] || {};
      query.id = id;
      apiUrl = api.getUrl('timeEntry', query);
      return makeRequest(apiUrl, done);
    };
    api.addTimeEntry = function(entry, done) {
      var apiUrl;
      apiUrl = api.getUrl('timeEntries');
      if (!(entry.time_entry != null)) {
        entry = {
          time_entry: entry
        };
      }
      return makeRequest(apiUrl, {
        method: 'POST',
        body: JSON.stringify(entry)
      }, done);
    };
    api.updateTimeEntry = function(id, entry, done) {
      var apiUrl;
      apiUrl = api.getUrl('timeEntry', {
        id: id
      });
      if (!(entry.time_entry != null)) {
        entry = {
          time_entry: entry
        };
      }
      return makeRequest(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(entry)
      }, done);
    };
    api.deleteTimeEntry = function(id, done) {
      var apiUrl;
      apiUrl = api.getUrl('timeEntry', {
        id: id
      });
      return makeRequest(apiUrl, {
        method: 'DELETE'
      }, done);
    };
    api.getUsers = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('users', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getArchivedUsers = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('usersArchived', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getUser = function() {
      var apiUrl, args, done, id, query, _i;
      id = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), done = arguments[_i++];
      query = args[0] || {};
      query.id = id;
      apiUrl = api.getUrl('user', query);
      return makeRequest(apiUrl, done);
    };
    api.getProjects = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('projects', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getArchivedProjects = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('projectsArchived', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getProject = function() {
      var apiUrl, args, done, id, query, _i;
      id = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), done = arguments[_i++];
      query = args[0] || {};
      query.id = id;
      apiUrl = api.getUrl('project', query);
      return makeRequest(apiUrl, done);
    };
    api.addProject = function(project, done) {
      var apiUrl;
      apiUrl = api.getUrl('projects');
      if (!(project.project != null)) {
        project = {
          project: project
        };
      }
      return makeRequest(apiUrl, {
        method: 'POST',
        body: JSON.stringify(project)
      }, done);
    };
    api.updateProject = function(id, project, done) {
      var apiUrl;
      apiUrl = api.getUrl('project', {
        id: id
      });
      if (!(project.project != null)) {
        project = {
          project: project
        };
      }
      return makeRequest(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(project)
      }, done);
    };
    api.deleteProject = function(id, done) {
      var apiUrl;
      apiUrl = api.getUrl('project', {
        id: id
      });
      return makeRequest(apiUrl, {
        method: 'DELETE'
      }, done);
    };
    api.getCustomers = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('customers', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getArchivedCustomers = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('customersArchived', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getCustomer = function() {
      var apiUrl, args, done, id, query, _i;
      id = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), done = arguments[_i++];
      query = args[0] || {};
      query.id = id;
      apiUrl = api.getUrl('customer', query);
      return makeRequest(apiUrl, done);
    };
    api.addCustomer = function(customer, done) {
      var apiUrl;
      apiUrl = api.getUrl('customers');
      if (!(customer.customer != null)) {
        customer = {
          customer: customer
        };
      }
      return makeRequest(apiUrl, {
        method: 'POST',
        body: JSON.stringify(customer)
      }, done);
    };
    api.updateCustomer = function(id, customer, done) {
      var apiUrl;
      apiUrl = api.getUrl('customer', {
        id: id
      });
      if (!(customer.customer != null)) {
        customer = {
          customer: customer
        };
      }
      return makeRequest(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(customer)
      }, done);
    };
    api.deleteCustomer = function(id, done) {
      var apiUrl;
      apiUrl = api.getUrl('customer', {
        id: id
      });
      return makeRequest(apiUrl, {
        method: 'DELETE'
      }, done);
    };
    api.getServices = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('services', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getArchivedServices = function() {
      var apiUrl, args, done, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
      apiUrl = api.getUrl('servicesArchived', args[0]);
      return makeRequest(apiUrl, done);
    };
    api.getService = function() {
      var apiUrl, args, done, id, query, _i;
      id = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), done = arguments[_i++];
      query = args[0] || {};
      query.id = id;
      apiUrl = api.getUrl('service', query);
      return makeRequest(apiUrl, done);
    };
    api.addService = function(service, done) {
      var apiUrl;
      apiUrl = api.getUrl('services');
      if (!(service.service != null)) {
        service = {
          service: service
        };
      }
      return makeRequest(apiUrl, {
        method: 'POST',
        body: JSON.stringify(service)
      }, done);
    };
    api.updateService = function(id, service, done) {
      var apiUrl;
      apiUrl = api.getUrl('service', {
        id: id
      });
      if (!(service.service != null)) {
        service = {
          service: service
        };
      }
      return makeRequest(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(service)
      }, done);
    };
    api.deleteService = function(id, done) {
      var apiUrl;
      apiUrl = api.getUrl('service', {
        id: id
      });
      return makeRequest(apiUrl, {
        method: 'DELETE'
      }, done);
    };
    api.getUrl = function(name, query) {
      var apiUrl;
      if (query == null) {
        query = {};
      }
      if (options.urls[name] != null) {
        apiUrl = options.urls[name];
        apiUrl = apiUrl.replace(/\{([^}]+)\}/g, function(token) {
          var replaceValue;
          token = token.substr(1, token.length - 2);
          if (query[token] != null) {
            replaceValue = query[token];
            delete query[token];
            return replaceValue;
          } else {
            return token;
          }
        });
        apiUrl = {
          protocol: options.apiProtocol,
          hostname: options.account + '.' + options.apiUrl,
          pathname: apiUrl + options.apiExtension,
          query: query
        };
        if (options.query === true) {
          apiUrl.query.api_key = options.apiKey;
        }
        return url.format(apiUrl);
      } else {
        return false;
      }
    };
    return api;
  };

}).call(this);
