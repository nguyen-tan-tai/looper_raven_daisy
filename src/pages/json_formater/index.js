function JsonInput({ value, onChange }) {
    function handleChange(v) {
        onChange(v);
    }

    return (
        <textarea className="input-json" value={value} onChange={(e) => handleChange(e.target.value)}></textarea>
    );
}

function OutputJson({ value, isMin, indent }) {

    function getFormatJson() {
        try {
            if (isMin) {
                return JSON.stringify(JSON.parse(value));
            }
            return JSON.stringify(JSON.parse(value), null, indent);
        } catch (e) {
            return "";
        }
    }

    return (
        <textarea className="output-json" defaultValue={getFormatJson()}></textarea>
    );
}


function App() {
    const [input, setInput] = React.useState('');
    const [isMin, setIsMin] = React.useState(false);
    const [indent, setIndent] = React.useState(2);
    const [lastChange, setLastChange] = React.useState(0);

    function handleInputChange(v) {
        setInput(v);
        setLastChange(Date.now());
    }
    function handleIsMinChange(v) {
        setIsMin(v);
        setLastChange(Date.now());
    }
    function handleIndentChange(v) {
        setIndent(parseInt(v));
        setLastChange(Date.now());
    }

    return (
        <div className="json-formater">
            <JsonInput value={input} onChange={(v) => handleInputChange(v)} />
            <div className="control">
                Cài đặt:
                <label className="is-min">
                    Không cần indent?
                    <input type="checkbox" value={isMin} onChange={(e) => handleIsMinChange(e.target.checked)}></input>
                </label>
                <label className="indent">
                    Indent?
                    <input disabled={isMin} type="number" value={indent} onChange={(e) => handleIndentChange(e.target.value)} />
                </label>
            </div>
            <OutputJson key={lastChange + 1} value={input} isMin={isMin} indent={indent} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
