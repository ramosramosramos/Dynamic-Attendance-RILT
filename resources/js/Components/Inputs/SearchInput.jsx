

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from '@inertiajs/react';

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function SearchInput({ items, url, filters }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);

            setLoading(false);

            setOptions([...items]);
        })();
    };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const { data, setData, get } = useForm({ search: filters?.search ?? '',role:filters?.role ?? '' });

    const submit = (e) => {
        e.preventDefault();
        get(url,{
            preserveScroll:true,
        });

    }

    console.log(filters.search);
    return (
        <form onSubmit={submit}>
            <Autocomplete
            autoFocus
                sx={{ width: 300, }}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                inputValue={data.search}
                onChange={(e) => setData('search', e.target.textContent)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={(e) => setData('search', e.target.value)}
                        value={data.search}
                        label="Search name"
                        autoFocus
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            },
                        }}
                    />
                )}
            />

        </form>
    );
}

