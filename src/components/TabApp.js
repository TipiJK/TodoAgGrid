import React, { useState } from'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Home from '../Home';
import Todotable from './Todotable';

function TabApp() {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="HOME" />
                <Tab value="two" label="TODOS" />
            </Tabs>
            {value === 'one' && <div><Home/></div>}
            {value === 'two' && <div><Todotable/></div>}
        </div>
    );
}

export default TabApp;