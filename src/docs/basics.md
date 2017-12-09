# Heroes of the Storm replay files
Ever wonder how Heroes of the Storm replay files work? HotS replay files are a collection of only the essential events that occurred during a game.

To give you a more clear example, when a regular video game "saves" the save file usually looks something like this:

Character Name: Link
Class: Warrior
Health Points: 1200
Location: Hyrule
Weapon: Master Sword
...etc...

When the game loads this save file, it reads the game "state" from the save file directly in to the game. It instantly knows exactly who you are. 

However, a Heroes of the Storm replay file is more complex. In order to play back a game for you to watch, it must save all the events that happened in the game so it's history can accurately be recreated. An "event" can be as simple as message, ability use, attack command, or even a simple mouse click. So a heroes of the storm replay file usually looks something like this:

- KaelThas used the FlameStrike ability underneath the opposing hero Garrosh
- The opposing team member Garrosh received 100 damage from flamestrike
- The opposing team member Nova received 100 damage from flamestrike
- Abathur added the symbioate hat to his team's butcher 
- The opposing team member Nova walked within tower range and has been revealed
- Butcher used the Charge ability targeting Nova
- Butcher melee attached Nova for 86 damage
- Buthcer used the Brand ability targeting Nova
- Butcher melee attacked Nova for 103 damage
- Butcher has been healed for 27 hit points due to the Brand ability on Nova
- Butcher melee attacked Nova for 103 damage
- Nova was killed by the Butcher (assists: KaelThas, Nexus Forces)

(this is completely fictitious, but you get it... right?)

As you can see, HotS replay files are a stream of unique events that allow the game engine to recreate the game as it happened.

## How it technically works
Heroes of the Storm saves .StormReplay files after every game you play. 

By default these files are stored at:

On windows:

On Mac:

The .StormReplay files contain all the game events necessary to watch a completed game. 
.StormReplay files are a compressed file format. This archive format is known as MPQ. Why is it named MPQ? I don't know. According to Wikipeida (https://en.wikipedia.org/wiki/MPQ) it's named after the dude who created. Apparently he thinks his name is befitting of a compressed archive file format or something. 
Blizzard has used this archive format in every game they've released dating back to Diablo 1. Luckily, a bunch of smart people have reverse engineered this file format and we can easily access it's contents. 

## The decoder
https://i.imgur.com/jvnneLX.gif

Opening the MPQ archive is just the first part: once the replay file is opened, it must be decoded from a binary format into something that makes sense of the events and information it contains. Luckily, Blizzard has thrown us a bone here. For whatever reason, and contrary to most game developers within the last decade or so, Blizzard has open sourced their Heroes of the Storm StormReplay file protocol decoder so we can understand the information within it. You can find it at: https://github.com/Blizzard/heroprotocol

It's in Python, though, which may or may not work for you. Luckily, there's been some astounding people that have made other protocol decoders:
- Barret77 C#'s parser (yes, the hotslogs dude)
- heroprotocoljs - Javascript (previously by Jnovak and originally by Farof - I am only adding this as my own repo because I have fixed several bugs that have not been merged into their repo's)



