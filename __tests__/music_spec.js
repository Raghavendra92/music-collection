const {commands, musicCollection} = require('../music.js');

describe('MusicCollection', () => {

    test('adds albums to the collection', () => {
        expect(commands.add('Ride the Lightning', 'Metallica')).toMatch('Added "Ride the Lightning" by Metallica');
        expect(musicCollection.length).toBe(1);
    });

    test('prevents adding duplicate albums', () => {
        commands.add('Ride the Lightning', 'Metallica');
        expect(commands.add('Ride the Lightning', 'Metallica')).toMatch('An album with the title "Ride the Lightning" already exists.');
    });

    test('marks an album as played', () => {
        commands.add('Ride the Lightning', 'Metallica');
        expect(commands.play('Ride the Lightning')).toMatch('You\'re listening to "Ride the Lightning"');
        expect(musicCollection[0].played).toBeTruthy();
    });
});