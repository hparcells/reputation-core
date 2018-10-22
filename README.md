# Reputation Core
![status](https://img.shields.io/badge/status-completed-brightgreen.svg)
![maintained](https://img.shields.io/badge/maintained-no%20(as%20of%202018)-red.svg)

[![GitHub issues](https://img.shields.io/github/issues/hparcells/reputation-core.svg)](https://github.com/hparcells/reputation-core)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/hparcells/reputation-core.svg)](https://github.com/hparcells/reputation-core)
![license](https://img.shields.io/github/license/hparcells/reputation-core.svg)

![npm](https://img.shields.io/npm/v/reputation-core.svg)
[![npm](https://img.shields.io/npm/dt/reputation-core.svg)](https://www.npmjs.com/package/reputation-core)

[![dependencies Status](https://david-dm.org/hparcells/reputation-core/status.svg)](https://david-dm.org/hparcells/reputation-core)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/efa1d728c0f44cc287ae485fa30fc4c6)](https://www.codacy.com/app/hparcells/reputation-core?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hparcells/reputation-core&amp;utm_campaign=Badge_Grade)

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
