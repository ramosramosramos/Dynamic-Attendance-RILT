import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

function getStyles(name, itemName, theme) {
  return {
    fontWeight: itemName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function SelectSearch({items}) {
  const theme = useTheme();
  const [itemName, setItemName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Role</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"

          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput label="Role" />}
          MenuProps={MenuProps}
        >
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
