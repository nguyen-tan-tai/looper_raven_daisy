const birds = ["Eagle", "Duck", "Hen", "Parrot", "Peacock", "Dove", "Stork", "Swan", "Pigeon", "Goose",
    "Pelican", "Macaw", "Parakeet", "Finches", "Crow", "Raven", "Vulture", "Hawk", "Crane", "Penguin",
    "Hummingbird", "Sparrow", "Woodpecker", "Hornbill", "Owl", "Myna", "Cuckoo", "Turkey", "Quail", "Ostrich",
    "Emu", "Cockatiel", "Kingfisher", "Kite", "Cockatoo", "Nightingale", "Blue jay", "Magpie", "Goldfinch", "Robin",
    "Swallow", "Starling", "Pheasant", "Toucan", "Canary", "Seagull", "Heron", "Potoo", "Bush warbler", "Barn swallow",
    "Cassowary", "Mallard", "Common swift", "Falcon", "Megapode", "Spoonbill", "Ospreys", "Coot", "Rail", "Budgerigar",
    "Wren", "Lark", "Sandpiper", "Arctic tern", "Lovebird", "Conure", "Rallidae", "Bee-eater", "Grebe", "Guinea fowl",
    "Passerine", "Albatross", "Moa", "Kiwi", "Nightjar", "Oilbird", "Dodo", "Azure dollar", "Purple dollar", "Gannet",
    "Thrush", "Avocet", "Catbird", "Bluebird", "Roadrunner", "Dunnock", "Northern cardinal", "Teal", "Northern shoveler", "Gadwall",
    "Northern pintail", "Hoatzin", "Kestrel", "Oriole", "Partridge", "Tailorbird", "Wagtail", "Weaverbird", "Skylark"];
const flowers = ["ant", "bed bug", "bee", "beetle", "butterfly", "centipede", "cicada", "cockroach", "louse", "cricket",
    "dragonfly", "earthworm", "firefly", "flea", "fly", "grasshopper", "ladybug", "locust", "millipede", "moth",
    "mosquito", "praying mantis", "pupa", "rice weevil", "scorpion", "silkworm", "snail", "spider", "stick bug",
    "termite", "wasp", "bumblebee", "worm", "looper", "earwig", "leaf-miner", "horse-fly", "mayfly", "midge", "cocoon"];
const insects = ["ant", "bed", "bee", "beetle", "bug", "bumblebee", "butterfly", "centipede", "cicada", "cockroach",
    "cocoon", "cricket", "dragonfly", "earthworm", "earwig", "firefly", "flea", "fly", "glowworm", "grasshopper",
    "ladybird", "ladybug", "leaf-miner", "locust", "looper", "louse", "mantis", "mayfly", "midge", "millipede",
    "mosquito", "moth", "praying", "pupa", "rice", "scorpion", "silkworm", "snail", "spider", "stick",
    "termite", "wasp", "worm"];

function WordList({ value, onChange }) {
    function handleChange(v) {
        onChange(v);
    }

    return (
        <select className="word-list" value={value} onChange={(e) => handleChange(e.target.value)}>
            <option value="birds">Birds</option>
            <option value="flowers">Flowers</option>
            <option value="insects">Insects</option>
        </select>
    );
}

function Output({ names }) {
    return (
        <div className="output">
            <ul>
                {names.map((name, index) => {
                    return (<li key={index}>{name}</li>)
                })}
            </ul>
        </div>
    );
}

function App() {
    const [connector, setConnector] = React.useState("_");
    const [quantity, setQuantity] = React.useState(10);
    const [wordLists, setWordLists] = React.useState(["insects", "birds", "flowers"]);

    function handleSettingChange(v, i) {
        let w = wordLists.slice();
        w[i] = v;
        setWordLists(w);
    }

    function handleQuantityChange(v) {
        let q = parseInt(v) || 1;
        setQuantity(q < 1 ? 1 : q);
    }

    function handleConnectorChange(v) {
        setConnector(v);
    }

    function getRandomInt(min, max) {
        var byteArray = new Uint8Array(1);
        window.crypto.getRandomValues(byteArray);
        var randomNum = '0.' + byteArray[0].toString();
        return Math.floor(randomNum * (max - min + 1)) + min;
    }

    function generate() {
        let output = "";
        for (const wordList of wordLists) {
            const wl = window[wordList];
            const rv = getRandomInt(0, wl.length);
            output += wl[rv];
            output += connector;
        }
        return output.substring(0, output.length - 1).toLowerCase();
    }

    function getGeneratedNames() {
        return Array(quantity).fill().map(() => generate());
    }
    return (
        <div className="name-generator">
            <h2>Chọn danh sách</h2>
            <div className="setting">
                {wordLists.map((name, index) => {
                    return (<WordList key={index} value={name} onChange={(v) => handleSettingChange(v, index)} />)
                })}
            </div>
            <h2>Kiểu nối và số lượng</h2>
            <div className="controls">
                <span className="connector">Kiểu nối:</span>
                <input className="connector" type="text" value={connector} onChange={(e) => handleConnectorChange(e.target.value)}></input>
                <span className="quantity">Số lượng:</span>
                <input className="quantity" type="number" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)}></input>
            </div>
            <h2>Kết quả</h2>
            <Output names={getGeneratedNames()} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
