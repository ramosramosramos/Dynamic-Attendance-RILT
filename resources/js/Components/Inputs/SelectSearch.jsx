import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { router, useForm } from '@inertiajs/react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedName, theme) {
    return {
        fontWeight: selectedName === name
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SelectSearch({ items, filters, url }) {
    const theme = useTheme();
    // Initialize as a string for a single selection
    const [itemName, setItemName] = React.useState(filters?.role ?? '');

    const handleChange = (event) => {
        const value = event.target.value;

        router.get(url, { role: value,search:filters.search }, { preserveScroll: true });
        // Update the local state for the Select component
        setItemName(value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-single-name-label">Role</InputLabel>
                <Select
                    labelId="demo-single-name-label"
                    id="demo-single-name"
                    value={itemName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Role" />}
                    MenuProps={MenuProps}
                >
                      <MenuItem
                            value={""}
                            style={getStyles("Select none", itemName, theme)}
                        >
                            {"Select none"}
                        </MenuItem>
                    {items.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.name}
                            style={getStyles(item.name, itemName, theme)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
