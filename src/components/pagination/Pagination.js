import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PaginationRounded = (props) => {

    const {pageFunc, itemsPerPage, totalItems} = props;

    const handleChange = (e, p) => {
        // console.log(e, p);
        pageFunc(p);
    }

  return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(totalItems / itemsPerPage)} shape="rounded" onChange={handleChange} />
    </Stack>
  );
}