const BitShares = require("./lib");


async function start() {
    BitShares.connect("ws://localhost:30201");
    BitShares.subscribe('connected', start);
    let [bts, account, order] = await BitShares.db.get_objects(['1.3.0', '1.2.849826', '1.7.65283036']);

    console.log(bts, account, order);
}

start()