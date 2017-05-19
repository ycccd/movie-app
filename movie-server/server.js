import Server from 'socket.io';

export function startServer(store) {
	const io = new Server().attach(8090);

	store.subscribe(
		() => io.emit('state', store.getState())
	);

	io.on('connection', (socket) => {
		console.log('connected');
		socket.emit('state', store.getState());
		store.on('action', store.dispatch.bind(store));
	});
}