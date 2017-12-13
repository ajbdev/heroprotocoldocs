

const replay = {
    obj: {},
    onChange: (replay) => {},

    get: (part) => {
        if (replay.obj[part]) {
            return replay.obj[part]
        }

        return {}
    },

    set: (json) => {
        replay.obj = json
        replay.onChange(json)
    }
}

export default replay