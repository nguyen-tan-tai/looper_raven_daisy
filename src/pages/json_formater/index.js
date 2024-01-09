function JsonInput({ value, onChange }) {
    function handleChange(v) {
        onChange(v);
    }

    return (
        <div className="input-json">
            <textarea value={value} onChange={(e) => handleChange(e.target.value)}></textarea>
        </div>
    );
}

function PrettyOutput({ value }) {

    function getPrettyJson() {
        try {
            return JSON.stringify(JSON.parse(value), null, 2);
        } catch (e) {
            return "{}"
        }
    }

    return (
        <div className="pretty-json">
            <textarea defaultValue={getPrettyJson()}></textarea>
        </div>
    );
}

function MinimizedOutput({ value }) {
    function getMinimizedJson() {
        try {
            return JSON.stringify(JSON.parse(value));
        } catch (e) {
            return "{}"
        }
    }

    return (
        <div className="minimized-json">
            <textarea defaultValue={getMinimizedJson()}></textarea>
        </div>
    );
}


function App() {
    const [input, setInput] = React.useState("{}");
    const [lastChange, setLastChange] = React.useState(0);

    function handleInputChange(v) {
        setInput(v);
        setLastChange(Date.now());
    }
    return (
        <div className="json-formater">
            <JsonInput value={input} onChange={(v) => handleInputChange(v)} />
            <PrettyOutput key={lastChange + 1} value={input} />
            <MinimizedOutput key={lastChange + 2} value={input} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
