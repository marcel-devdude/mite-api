# mite-api

Simple Node.js module to access the [mite-api](http://mite.yo.lk/en/api/).

## Getting Started
Install the module with: `npm install mite-api`

```javascript
var miteApi = require('mite-api');
var mite = miteApi({
    account: 'account',
    apiKey: 'apiKey',
    applicationName: 'applicationName'
});
```

## miteApi(options)

Available options are:

* `account` - the name of your mite account
* `apiKey` - your personal API-Key
* `applicationName` - your application name. The mite-api wants to be identify all apps. Also the `applicationName` is set as the `User-Agent`-header in every request.
* `query` - if set to true the `apiKey` is added to the url as `api_key` parameter. Otherwise the `apiKey` is in the `X-MiteApiKey`-header.

## API-Methods

The optional `options`-object is passed as query parameters to the api-url. For example you can add properties to limit the output. See the [mite-api](http://mite.yo.lk/en/api/) for more information.

```javascript
var options = {
    limit: 100,
    page: 2
};

// more complex example (http://mite.yo.lk/en/api/time-entries.html)
var options = {
    customer_id: 1,
    billable: true,
    from: '2012-01-01',
    to: '2012-12-31',
    group_by: 'project'
};
```

The `done` callback is called when the request has finished. The first parameter is an `err` and the second the result of the api-call.

* mite.getAccount()
* mite.getMyself()
* mite.getTimeEntries([options], done)
* mite.getDailyTimeEntries(year, month, day, [options], done)
* mite.getTimeEntry(id, [options], done)
* mite.addTimeEntry(entry, done)
* mite.updateTimeEntry(id, entry, done)
* mite.deleteTimeEntry(id, done)
* mite.getUsers([options], done)
* mite.getArchivedUsers([options], done)
* mite.getUser(id, [options], done)
* mite.getCustomers([options], done)
* mite.getArchivedCustomers([options], done)
* mite.getCustomer(id, [options], done)
* mite.addCustomer(customer, done)
* mite.updateCustomer(id, customer, done)
* mite.deleteCustomer(id, done)
* mite.getProjects([options], done)
* mite.getArchivedProjects([options], done)
* mite.getProject(id, [options], done)
* mite.addProject(project, done)
* mite.updateProject(id, project, done)
* mite.deleteProject(id, done)
* mite.getServices([options], done)
* mite.getArchivedServices([options], done)
* mite.getService(id, [options], done)
* mite.addService(service, done)
* mite.updateService(id, service, done)
* mite.deleteService(id, done)
