import { Link } from '@inertiajs/react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function BackLink({ children, ...props }) {
    return (
        <Link {...props} preserveScroll className='flex gap-2 items-center w-[max-content] text-gray-800 hover:text-gray-700'>
            <KeyboardReturnIcon />
            {children}
        </Link>
    );
}
