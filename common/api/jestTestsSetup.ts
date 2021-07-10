// log unhandled exceptions in promise
process.on('unhandledRejection', (reason) => {
	console.error('REJECTION', reason)
})