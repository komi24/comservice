/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 * POST    /y              ->  create
 * GET     /y/:id          ->  show
 * PUT     /y/:id          ->  upsert
 * PATCH   /y/:id          ->  patch
 * DELETE  /y/:id          ->  destroy
 */

'use strict';

import graph from 'fbgraph';
import jsonpatch from 'fast-json-patch';
import Live from './live.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Lives
export function index(req, res) {
  return Live.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Live from the DB
export function show(req, res) {
  return Live.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Live in the DB
export function create(req, res) {
  return Live.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Live in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Live.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Live in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Live.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Live from the DB
export function destroy(req, res) {
  return Live.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Creates a new Live on FB
export function test(req, res) {
  graph.setVersion("2.8");
  graph.setAccessToken(req.user.accessToken);
  console.log(req.user);
  graph.post('687543854736446/live_videos', 
    {
      description:"blabla",
      is_audio_only:false,
      published: false,
      status:'UNPUBLISHED',
      privacy:{value: 'SELF'},
      stream_type: 'AMBIENT',
      title:'ok'
    }, function(err, res) {
    console.log(res);
  });
  return {msg: "ok"};
  // return Live.create(req.body)
  //   .then(respondWithResult(res, 201))
  //   .catch(handleError(res));
}

