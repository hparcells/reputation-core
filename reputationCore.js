/**

ReputationCore is a discord bot framework, using discord.js
it bases functionality in a module-based system.

**/
'use strict';
const Discord = require("discord.js");
const reload = require("require-reload")(require);
const fs = require("fs");
const path = require("path");
const EventEmitter = require('events');

class ReputationCore extends EventEmitter {
	constructor(config) {
		// required properties in config
		// 		config.token
		//		config.modulePath
		super();

		// Core API
		this.client = new Discord.Client();
		if (typeof config === 'object') {
			this.config = config;
		} else if (typeof config === 'string') {
			this.config = JSON.parse(fs.readFileSync(config));
		}

		// Client Event Handlers
		this.client.on('message', (message) => {
			if (message.author.bot) return; // Ignore Other Bots
			if (message.author.id == this.client.user.id) return; // Ignore Yourself

			try {
				this.emit('message', message);
			} catch (e) {
				this.emit('error', e);
			}
		});
		this.client.on('ready', () => {
			this.emit('ready');
		});

		// Returns an array of .mod.js files
		let findModJS = (dir) => {
			return fs.statSync(dir).isDirectory() ? Array.prototype.concat(...fs.readdirSync(dir)
				.map(f => findModJS(path.join(dir, f))))
				: dir;
		};

		let loadableModules = {}; // key = id, value = require
		let loadedModules = []; // value = id

		loadableModules.commands = require('./builtin_modules/commands.mod.js');

		let bannedIds = Object.keys(this).map(s => s.toLowerCase());

		// Search For Mod Files
		findModJS(config.modulePath)
			.filter(f => f.endsWith(".mod.js"))
			.forEach(function (file) {
				try {
					let mod = reload(path.join(process.cwd(), file));
					if ("onLoad" in mod && "id" in mod) {
						if (typeof mod.id !== "string") throw `exports.id must be a string (Found ${typeof mod.id})`;
						if (typeof mod.onLoad !== "function") throw `exports.onLoad must be a function (Found ${typeof mod.onLoad})`;
						if (mod.id.toLowerCase() in bannedIds) throw `ID '${mod.id}' is taken`;
						bannedIds.push(mod.id.toLowerCase());
						loadableModules[mod.id] = mod;
					} else throw "Missing `onLoad` function or `id` field.";
				} catch (e) {
					console.error(`Cannot Load Module File ${file}: ${e}`);
				}
			});

		// Load all Modules
		let tryModuleLoad = (mod) => {
			if ('dependencies' in mod) {
				// Load Dependencies First, if they exist
				mod.dependencies.forEach((dep) => {
					if (!(dep in loadableModules)) throw `${dep} is not a valid module`;
					if (!(dep in loadedModules)) tryModuleLoad(loadableModules[dep]);
				});
			}

			// Load mod
			let loadedMod = mod.onLoad(this);
			loadedModules.push(mod.id);

			// cannot be string, boolean, or undefined to be added to api.
			if (!['string', 'boolean', 'undefined'].includes(typeof loadedMod)) {
				this[mod.id] = loadedMod;
			}
			console.log(`Loaded Module '${mod.id}'`);
		};

		Object.keys(loadableModules).forEach(function (k) {
			try {
				tryModuleLoad(loadableModules[k]);
			} catch (e) {
				console.error(`Cannot Load Module '${k}': ${e}`);
			}
		});

		this.client.login(config.token);
	}
	destroy() {
		return this.client.destroy();
	}
}

module.exports = ReputationCore;
