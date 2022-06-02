console.log("Bitcoin price code evaluated");

const root_id = "bc-tracker-root";
const coingecko_base_url = "https://api.coingecko.com/api/v3/";

function set_price(setState) {
    console.log("fetch price");
    fetch(coingecko_base_url + 'simple/price?ids=bitcoin&vs_currencies=usd')
        .then((res) => res.json())
        .then((json) => { console.log(json.bitcoin.usd); setState(json.bitcoin.usd);})
        .catch((err) => console.error(err));

}

function watch_price(setState) {
    set_price(setState);
    const id = setInterval(() => set_price(setState), 10000);
    return () => {
        clearInterval(id);
    };
}

function bitcoin_ticker() {
    const [state, setState] = React.useState("Loading ...");
    React.useEffect(() => {
        return watch_price(setState);
    }, []);

    return React.createElement(
        "span",
        {className: 'btc-tracker-container'},
        React.createElement(
            "img",
            {src: "https://bitcoin.org/img/icons/opengraph.png?1652976465",
             height: "16px",
             width: "16px"}
        ),
        "$" + state
    );
}

function onload() {
    const container = document.getElementsByClassName("roam-sidebar-content")[0];
    const price_root = document.createElement("span");

    price_root.id = root_id;
    container.insertBefore(price_root, container.children[1]);
    ReactDOM.render(React.createElement(bitcoin_ticker), price_root);

    console.log("Loaded bitcoin price");
}

function onunload() {
    const price_root = document.getElementById(root_id);

    ReactDOM.unmountComponentAtNode(price_root);
    price_root.remove();

    console.log("Unloaded bitcoin price");
}

export default {
    onload: onload,
    onunload: onunload
};
