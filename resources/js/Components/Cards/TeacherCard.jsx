import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '../DropDowns/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
export default function TeacherCard({ teacher }) {

    return (
        <>

            <div className='bg-white rounded-md p-2'>
                <div className='flex justify-end'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className='cursor-pointer text-green-950'>
                                <MoreVertIcon />
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            {route().current('teachers.index') &&
                                <>
                                    <Dropdown.Link href={route('teachers.edit', teacher.id)}>
                                        Edit
                                    </Dropdown.Link>
                                    <Dropdown.Link onSuccess={() => toast.success("Successfully move to archive.")} method="post" href={route('teachers.moveArchive', teacher.id)}>
                                        Archive
                                    </Dropdown.Link>
                                    <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('teachers.destroy', teacher.id)}>
                                        Move to bin
                                    </Dropdown.Link>
                                </>
                            }
                            {route().current('teachers.archive') &&
                                <>

                                    <Dropdown.Link onSuccess={() => toast.success("Successfully restored from archive.")} method="post" href={route('teachers.restoreArchive', teacher.id)}>
                                        Restore from archive
                                    </Dropdown.Link>
                                    <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('teachers.destroy', teacher.id)}>
                                        Move to bin
                                    </Dropdown.Link>
                                </>
                            }
                            {route().current('teachers.bin') &&
                                <>

                                    <Dropdown.Link onSuccess={() => toast.success("Successfully restored from bin.")} method="post" href={route('teachers.restore', teacher.id)}>
                                        Restore from bin
                                    </Dropdown.Link>
                                    <Dropdown.Link onSuccess={() => toast.success("Permanently deleted.")} method="post" href={route('teachers.forceDelete', teacher.id)}>
                                        Permanently delete
                                    </Dropdown.Link>
                                </>
                            }
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="   text-green-950  rounded-lg shadow-2xl space-y-4 p-5">
                    <span className='flex gap-2'> <AccountCircleIcon /> <p>{teacher.name}</p></span>

                    <i className='flex gap-2 text-sm text-gray-600'> Created:<p>{teacher.created_at}</p></i>
                </div>
            </div>

        </>

    );
}
