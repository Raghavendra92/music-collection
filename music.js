const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

let musicCollection = [];

const commands = {
    add(title, artist) {
        if (musicCollection.some(album => album.title === title)) {
            console.log(`An album with the title "${title}" already exists.`);
            return `An album with the title "${title}" already exists.`
        }
        musicCollection.push({ title, artist, played: false });
        console.log(`Added "${title}" by ${artist}`);
        return `Added "${title}" by ${artist}`
    },

    play(title) {
        const album = musicCollection.find(album => album.title === title);
        if (album) {
            album.played = true;
            console.log(`You're listening to "${title}"`);
            return `You're listening to "${title}"`
        } else {
            console.log(`"${title}" not found.`);
            return `"${title}" not found.`
        }
    },

    show(args) {
        let filteredCollection = musicCollection;

        if (args.includes('unplayed')) {
            filteredCollection = filteredCollection.filter(album => !album.played);
        }
        if (args.includes('by')) {
            const artistIndex = args.indexOf('by') + 1;
            const artist = args[artistIndex];
            filteredCollection = filteredCollection.filter(album => album.artist === artist);
        }

        if (filteredCollection.length === 0) {
            console.log('No albums found.');
            return 'No albums found.'
        }

        filteredCollection.forEach(album => {
            console.log(`"${album.title}" by ${album.artist} (${album.played ? 'played' : 'unplayed'})`);
        });
    },

    quit() {
        console.log('Bye!');
        process.exit();
    }
};

console.log('Welcome to your music collection!');

rl.prompt();
rl.on('line', (line) => {
    let [command, ...args] = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    command = command ? command.replace(/"/g, '') : '';
    args = args.map(arg => arg.replace(/"/g, '')); // Remove quotes from arguments

    if (command === 'show') {
        commands.show(args);
    } else if (commands[command]) {
        commands[command](...args);
    } else {
        console.log('Unknown command');
    }

    rl.prompt();
}).on('close', () => {
    commands.quit();
});

module.exports = {commands, musicCollection};