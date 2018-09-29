/*
	Commands Module by ImDaveead
	Allows you to add commands easily

	Change prefix in `config.commandPrefix`
*/
exports.id = 'commands';
exports.dependencies = [];
exports.onLoad = api => {
	let exp = {}

	// Default Prefix in config.commandPrefix
	if(!('commandPrefix' in api.config)) api.config.commandPrefix = '!';

	exp.registeredCommands = {};
	exp.add = (name, callback) => {
		exp.registeredCommands[name] = {
			callback: callback,
			desc: '<No Description>',
			usage: ''
		};
		return {
			setDescription: desc => {exp.setDescription(name,desc);},
			setUsage: usage => {exp.setUsage(name,usage)}
		};
	};
	exp.remove = (name, callback) => {
		if(!(name in exp.registeredCommands)) return false;
		delete exp.registeredCommands[name];
		return true;
	};
	exp.setDescription = (name, desc) => {
		if(!(name in exp.registeredCommands)) return false;
		exp.registeredCommands[name].desc = desc;
		return {
			setDescription: desc => {exp.setDescription(name,desc);},
			setUsage: usage => {exp.setUsage(name,usage)}
		};
	},
	exp.setUsage = (name,usage) => {
		if(!(name in exp.registeredCommands)) return false;
		exp.registeredCommands[name].usage = usage;
		return {
			setDescription: desc => {exp.setDescription(name,desc);},
			setUsage: usage => {exp.setUsage(name,usage)}
		};
	}

	// Add Handler
	api.on('message', (msg) => {
		if (msg.content.startsWith(api.config.commandPrefix)) {
	    let cmd = msg.content.split(" ")[0].substring(api.config.commandPrefix.length).toLowerCase();
			if(cmd in exp.registeredCommands) {
				exp.registeredCommands[cmd].callback(msg);
			}
		}
	})

	return exp;
}
