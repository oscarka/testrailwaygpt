
import React, { useState } from 'react';

function App() {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div>
            <h1>English Speaking Practice</h1>
            <input type="text" value={input} onChange={handleInputChange} />
            <p>Your input: {input}</p>
            {/* Add more components here as needed */}
        </div>
    );
}

export default App;
