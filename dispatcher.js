var Dispatcher = (function() {

	var types = {};

	/**
	 * @param String type
	 * @param Object data (optional)
	 * @param React.Component target (optional)
	 */
	var dispatch = function(type, data, target) {
		if (type in types) {
			types[type].forEach(function(listener) {
				if (!listener.target || listener.target === target) {
					listener.callback.call(listener.context, {
						type : type,
						target: target,
						data : data,
					});
				}
			});
		}
	};

	/**
	 * @param String type
	 * @param Function callback
	 * @param React.Component context
	 * @param React.Component target (optional)
	 */
	var listen = function(type, callback, context, target) {
		if (!(type in types)) {
			types[type] = [];
		}
		types[type].push({
			context : context,
			target : target,
			callback : callback
		});
	};

	/**
	 * @param String type
	 * @param Function callback
	 * @param React.Component context
	 * @param React.Component target (optional)
	 */
	var unlisten = function(type, callback, context, target) {
		if (type in types) {
			var i = types[type].length,
				listener;
			while (i--) {
				listener = types[type][i];
				if (listener.context === context && (!callback || listener.callback === callback) && (!target || listener.target === target)) {
					types[type].splice(i, 1);
				}
			}
		}
	};

	return {

		/**
		 * Emit an event.
		 *
		 * @param String type
		 * @param Object data
		 * @return this
		 */
		emit : function(type, data) {
			dispatch(type, data, this);
			return this;
		},

		/**
		 * Listen to an event, optionally limited to a target.
		 *
		 * (type, callback)
		 * (type, target, callback)
		 * @return this
		 */
		listen : function() {
			var args = arguments,
				type = args[0],
				callback, target;
			if (args.length == 3) {
				target = args[1];
				callback = args[2];
			} else {
				callback = args[1];
			}
			listen(type, callback, this, target);
			return this;
		},

		/**
		 * Unlisten from an event.
		 *
		 * (type)
		 * (type, callback)
		 * (type, target, callback)
		 * @return this
		 */
		unlisten : function() {
			var args = arguments,
				type = args[0],
				callback, target;
			if (args.length == 3) {
				target = args[1];
				callback = args[2];
			} else if (args.length == 2) {
				callback = args[1];
			}
			unlisten(type, callback, this, target);
			return this;
		}
	};
})();