---
imports:
  JsonView: 'react-json-view'
  parser: '../parser'
---

# header

The header part of the MPQ archive contains top-level information about the archive. 
This information is essential to know which version you will need to decode. 
The structure of this section does not seem to change from protocol version to protocol version.
Most replay decoders use a very early version of a known working decoder to read this section 
only and extract the version information from it, and then load the remainder of the replay file using the 
correct protocol decoder version. 

```render
<JsonView  src={parser.get('header')} name="header" />
```

## m_signature
Appears to be a string identifier of the program being ran.

## m_version
A hash of information regarding the version of the program that the replay is recorded with.

| | |
|-|-|
|m_flags| |
|m_major| Major semantic version |
|m_minor| Minor semantic version |
|m_revision| Patch semantic version|
|m_build| Version build number. This is the number that is associated with a protocol decoder.|
|m_baseBuild| Appears to be the same as m_build in all instances|

## m_elapsedGameLoops

The total number of game loops that finished during this game. 16 game loops occur per second, so divide this 
number by 16 to get the total time of a game.

## m_dataBuildNum

Appears to be the same as m_build from the m_version hash.