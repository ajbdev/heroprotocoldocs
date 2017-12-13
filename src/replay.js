

const replay = {
    obj: {},
    onChange: (replay) => {},

    get: () => {
        return replay.obj
    },

    set: (json) => {
        replay.obj = json
        replay.onChange(json)
    }
}

export default replay