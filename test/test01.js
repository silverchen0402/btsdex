const BitShares = require('../lib');
const util = require('util');
var tx;
let user = "admin";
let privkey = "5KNP4D9K3FL1gBtRtanhfgLZTpz1wcJVsLEQXonRMeAwzMDL2se";
//sync function start() {


// [{ amount: 117669, asset: Asset {id: '1.3.0',...} },{...}]
//}

(async () => {
    try {
        //let bot = new BitShares(user, privkey, "BTS");
        //await BitShares.connect(process.env.BITSHARES_NODE);
        //BitShares.subscribe('connected', start);
        //console.log(await bot.balances());
        //BitShares.init("ws://localhost:30201");
        await BitShares.connect("ws://localhost:30201");
        BitShares.subscribe('block', callEachBlock);
        //console.log(await bot.balances());
        let acct = await BitShares.assets["bts"];
        console.log(acct);
        let bot = new BitShares(user, privkey);
        [tx] = await bot.transfer("demo-user-1", "bts", 10);
        //console.log("tx is",tx);
        console.log(util.inspect(tx, {showHidden: false, depth: null, colors: true}))

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();

async function callEachBlock(obj) {
    /* is called with each block created */
    //console.log(obj);
    console.log("new block", obj[0].head_block_number);
    if (tx && (tx.block_num + 21) < obj[0].head_block_number) {
        let blockTx = await BitShares.db.get_transaction(tx.block_num, tx.trx_num)
        //console.log("tx in block",blockTx);
        console.log(util.inspect(blockTx, {showHidden: false, depth: null, colors: true}))
        if (blockTx.signatures[0] === tx.trx.signatures[0])
            console.log("tx irreversible");
    }
}