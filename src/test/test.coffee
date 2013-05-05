mocha = require 'mocha'
requestMock = require './requestMock'

miteApi = require '../lib/mite-api'

describe 'Configuration', ->
  it 'should be set default options', ->
    mite = miteApi()

    mite.getOption('account').should.be.false
    mite.getOption('apiKey').should.be.false
    mite.getOption('applicationName').should.be.false

  it 'should be overwrite default options', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname' }

    mite.getOption('account').should.be.equal 'account'
    mite.getOption('apiKey').should.be.equal 'apikey'
    mite.getOption('applicationName').should.be.equal 'applicationname'

describe 'URL', ->
  it 'should be a valid API-URL', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname' }
    mite.getUrl('services').should.equal 'https://account.mite.yo.lk/services.json'

  it 'should be a valid API-URL with an api_key query-parameter', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', query: true }
    mite.getUrl('services').should.equal 'https://account.mite.yo.lk/services.json?api_key=apikey'

  it 'should be a valid API-URL with a filter query-parameter', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname' }
    mite.getUrl('services', { limit: 50, page: 2 }).should.equal 'https://account.mite.yo.lk/services.json?limit=50&page=2'

  it 'should be a valid API-URL with placeholders', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname' }
    mite.getUrl('dailyDate', { year: 2013, month: 1, day: 1}).should.equal 'https://account.mite.yo.lk/daily/2013/1/1.json'

describe 'API', ->

  describe 'Service', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', request: requestMock }

    it 'should be get all services', (done) ->
      mite.getServices (err, services) ->
        services.should.have.length 1
        services[0].service.should.have.property 'billable'
        services[0].service.should.have.property 'created_at'
        services[0].service.should.have.property 'hourly_rate'
        services[0].service.should.have.property 'id'
        services[0].service.should.have.property 'name'
        services[0].service.should.have.property 'note'
        services[0].service.should.have.property 'updated_at'
        services[0].service.should.have.property 'archived'
        done()

    it 'should be get all archived services', (done) ->
      mite.getArchivedServices (err, services) ->
        services.should.have.length 1
        services[0].service.should.have.property 'billable'
        services[0].service.should.have.property 'created_at'
        services[0].service.should.have.property 'hourly_rate'
        services[0].service.should.have.property 'id'
        services[0].service.should.have.property 'name'
        services[0].service.should.have.property 'note'
        services[0].service.should.have.property 'updated_at'
        services[0].service.should.have.property 'archived'
        done()

    it 'should be get one service', (done) ->
      mite.getService 1, (err, service) ->
        service.service.should.have.property 'billable'
        service.service.should.have.property 'created_at'
        service.service.should.have.property 'hourly_rate'
        service.service.should.have.property 'id'
        service.service.should.have.property 'name'
        service.service.should.have.property 'note'
        service.service.should.have.property 'updated_at'
        service.service.should.have.property 'archived'
        done()

    it 'should be able to add new service', (done) ->
      mite.addService { name: 'Service' }, (err, service) ->
        service.service.should.have.property 'billable'
        service.service.should.have.property 'created_at'
        service.service.should.have.property 'hourly_rate'
        service.service.should.have.property 'id'
        service.service.should.have.property 'name'
        service.service.should.have.property 'note'
        service.service.should.have.property 'updated_at'
        service.service.should.have.property 'archived'
        done();

    it 'should be able to update service', (done) ->
      mite.updateService 1, { name: 'Service' }, (err, service) ->
        service.service.should.have.property 'billable'
        service.service.should.have.property 'created_at'
        service.service.should.have.property 'hourly_rate'
        service.service.should.have.property 'id'
        service.service.should.have.property 'name'
        service.service.should.have.property 'note'
        service.service.should.have.property 'updated_at'
        service.service.should.have.property 'archived'
        done();

    it 'should be able to delete service', (done) ->
      mite.deleteService 1, (err, service) ->
        done();

  describe 'Customer', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', request: requestMock }

    it 'should be get all customers', (done) ->
      mite.getCustomers (err, customers) ->
        customers.should.have.length 1
        customers[0].customer.should.have.property 'created_at'
        customers[0].customer.should.have.property 'hourly_rate'
        customers[0].customer.should.have.property 'id'
        customers[0].customer.should.have.property 'name'
        customers[0].customer.should.have.property 'note'
        customers[0].customer.should.have.property 'updated_at'
        customers[0].customer.should.have.property 'archived'
        customers[0].customer.should.have.property 'active_hourly_rate'
        customers[0].customer.should.have.property 'hourly_rates_per_service'
        done()

    it 'should be get all archived customers', (done) ->
      mite.getArchivedCustomers (err, customers) ->
        customers.should.have.length 1
        customers[0].customer.should.have.property 'created_at'
        customers[0].customer.should.have.property 'hourly_rate'
        customers[0].customer.should.have.property 'id'
        customers[0].customer.should.have.property 'name'
        customers[0].customer.should.have.property 'note'
        customers[0].customer.should.have.property 'updated_at'
        customers[0].customer.should.have.property 'archived'
        customers[0].customer.should.have.property 'active_hourly_rate'
        customers[0].customer.should.have.property 'hourly_rates_per_service'
        done()

    it 'should be get one customer', (done) ->
      mite.getCustomer 1, (err, customer) ->
        customer.customer.should.have.property 'created_at'
        customer.customer.should.have.property 'hourly_rate'
        customer.customer.should.have.property 'id'
        customer.customer.should.have.property 'name'
        customer.customer.should.have.property 'note'
        customer.customer.should.have.property 'updated_at'
        customer.customer.should.have.property 'archived'
        customer.customer.should.have.property 'active_hourly_rate'
        customer.customer.should.have.property 'hourly_rates_per_service'
        done()

    it 'should be able to add new customer', (done) ->
      mite.addCustomer { name: 'Customer' }, (err, customer) ->
        customer.customer.should.have.property 'created_at'
        customer.customer.should.have.property 'hourly_rate'
        customer.customer.should.have.property 'id'
        customer.customer.should.have.property 'name'
        customer.customer.should.have.property 'note'
        customer.customer.should.have.property 'updated_at'
        customer.customer.should.have.property 'archived'
        customer.customer.should.have.property 'active_hourly_rate'
        customer.customer.should.have.property 'hourly_rates_per_service'
        done()

    it 'should be able to update customer', (done) ->
      mite.updateCustomer 1, { name: 'Customer' }, (err, customer) ->
        customer.customer.should.have.property 'created_at'
        customer.customer.should.have.property 'hourly_rate'
        customer.customer.should.have.property 'id'
        customer.customer.should.have.property 'name'
        customer.customer.should.have.property 'note'
        customer.customer.should.have.property 'updated_at'
        customer.customer.should.have.property 'archived'
        customer.customer.should.have.property 'active_hourly_rate'
        customer.customer.should.have.property 'hourly_rates_per_service'
        done()

    it 'should be able to delete customer', (done) ->
      mite.deleteCustomer 1, (err, customer) ->
        done();

  describe 'Project', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', request: requestMock }

    it 'should be get all projects', (done) ->
      mite.getProjects (err, projects) ->
        projects.should.have.length 1
        projects[0].project.should.have.property 'budget'
        projects[0].project.should.have.property 'budget_type'
        projects[0].project.should.have.property 'created_at'
        projects[0].project.should.have.property 'customer_id'
        projects[0].project.should.have.property 'hourly_rate'
        projects[0].project.should.have.property 'id'
        projects[0].project.should.have.property 'name'
        projects[0].project.should.have.property 'note'
        projects[0].project.should.have.property 'updated_at'
        projects[0].project.should.have.property 'archived'
        projects[0].project.should.have.property 'active_hourly_rate'
        projects[0].project.should.have.property 'hourly_rates_per_service'
        projects[0].project.should.have.property 'customer_name'
        done()

    it 'should be get all archived projects', (done) ->
      mite.getArchivedProjects (err, projects) ->
        projects.should.have.length 1
        projects[0].project.should.have.property 'budget'
        projects[0].project.should.have.property 'budget_type'
        projects[0].project.should.have.property 'created_at'
        projects[0].project.should.have.property 'customer_id'
        projects[0].project.should.have.property 'hourly_rate'
        projects[0].project.should.have.property 'id'
        projects[0].project.should.have.property 'name'
        projects[0].project.should.have.property 'note'
        projects[0].project.should.have.property 'updated_at'
        projects[0].project.should.have.property 'archived'
        projects[0].project.should.have.property 'active_hourly_rate'
        projects[0].project.should.have.property 'hourly_rates_per_service'
        projects[0].project.should.have.property 'customer_name'
        done()

    it 'should be get one project', (done) ->
      mite.getProject 1, (err, project) ->
        project.project.should.have.property 'budget'
        project.project.should.have.property 'budget_type'
        project.project.should.have.property 'created_at'
        project.project.should.have.property 'customer_id'
        project.project.should.have.property 'hourly_rate'
        project.project.should.have.property 'id'
        project.project.should.have.property 'name'
        project.project.should.have.property 'note'
        project.project.should.have.property 'updated_at'
        project.project.should.have.property 'archived'
        project.project.should.have.property 'active_hourly_rate'
        project.project.should.have.property 'hourly_rates_per_service'
        project.project.should.have.property 'customer_name'
        done()

    it 'should be able to add new project', (done) ->
      mite.addProject { name: 'Project' }, (err, project) ->
        project.project.should.have.property 'budget'
        project.project.should.have.property 'budget_type'
        project.project.should.have.property 'created_at'
        project.project.should.have.property 'customer_id'
        project.project.should.have.property 'hourly_rate'
        project.project.should.have.property 'id'
        project.project.should.have.property 'name'
        project.project.should.have.property 'note'
        project.project.should.have.property 'updated_at'
        project.project.should.have.property 'archived'
        project.project.should.have.property 'active_hourly_rate'
        project.project.should.have.property 'hourly_rates_per_service'
        project.project.should.have.property 'customer_name'
        done()

    it 'should be able to update project', (done) ->
      mite.updateProject 1, { name: 'Project' }, (err, project) ->
        project.project.should.have.property 'budget'
        project.project.should.have.property 'budget_type'
        project.project.should.have.property 'created_at'
        project.project.should.have.property 'customer_id'
        project.project.should.have.property 'hourly_rate'
        project.project.should.have.property 'id'
        project.project.should.have.property 'name'
        project.project.should.have.property 'note'
        project.project.should.have.property 'updated_at'
        project.project.should.have.property 'archived'
        project.project.should.have.property 'active_hourly_rate'
        project.project.should.have.property 'hourly_rates_per_service'
        project.project.should.have.property 'customer_name'
        done()

    it 'should be able to delete project', (done) ->
      mite.deleteProject 1, (err, project) ->
        done();

  describe 'User', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', request: requestMock }

    it 'should be get all users', (done) ->
      mite.getUsers (err, users) ->
        users.should.have.length 1
        users[0].user.should.have.property 'created_at'
        users[0].user.should.have.property 'email'
        users[0].user.should.have.property 'id'
        users[0].user.should.have.property 'name'
        users[0].user.should.have.property 'note'
        users[0].user.should.have.property 'updated_at'
        users[0].user.should.have.property 'archived'
        users[0].user.should.have.property 'language'
        users[0].user.should.have.property 'role'
        done()

    it 'should be get all archived users', (done) ->
      mite.getArchivedUsers (err, users) ->
        users.should.have.length 1
        users[0].user.should.have.property 'created_at'
        users[0].user.should.have.property 'email'
        users[0].user.should.have.property 'id'
        users[0].user.should.have.property 'name'
        users[0].user.should.have.property 'note'
        users[0].user.should.have.property 'updated_at'
        users[0].user.should.have.property 'archived'
        users[0].user.should.have.property 'language'
        users[0].user.should.have.property 'role'
        done()

    it 'should be get one user', (done) ->
      mite.getUser 1, (err, user) ->
        user.user.should.have.property 'created_at'
        user.user.should.have.property 'email'
        user.user.should.have.property 'id'
        user.user.should.have.property 'name'
        user.user.should.have.property 'note'
        user.user.should.have.property 'updated_at'
        user.user.should.have.property 'archived'
        user.user.should.have.property 'language'
        user.user.should.have.property 'role'
        done()

    it 'should be get myself', (done) ->
      mite.getMyself (err, user) ->
        user.user.should.have.property 'created_at'
        user.user.should.have.property 'email'
        user.user.should.have.property 'id'
        user.user.should.have.property 'name'
        user.user.should.have.property 'note'
        user.user.should.have.property 'updated_at'
        user.user.should.have.property 'archived'
        user.user.should.have.property 'language'
        user.user.should.have.property 'role'
        done()

    it 'should be get the account', (done) ->
      mite.getAccount (err, account) ->
        account.account.should.have.property 'created_at'
        account.account.should.have.property 'currency'
        account.account.should.have.property 'id'
        account.account.should.have.property 'name'
        account.account.should.have.property 'title'
        account.account.should.have.property 'updated_at'
        done()

  describe 'TimeEntry', ->
    mite = miteApi { account: 'account', apiKey: 'apikey', applicationName: 'applicationname', request: requestMock }

    it 'should be get all daily time entries', (done) ->
      mite.getDailyTimeEntries 2013, 1, 1, (err, entries) ->
        entries.should.have.length 1
        entries[0].time_entry.should.have.property 'billable'
        entries[0].time_entry.should.have.property 'created_at'
        entries[0].time_entry.should.have.property 'date_at'
        entries[0].time_entry.should.have.property 'id'
        entries[0].time_entry.should.have.property 'locked'
        entries[0].time_entry.should.have.property 'minutes'
        entries[0].time_entry.should.have.property 'project_id'
        entries[0].time_entry.should.have.property 'revenue'
        entries[0].time_entry.should.have.property 'service_id'
        entries[0].time_entry.should.have.property 'note'
        entries[0].time_entry.should.have.property 'updated_at'
        entries[0].time_entry.should.have.property 'user_id'
        entries[0].time_entry.should.have.property 'user_name'
        entries[0].time_entry.should.have.property 'customer_id'
        entries[0].time_entry.should.have.property 'customer_name'
        entries[0].time_entry.should.have.property 'project_name'
        entries[0].time_entry.should.have.property 'service_name'
        done()

    it 'should be get all time entries', (done) ->
      mite.getTimeEntries (err, entries) ->
        entries.should.have.length 1
        entries[0].time_entry.should.have.property 'billable'
        entries[0].time_entry.should.have.property 'created_at'
        entries[0].time_entry.should.have.property 'date_at'
        entries[0].time_entry.should.have.property 'id'
        entries[0].time_entry.should.have.property 'locked'
        entries[0].time_entry.should.have.property 'minutes'
        entries[0].time_entry.should.have.property 'project_id'
        entries[0].time_entry.should.have.property 'revenue'
        entries[0].time_entry.should.have.property 'service_id'
        entries[0].time_entry.should.have.property 'note'
        entries[0].time_entry.should.have.property 'updated_at'
        entries[0].time_entry.should.have.property 'user_id'
        entries[0].time_entry.should.have.property 'user_name'
        entries[0].time_entry.should.have.property 'customer_id'
        entries[0].time_entry.should.have.property 'customer_name'
        entries[0].time_entry.should.have.property 'project_name'
        entries[0].time_entry.should.have.property 'service_name'
        done()

    it 'should be get one time entry', (done) ->
      mite.getTimeEntry 1, (err, entry) ->
        entry.time_entry.should.have.property 'billable'
        entry.time_entry.should.have.property 'created_at'
        entry.time_entry.should.have.property 'date_at'
        entry.time_entry.should.have.property 'id'
        entry.time_entry.should.have.property 'locked'
        entry.time_entry.should.have.property 'minutes'
        entry.time_entry.should.have.property 'project_id'
        entry.time_entry.should.have.property 'revenue'
        entry.time_entry.should.have.property 'service_id'
        entry.time_entry.should.have.property 'note'
        entry.time_entry.should.have.property 'updated_at'
        entry.time_entry.should.have.property 'user_id'
        entry.time_entry.should.have.property 'user_name'
        entry.time_entry.should.have.property 'customer_id'
        entry.time_entry.should.have.property 'customer_name'
        entry.time_entry.should.have.property 'project_name'
        entry.time_entry.should.have.property 'service_name'
        done()

    it 'should be able to add new time entry', (done) ->
      mite.addTimeEntry { name: 'TimeEntry' }, (err, entry) ->
        entry.time_entry.should.have.property 'billable'
        entry.time_entry.should.have.property 'created_at'
        entry.time_entry.should.have.property 'date_at'
        entry.time_entry.should.have.property 'id'
        entry.time_entry.should.have.property 'locked'
        entry.time_entry.should.have.property 'minutes'
        entry.time_entry.should.have.property 'project_id'
        entry.time_entry.should.have.property 'revenue'
        entry.time_entry.should.have.property 'service_id'
        entry.time_entry.should.have.property 'note'
        entry.time_entry.should.have.property 'updated_at'
        entry.time_entry.should.have.property 'user_id'
        entry.time_entry.should.have.property 'user_name'
        entry.time_entry.should.have.property 'customer_id'
        entry.time_entry.should.have.property 'customer_name'
        entry.time_entry.should.have.property 'project_name'
        entry.time_entry.should.have.property 'service_name'
        done()

    it 'should be able to update time entry', (done) ->
      mite.updateTimeEntry 1, { name: 'TimeEntry' }, (err, entry) ->
        entry.time_entry.should.have.property 'billable'
        entry.time_entry.should.have.property 'created_at'
        entry.time_entry.should.have.property 'date_at'
        entry.time_entry.should.have.property 'id'
        entry.time_entry.should.have.property 'locked'
        entry.time_entry.should.have.property 'minutes'
        entry.time_entry.should.have.property 'project_id'
        entry.time_entry.should.have.property 'revenue'
        entry.time_entry.should.have.property 'service_id'
        entry.time_entry.should.have.property 'note'
        entry.time_entry.should.have.property 'updated_at'
        entry.time_entry.should.have.property 'user_id'
        entry.time_entry.should.have.property 'user_name'
        entry.time_entry.should.have.property 'customer_id'
        entry.time_entry.should.have.property 'customer_name'
        entry.time_entry.should.have.property 'project_name'
        entry.time_entry.should.have.property 'service_name'
        done()

    it 'should be able to delete time entry', (done) ->
      mite.deleteTimeEntry 1, (err, entry) ->
        done()
