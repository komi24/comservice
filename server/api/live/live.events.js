/**
 * Live model events
 */

'use strict';

import {EventEmitter} from 'events';
import Live from './live.model';
var LiveEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LiveEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Live.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LiveEvents.emit(event + ':' + doc._id, doc);
    LiveEvents.emit(event, doc);
  };
}

export default LiveEvents;
