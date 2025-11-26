'use strict';

module.exports = function(options) {
  var accountMock, body, customerMock, entryMock, method, projectMock, response, serviceMock, url, userMock;
  url = options.url;
  method = options.method || 'GET';

  // Create axios-compatible response structure
  response = {
    status: 200,
    data: {},
    config: {
      method: method.toLowerCase()
    }
  };

  serviceMock = {
    service: {
      billable: true,
      created_at: "2013-05-01T12:06:57+02:00",
      hourly_rate: null,
      id: 1,
      name: "Service",
      note: "",
      updated_at: "2013-05-01T12:06:57+02:00",
      archived: false
    }
  };
  customerMock = {
    customer: {
      created_at: "2013-05-01T12:06:57+02:00",
      hourly_rate: null,
      id: 1,
      name: "Customer",
      note: "",
      updated_at: "2013-05-01T12:06:57+02:00",
      archived: false,
      active_hourly_rate: "hourly_rate",
      hourly_rates_per_service: []
    }
  };
  projectMock = {
    project: {
      budget: 0,
      budget_type: "minutes",
      created_at: "2013-05-04T22:08:10+02:00",
      customer_id: 1,
      hourly_rate: 0,
      id: 1,
      name: "Project",
      note: "",
      updated_at: "2013-05-04T22:08:10+02:00",
      archived: false,
      active_hourly_rate: null,
      hourly_rates_per_service: [],
      customer_name: "Customer"
    }
  };
  userMock = {
    user: {
      created_at: "2013-05-01T11:58:57+02:00",
      email: "user@example.com",
      id: 1,
      name: "User",
      note: "",
      updated_at: "2013-05-04T22:07:36+02:00",
      archived: false,
      language: "en",
      role: "owner"
    }
  };
  entryMock = {
    time_entry: {
      billable: true,
      created_at: "2013-05-02T09:13:22+02:00",
      date_at: "2013-01-01",
      id: 1,
      locked: false,
      minutes: 100,
      project_id: 1,
      revenue: 100,
      service_id: 1,
      updated_at: "2013-05-02T15:24:38+02:00",
      user_id: 1,
      note: "",
      user_name: "User",
      customer_id: 1,
      customer_name: "Customer",
      project_name: "Project",
      service_name: "Service"
    }
  };
  accountMock = {
    account: {
      created_at: "2013-05-01T11:58:57+02:00",
      currency: "EUR",
      id: 1,
      name: "name",
      title: "Name",
      updated_at: "2013-05-01T12:32:47+02:00"
    }
  };

  switch (url) {
    case 'https://account.mite.de/services.json':
      if (options.method === 'POST') {
        response.status = 401;
        body = serviceMock;
      } else {
        response.status = 200;
        body = [serviceMock];
      }
      break;
    case 'https://account.mite.de/services/archived.json':
      response.status = 200;
      body = [serviceMock];
      break;
    case 'https://account.mite.de/services/1.json':
      response.status = 200;
      body = serviceMock;
      break;
    case 'https://account.mite.de/customers.json':
      if (options.method === 'POST') {
        response.status = 401;
        body = customerMock;
      } else {
        response.status = 200;
        body = [customerMock];
      }
      break;
    case 'https://account.mite.de/customers/archived.json':
      response.status = 200;
      body = [customerMock];
      break;
    case 'https://account.mite.de/customers/1.json':
      response.status = 200;
      body = customerMock;
      break;
    case 'https://account.mite.de/projects.json':
      if (options.method === 'POST') {
        response.status = 401;
        body = projectMock;
      } else {
        response.status = 200;
        body = [projectMock];
      }
      break;
    case 'https://account.mite.de/projects/archived.json':
      response.status = 200;
      body = [projectMock];
      break;
    case 'https://account.mite.de/projects/1.json':
      response.status = 200;
      body = projectMock;
      break;
    case 'https://account.mite.de/users.json':
      response.status = 200;
      body = [userMock];
      break;
    case 'https://account.mite.de/users/archived.json':
      response.status = 200;
      body = [userMock];
      break;
    case 'https://account.mite.de/users/1.json':
      response.status = 200;
      body = userMock;
      break;
    case 'https://account.mite.de/daily/2013/1/1.json':
      response.status = 200;
      body = [entryMock];
      break;
    case 'https://account.mite.de/time_entries.json':
      if (options.method === 'POST') {
        response.status = 401;
        body = entryMock;
      } else {
        response.status = 200;
        body = [entryMock];
      }
      break;
    case 'https://account.mite.de/time_entries/1.json':
      response.status = 200;
      body = entryMock;
      break;
    case 'https://account.mite.de/myself.json':
      response.status = 200;
      body = userMock;
      break;
    case 'https://account.mite.de/account.json':
      response.status = 200;
      body = accountMock;
      break;
    default:
      response.status = 200;
      body = {};
  }

  response.data = body;

  // Return a Promise that resolves with the response
  return Promise.resolve(response);
};
