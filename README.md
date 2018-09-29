# Reputation Core
![npm](https://img.shields.io/npm/v/reputation-core.svg)
[![npm](https://img.shields.io/npm/dt/reputation-core.svg)](https://www.npmjs.com/package/reputation-core)
![license](https://img.shields.io/github/license/hparcells/reputation-core.svg)
![GitHub issues](https://img.shields.io/github/issues/hparcells/reputation-core.svg)


A transformed version of the module handler from the [Reputation Bot](https://github.com/Filip9696/reputation).
It is now an npm module to handle any discord bot.
ReputationCore is build off of [Discord.js](https://github.com/discordjs/discord.js)



## Simple Usage
Make sure to run `npm install reputation-core`

index.js
```js
const BotCore = require('reputation-core');

let bot = new BotCore({modulePath: 'modules', token: 'ABCDEF'});

bot.on('ready', () => {
	console.log(`Logged in as ${bot.client.user.tag}`);
})

```

modules/ping.mod.js
```js
exports.id = 'ping';
exports.onLoad = api => {
	api.commands.add('ping', (msg) => {

		// msg is the Discord Message (discord.js)
		msg.channel.send(':ping_pong: Pong!');

	})
};

```
