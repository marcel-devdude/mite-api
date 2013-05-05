(function() {
  var miteApi, mocha, requestMock;

  mocha = require('mocha');

  requestMock = require('./requestMock');

  miteApi = require('../lib/mite-api');

  describe('Configuration', function() {
    it('should be set default options', function() {
      var mite;
      mite = miteApi();
      mite.getOption('account').should.be["false"];
      mite.getOption('apiKey').should.be["false"];
      return mite.getOption('applicationName').should.be["false"];
    });
    return it('should be overwrite default options', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname'
      });
      mite.getOption('account').should.be.equal('account');
      mite.getOption('apiKey').should.be.equal('apikey');
      return mite.getOption('applicationName').should.be.equal('applicationname');
    });
  });

  describe('URL', function() {
    it('should be a valid API-URL', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname'
      });
      return mite.getUrl('services').should.equal('https://account.mite.yo.lk/services.json');
    });
    it('should be a valid API-URL with an api_key query-parameter', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        query: true
      });
      return mite.getUrl('services').should.equal('https://account.mite.yo.lk/services.json?api_key=apikey');
    });
    it('should be a valid API-URL with a filter query-parameter', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname'
      });
      return mite.getUrl('services', {
        limit: 50,
        page: 2
      }).should.equal('https://account.mite.yo.lk/services.json?limit=50&page=2');
    });
    return it('should be a valid API-URL with placeholders', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname'
      });
      return mite.getUrl('dailyDate', {
        year: 2013,
        month: 1,
        day: 1
      }).should.equal('https://account.mite.yo.lk/daily/2013/1/1.json');
    });
  });

  describe('API', function() {
    describe('Service', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        request: requestMock
      });
      it('should be get all services', function(done) {
        return mite.getServices(function(err, services) {
          services.should.have.length(1);
          services[0].service.should.have.property('billable');
          services[0].service.should.have.property('created_at');
          services[0].service.should.have.property('hourly_rate');
          services[0].service.should.have.property('id');
          services[0].service.should.have.property('name');
          services[0].service.should.have.property('note');
          services[0].service.should.have.property('updated_at');
          services[0].service.should.have.property('archived');
          return done();
        });
      });
      it('should be get all archived services', function(done) {
        return mite.getArchivedServices(function(err, services) {
          services.should.have.length(1);
          services[0].service.should.have.property('billable');
          services[0].service.should.have.property('created_at');
          services[0].service.should.have.property('hourly_rate');
          services[0].service.should.have.property('id');
          services[0].service.should.have.property('name');
          services[0].service.should.have.property('note');
          services[0].service.should.have.property('updated_at');
          services[0].service.should.have.property('archived');
          return done();
        });
      });
      it('should be get one service', function(done) {
        return mite.getService(1, function(err, service) {
          service.service.should.have.property('billable');
          service.service.should.have.property('created_at');
          service.service.should.have.property('hourly_rate');
          service.service.should.have.property('id');
          service.service.should.have.property('name');
          service.service.should.have.property('note');
          service.service.should.have.property('updated_at');
          service.service.should.have.property('archived');
          return done();
        });
      });
      it('should be able to add new service', function(done) {
        return mite.addService({
          name: 'Service'
        }, function(err, service) {
          service.service.should.have.property('billable');
          service.service.should.have.property('created_at');
          service.service.should.have.property('hourly_rate');
          service.service.should.have.property('id');
          service.service.should.have.property('name');
          service.service.should.have.property('note');
          service.service.should.have.property('updated_at');
          service.service.should.have.property('archived');
          return done();
        });
      });
      it('should be able to update service', function(done) {
        return mite.updateService(1, {
          name: 'Service'
        }, function(err, service) {
          service.service.should.have.property('billable');
          service.service.should.have.property('created_at');
          service.service.should.have.property('hourly_rate');
          service.service.should.have.property('id');
          service.service.should.have.property('name');
          service.service.should.have.property('note');
          service.service.should.have.property('updated_at');
          service.service.should.have.property('archived');
          return done();
        });
      });
      return it('should be able to delete service', function(done) {
        return mite.deleteService(1, function(err, service) {
          return done();
        });
      });
    });
    describe('Customer', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        request: requestMock
      });
      it('should be get all customers', function(done) {
        return mite.getCustomers(function(err, customers) {
          customers.should.have.length(1);
          customers[0].customer.should.have.property('created_at');
          customers[0].customer.should.have.property('hourly_rate');
          customers[0].customer.should.have.property('id');
          customers[0].customer.should.have.property('name');
          customers[0].customer.should.have.property('note');
          customers[0].customer.should.have.property('updated_at');
          customers[0].customer.should.have.property('archived');
          customers[0].customer.should.have.property('active_hourly_rate');
          customers[0].customer.should.have.property('hourly_rates_per_service');
          return done();
        });
      });
      it('should be get all archived customers', function(done) {
        return mite.getArchivedCustomers(function(err, customers) {
          customers.should.have.length(1);
          customers[0].customer.should.have.property('created_at');
          customers[0].customer.should.have.property('hourly_rate');
          customers[0].customer.should.have.property('id');
          customers[0].customer.should.have.property('name');
          customers[0].customer.should.have.property('note');
          customers[0].customer.should.have.property('updated_at');
          customers[0].customer.should.have.property('archived');
          customers[0].customer.should.have.property('active_hourly_rate');
          customers[0].customer.should.have.property('hourly_rates_per_service');
          return done();
        });
      });
      it('should be get one customer', function(done) {
        return mite.getCustomer(1, function(err, customer) {
          customer.customer.should.have.property('created_at');
          customer.customer.should.have.property('hourly_rate');
          customer.customer.should.have.property('id');
          customer.customer.should.have.property('name');
          customer.customer.should.have.property('note');
          customer.customer.should.have.property('updated_at');
          customer.customer.should.have.property('archived');
          customer.customer.should.have.property('active_hourly_rate');
          customer.customer.should.have.property('hourly_rates_per_service');
          return done();
        });
      });
      it('should be able to add new customer', function(done) {
        return mite.addCustomer({
          name: 'Customer'
        }, function(err, customer) {
          customer.customer.should.have.property('created_at');
          customer.customer.should.have.property('hourly_rate');
          customer.customer.should.have.property('id');
          customer.customer.should.have.property('name');
          customer.customer.should.have.property('note');
          customer.customer.should.have.property('updated_at');
          customer.customer.should.have.property('archived');
          customer.customer.should.have.property('active_hourly_rate');
          customer.customer.should.have.property('hourly_rates_per_service');
          return done();
        });
      });
      it('should be able to update customer', function(done) {
        return mite.updateCustomer(1, {
          name: 'Customer'
        }, function(err, customer) {
          customer.customer.should.have.property('created_at');
          customer.customer.should.have.property('hourly_rate');
          customer.customer.should.have.property('id');
          customer.customer.should.have.property('name');
          customer.customer.should.have.property('note');
          customer.customer.should.have.property('updated_at');
          customer.customer.should.have.property('archived');
          customer.customer.should.have.property('active_hourly_rate');
          customer.customer.should.have.property('hourly_rates_per_service');
          return done();
        });
      });
      return it('should be able to delete customer', function(done) {
        return mite.deleteCustomer(1, function(err, customer) {
          return done();
        });
      });
    });
    describe('Project', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        request: requestMock
      });
      it('should be get all projects', function(done) {
        return mite.getProjects(function(err, projects) {
          projects.should.have.length(1);
          projects[0].project.should.have.property('budget');
          projects[0].project.should.have.property('budget_type');
          projects[0].project.should.have.property('created_at');
          projects[0].project.should.have.property('customer_id');
          projects[0].project.should.have.property('hourly_rate');
          projects[0].project.should.have.property('id');
          projects[0].project.should.have.property('name');
          projects[0].project.should.have.property('note');
          projects[0].project.should.have.property('updated_at');
          projects[0].project.should.have.property('archived');
          projects[0].project.should.have.property('active_hourly_rate');
          projects[0].project.should.have.property('hourly_rates_per_service');
          projects[0].project.should.have.property('customer_name');
          return done();
        });
      });
      it('should be get all archived projects', function(done) {
        return mite.getArchivedProjects(function(err, projects) {
          projects.should.have.length(1);
          projects[0].project.should.have.property('budget');
          projects[0].project.should.have.property('budget_type');
          projects[0].project.should.have.property('created_at');
          projects[0].project.should.have.property('customer_id');
          projects[0].project.should.have.property('hourly_rate');
          projects[0].project.should.have.property('id');
          projects[0].project.should.have.property('name');
          projects[0].project.should.have.property('note');
          projects[0].project.should.have.property('updated_at');
          projects[0].project.should.have.property('archived');
          projects[0].project.should.have.property('active_hourly_rate');
          projects[0].project.should.have.property('hourly_rates_per_service');
          projects[0].project.should.have.property('customer_name');
          return done();
        });
      });
      it('should be get one project', function(done) {
        return mite.getProject(1, function(err, project) {
          project.project.should.have.property('budget');
          project.project.should.have.property('budget_type');
          project.project.should.have.property('created_at');
          project.project.should.have.property('customer_id');
          project.project.should.have.property('hourly_rate');
          project.project.should.have.property('id');
          project.project.should.have.property('name');
          project.project.should.have.property('note');
          project.project.should.have.property('updated_at');
          project.project.should.have.property('archived');
          project.project.should.have.property('active_hourly_rate');
          project.project.should.have.property('hourly_rates_per_service');
          project.project.should.have.property('customer_name');
          return done();
        });
      });
      it('should be able to add new project', function(done) {
        return mite.addProject({
          name: 'Project'
        }, function(err, project) {
          project.project.should.have.property('budget');
          project.project.should.have.property('budget_type');
          project.project.should.have.property('created_at');
          project.project.should.have.property('customer_id');
          project.project.should.have.property('hourly_rate');
          project.project.should.have.property('id');
          project.project.should.have.property('name');
          project.project.should.have.property('note');
          project.project.should.have.property('updated_at');
          project.project.should.have.property('archived');
          project.project.should.have.property('active_hourly_rate');
          project.project.should.have.property('hourly_rates_per_service');
          project.project.should.have.property('customer_name');
          return done();
        });
      });
      it('should be able to update project', function(done) {
        return mite.updateProject(1, {
          name: 'Project'
        }, function(err, project) {
          project.project.should.have.property('budget');
          project.project.should.have.property('budget_type');
          project.project.should.have.property('created_at');
          project.project.should.have.property('customer_id');
          project.project.should.have.property('hourly_rate');
          project.project.should.have.property('id');
          project.project.should.have.property('name');
          project.project.should.have.property('note');
          project.project.should.have.property('updated_at');
          project.project.should.have.property('archived');
          project.project.should.have.property('active_hourly_rate');
          project.project.should.have.property('hourly_rates_per_service');
          project.project.should.have.property('customer_name');
          return done();
        });
      });
      return it('should be able to delete project', function(done) {
        return mite.deleteProject(1, function(err, project) {
          return done();
        });
      });
    });
    describe('User', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        request: requestMock
      });
      it('should be get all users', function(done) {
        return mite.getUsers(function(err, users) {
          users.should.have.length(1);
          users[0].user.should.have.property('created_at');
          users[0].user.should.have.property('email');
          users[0].user.should.have.property('id');
          users[0].user.should.have.property('name');
          users[0].user.should.have.property('note');
          users[0].user.should.have.property('updated_at');
          users[0].user.should.have.property('archived');
          users[0].user.should.have.property('language');
          users[0].user.should.have.property('role');
          return done();
        });
      });
      it('should be get all archived users', function(done) {
        return mite.getArchivedUsers(function(err, users) {
          users.should.have.length(1);
          users[0].user.should.have.property('created_at');
          users[0].user.should.have.property('email');
          users[0].user.should.have.property('id');
          users[0].user.should.have.property('name');
          users[0].user.should.have.property('note');
          users[0].user.should.have.property('updated_at');
          users[0].user.should.have.property('archived');
          users[0].user.should.have.property('language');
          users[0].user.should.have.property('role');
          return done();
        });
      });
      it('should be get one user', function(done) {
        return mite.getUser(1, function(err, user) {
          user.user.should.have.property('created_at');
          user.user.should.have.property('email');
          user.user.should.have.property('id');
          user.user.should.have.property('name');
          user.user.should.have.property('note');
          user.user.should.have.property('updated_at');
          user.user.should.have.property('archived');
          user.user.should.have.property('language');
          user.user.should.have.property('role');
          return done();
        });
      });
      it('should be get myself', function(done) {
        return mite.getMyself(function(err, user) {
          user.user.should.have.property('created_at');
          user.user.should.have.property('email');
          user.user.should.have.property('id');
          user.user.should.have.property('name');
          user.user.should.have.property('note');
          user.user.should.have.property('updated_at');
          user.user.should.have.property('archived');
          user.user.should.have.property('language');
          user.user.should.have.property('role');
          return done();
        });
      });
      return it('should be get the account', function(done) {
        return mite.getAccount(function(err, account) {
          account.account.should.have.property('created_at');
          account.account.should.have.property('currency');
          account.account.should.have.property('id');
          account.account.should.have.property('name');
          account.account.should.have.property('title');
          account.account.should.have.property('updated_at');
          return done();
        });
      });
    });
    return describe('TimeEntry', function() {
      var mite;
      mite = miteApi({
        account: 'account',
        apiKey: 'apikey',
        applicationName: 'applicationname',
        request: requestMock
      });
      it('should be get all daily time entries', function(done) {
        return mite.getDailyTimeEntries(2013, 1, 1, function(err, entries) {
          entries.should.have.length(1);
          entries[0].time_entry.should.have.property('billable');
          entries[0].time_entry.should.have.property('created_at');
          entries[0].time_entry.should.have.property('date_at');
          entries[0].time_entry.should.have.property('id');
          entries[0].time_entry.should.have.property('locked');
          entries[0].time_entry.should.have.property('minutes');
          entries[0].time_entry.should.have.property('project_id');
          entries[0].time_entry.should.have.property('revenue');
          entries[0].time_entry.should.have.property('service_id');
          entries[0].time_entry.should.have.property('note');
          entries[0].time_entry.should.have.property('updated_at');
          entries[0].time_entry.should.have.property('user_id');
          entries[0].time_entry.should.have.property('user_name');
          entries[0].time_entry.should.have.property('customer_id');
          entries[0].time_entry.should.have.property('customer_name');
          entries[0].time_entry.should.have.property('project_name');
          entries[0].time_entry.should.have.property('service_name');
          return done();
        });
      });
      it('should be get all time entries', function(done) {
        return mite.getTimeEntries(function(err, entries) {
          entries.should.have.length(1);
          entries[0].time_entry.should.have.property('billable');
          entries[0].time_entry.should.have.property('created_at');
          entries[0].time_entry.should.have.property('date_at');
          entries[0].time_entry.should.have.property('id');
          entries[0].time_entry.should.have.property('locked');
          entries[0].time_entry.should.have.property('minutes');
          entries[0].time_entry.should.have.property('project_id');
          entries[0].time_entry.should.have.property('revenue');
          entries[0].time_entry.should.have.property('service_id');
          entries[0].time_entry.should.have.property('note');
          entries[0].time_entry.should.have.property('updated_at');
          entries[0].time_entry.should.have.property('user_id');
          entries[0].time_entry.should.have.property('user_name');
          entries[0].time_entry.should.have.property('customer_id');
          entries[0].time_entry.should.have.property('customer_name');
          entries[0].time_entry.should.have.property('project_name');
          entries[0].time_entry.should.have.property('service_name');
          return done();
        });
      });
      it('should be get one time entry', function(done) {
        return mite.getTimeEntry(1, function(err, entry) {
          entry.time_entry.should.have.property('billable');
          entry.time_entry.should.have.property('created_at');
          entry.time_entry.should.have.property('date_at');
          entry.time_entry.should.have.property('id');
          entry.time_entry.should.have.property('locked');
          entry.time_entry.should.have.property('minutes');
          entry.time_entry.should.have.property('project_id');
          entry.time_entry.should.have.property('revenue');
          entry.time_entry.should.have.property('service_id');
          entry.time_entry.should.have.property('note');
          entry.time_entry.should.have.property('updated_at');
          entry.time_entry.should.have.property('user_id');
          entry.time_entry.should.have.property('user_name');
          entry.time_entry.should.have.property('customer_id');
          entry.time_entry.should.have.property('customer_name');
          entry.time_entry.should.have.property('project_name');
          entry.time_entry.should.have.property('service_name');
          return done();
        });
      });
      it('should be able to add new time entry', function(done) {
        return mite.addTimeEntry({
          name: 'TimeEntry'
        }, function(err, entry) {
          entry.time_entry.should.have.property('billable');
          entry.time_entry.should.have.property('created_at');
          entry.time_entry.should.have.property('date_at');
          entry.time_entry.should.have.property('id');
          entry.time_entry.should.have.property('locked');
          entry.time_entry.should.have.property('minutes');
          entry.time_entry.should.have.property('project_id');
          entry.time_entry.should.have.property('revenue');
          entry.time_entry.should.have.property('service_id');
          entry.time_entry.should.have.property('note');
          entry.time_entry.should.have.property('updated_at');
          entry.time_entry.should.have.property('user_id');
          entry.time_entry.should.have.property('user_name');
          entry.time_entry.should.have.property('customer_id');
          entry.time_entry.should.have.property('customer_name');
          entry.time_entry.should.have.property('project_name');
          entry.time_entry.should.have.property('service_name');
          return done();
        });
      });
      it('should be able to update time entry', function(done) {
        return mite.updateTimeEntry(1, {
          name: 'TimeEntry'
        }, function(err, entry) {
          entry.time_entry.should.have.property('billable');
          entry.time_entry.should.have.property('created_at');
          entry.time_entry.should.have.property('date_at');
          entry.time_entry.should.have.property('id');
          entry.time_entry.should.have.property('locked');
          entry.time_entry.should.have.property('minutes');
          entry.time_entry.should.have.property('project_id');
          entry.time_entry.should.have.property('revenue');
          entry.time_entry.should.have.property('service_id');
          entry.time_entry.should.have.property('note');
          entry.time_entry.should.have.property('updated_at');
          entry.time_entry.should.have.property('user_id');
          entry.time_entry.should.have.property('user_name');
          entry.time_entry.should.have.property('customer_id');
          entry.time_entry.should.have.property('customer_name');
          entry.time_entry.should.have.property('project_name');
          entry.time_entry.should.have.property('service_name');
          return done();
        });
      });
      return it('should be able to delete time entry', function(done) {
        return mite.deleteTimeEntry(1, function(err, entry) {
          return done();
        });
      });
    });
  });

}).call(this);
