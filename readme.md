Dispatcher is a simple pubsub object which lets your React components emit and listen for events. You only have one Dispatcher for your app; just add the Dispatcher as a mixin to each component that needs to emit or listen for events.

## Basic example

To emit an event, a component calls emit() passing a string event type and optionally some payload data.


	var Name = React.createClass({
	
		mixins : ['Dispatcher'],
		
		render : function() {
			return <input onClick={this.changeHandler} />;
		},
		
		changeHandler : function(evt) {
			this.emit('NameChanged', {
				name : evt.target.value
			});
		}
		
	});


To listen for an event, a component calls listen(), typically once it has mounted:

	var Logger = React.createClass({
		
		mixins : ['Dispatcher'],
		
		componentDidMount : function() {
			
			this.listen('NameChanged', function(evt) {
				console.log(evt.data.name); // => 'Foo'
				console.log(evt.type)       // => 'NameChanged'
				console.log(evt.target)     // => Name
			});
			
		}
		
	});

## Explicit targets

You may optionally restrict the listener to events on a particular target by passing the target as the second argument. In this case, the callback will only be run if the event's target matches this argument.

	var Logger = React.createClass({
		
		...
		
		componentDidMount : function() {
			
			this.listen('NameChanged', Name, function(evt) {
				...
			});
			
		}
		
	});