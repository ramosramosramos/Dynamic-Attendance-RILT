import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '../DropDowns/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
export default function StudentCard({ student }) {

    return (
        <>

            <div className='bg-white rounded-md p-2'>
                <div className="   text-green-950  rounded-lg shadow-2xl space-y-4 ">
                    <div className='flex justify-end'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className='cursor-pointer text-green-900'>
                                    <MoreVertIcon />
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {route().current('students.index') &&
                                    <>
                                        <Dropdown.Link href={route('students.edit', student.id)}>
                                            Edit
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to archive.")} method="post" href={route('students.moveArchive', student.id)}>
                                            Archive
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('students.destroy', student.id)}>
                                            Move to bin
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('students.archive') &&
                                    <>

                                        <Dropdown.Link onSuccess={() => toast.success("Successfully restored from archive.")} method="post" href={route('students.restoreArchive', student.id)}>
                                            Restore from archive
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('students.destroy', student.id)}>
                                            Move to bin
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('students.bin') &&
                                    <>

                                        <Dropdown.Link onSuccess={() => toast.success("Successfully restored from bin.")} method="post" href={route('students.restore', student.id)}>
                                            Restore from bin
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Permanently deleted.")} method="post" href={route('students.forceDelete', student.id)}>
                                            Permanently delete
                                        </Dropdown.Link>
                                    </>
                                }
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className='p-5  space-y-3'>
                        <span className='flex gap-2'> <AccountCircleIcon /> <p>{student.name}</p></span>

                        <i className='flex gap-2 text-sm text-gray-600'> Created:<p>{student.created_at}</p></i>
                    </div>
                </div>
            </div>

        </>

    );
}
