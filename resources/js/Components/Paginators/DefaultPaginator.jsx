import * as React from 'react';

import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { router } from '@inertiajs/react';

export default function DefaultPaginator({ meta, url }) {
  // meta is expected to contain current_page and last_page
  const [page, setPage] = React.useState(meta?.current_page);

  const handleChange = (event, value) => {
    setPage(value);

    // Navigate to the new page using Inertia
    router.get(url, { page: value }, { preserveScroll: true });
  };

  return ( !meta.total != 0 ? null :
    <Stack spacing={2}>
      <Pagination count={meta?.last_page} page={page} onChange={handleChange} />
    </Stack>
  );
}
