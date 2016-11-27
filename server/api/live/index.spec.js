'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var liveCtrlStub = {
  index: 'liveCtrl.index',
  show: 'liveCtrl.show',
  create: 'liveCtrl.create',
  upsert: 'liveCtrl.upsert',
  patch: 'liveCtrl.patch',
  destroy: 'liveCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var liveIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './live.controller': liveCtrlStub
});

describe('Live API Router:', function() {
  it('should return an express router instance', function() {
    expect(liveIndex).to.equal(routerStub);
  });

  describe('GET /y', function() {
    it('should route to live.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'liveCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /y/:id', function() {
    it('should route to live.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'liveCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /y', function() {
    it('should route to live.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'liveCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /y/:id', function() {
    it('should route to live.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'liveCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /y/:id', function() {
    it('should route to live.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'liveCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /y/:id', function() {
    it('should route to live.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'liveCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
