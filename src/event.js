/**
 * @module Event
 *
 * 提供事件模块的支持
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Event', function () {
	var Event = {};

	Event.CustomEvent = function() {

    this._listeners = {}
} 
	
	
	CustomEvent.prototype.addEvent = function(evType, listener) {

    if(typeof this._listeners[ evType ] === 'undefined') {

              this._listeners[ evType ] = [] 
    }

    this._listeners[evType].push( listener )
}

CustomEvent.prototype.removeEvent = function( evType, whichListener) {

   if(this._listeners[ evType ] instanceof Array) {
 
           var listeners = this._listeners[ evType ],

               n = listeners.length, 

               i=0;

           for(; i < n; i++) {

               if(listeners[ i ] == whichListener) {
			   
                    listeners.splice(i, 1); 

                    break; 
               }
           }  
   }

}

CustomEvent.prototype.fireEvent = function() {

            var event = null;

            if(arguments[0] && typeof arguments[0] === 'string') {

                event = {type: arguments[0], pass: arguments[1]}
            }

            if(typeof event == null) {

               throw new Error("missing event")
            }
     
            var listeners = this._listeners[ event.type ],

                n = listeners.length,

                i = 0;
 
            for(; i < n; i++) {
 
                listeners[ i ].call(this, event.pass || null) 
            }                 
}
	
	
	
	
	
	
	
	
	
	
	return Event
}
	())




