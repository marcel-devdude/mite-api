'use strict';

var splice = [].splice;
var url = require('url');
var request = require('request');

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
  options = Object.assign({}, defaults, options);
  api = {};
  handleResponse = function(err, response, body, done) {
    if (err) {
      return done(err, null);
    }
    try {
      // always try to parse body as JSON
      body = JSON.parse(body);
    } catch (error) {
      err = error;
    }
    switch (response.req.method) {
      case 'GET':
      case 'PUT':
      case 'DELETE':
        if (response.statusCode === 200) {
          err = null;
        } else {
          err = new Error(body.error || body);
          err.response = response;
        }
        break;
      case 'POST':
        if (response.statusCode === 201) {
          err = null;
        } else {
          err = new Error(body.error || body);
          err.response = response;
        }
        break;
      default:
        body = null;
        err = new Error(500);
        err.response = response;
    }
    return done(err, body);
  };
  makeRequest = function(...args) {
    var done, ref, requestOptions;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    requestOptions = Object.assign({
      url: args[0],
      headers: {
        'User-Agent': options.applicationName
      }
    }, args[1]);
    if (['POST', 'PUT', 'DELETE'].indexOf(requestOptions.method !== -1)) {
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
  api.getAccount = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('account', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getMyself = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('myself', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getTimeEntries = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('timeEntries', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getDailyTimeEntries = function(...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
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
  api.getTimeEntry = function(id, ...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    query = args[0] || {};
    query.id = id;
    apiUrl = api.getUrl('timeEntry', query);
    return makeRequest(apiUrl, done);
  };
  api.addTimeEntry = function(entry, done) {
    var apiUrl;
    apiUrl = api.getUrl('timeEntries');
    if (entry.time_entry == null) {
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
    if (entry.time_entry == null) {
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
  api.getUsers = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('users', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getArchivedUsers = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('usersArchived', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getUser = function(id, ...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    query = args[0] || {};
    query.id = id;
    apiUrl = api.getUrl('user', query);
    return makeRequest(apiUrl, done);
  };
  api.getProjects = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('projects', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getArchivedProjects = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('projectsArchived', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getProject = function(id, ...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    query = args[0] || {};
    query.id = id;
    apiUrl = api.getUrl('project', query);
    return makeRequest(apiUrl, done);
  };
  api.addProject = function(project, done) {
    var apiUrl;
    apiUrl = api.getUrl('projects');
    if (project.project == null) {
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
    if (project.project == null) {
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
  api.getCustomers = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('customers', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getArchivedCustomers = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('customersArchived', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getCustomer = function(id, ...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    query = args[0] || {};
    query.id = id;
    apiUrl = api.getUrl('customer', query);
    return makeRequest(apiUrl, done);
  };
  api.addCustomer = function(customer, done) {
    var apiUrl;
    apiUrl = api.getUrl('customers');
    if (customer.customer == null) {
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
    if (customer.customer == null) {
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
  api.getServices = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('services', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getArchivedServices = function(...args) {
    var apiUrl, done, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    apiUrl = api.getUrl('servicesArchived', args[0]);
    return makeRequest(apiUrl, done);
  };
  api.getService = function(id, ...args) {
    var apiUrl, done, query, ref;
    ref = args, [...args] = ref, [done] = splice.call(args, -1);
    query = args[0] || {};
    query.id = id;
    apiUrl = api.getUrl('service', query);
    return makeRequest(apiUrl, done);
  };
  api.addService = function(service, done) {
    var apiUrl;
    apiUrl = api.getUrl('services');
    if (service.service == null) {
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
    if (service.service == null) {
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
  api.getUrl = function(name, query = {}) {
    var apiUrl;
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
