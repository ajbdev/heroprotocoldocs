---
imports:
  JsonView: 'react-json-view'
  replay: '../replay'
---

# header

The header part of the MPQ archive contains top-level information about the archive. This information is essential to know which version you will need to decode. 

```render
<JsonView  src={replay.get()} />
```