import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Dropdown from '../DropDowns/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
export default function UserCard({ user }) {

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
                                {route().current('users.index') &&
                                    <>
                                        <Dropdown.Link href={route('users.edit', user.id)}>
                                            Edit
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to archive.")} method="post" href={route('users.moveArchive', user.id)}>
                                            Archive
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('users.destroy', user.id)}>
                                            Move to bin
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('users.archive') &&
                                    <>

                                        <Dropdown.Link onSuccess={() => toast.success("Successfully restored from archive.")} method="post" href={route('users.restoreArchive', user.id)}>
                                            Restore from archive
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Successfully move to bin.")} method="post" href={route('users.destroy', user.id)}>
                                            Move to bin
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('users.bin') &&
                                    <>

                                        <Dropdown.Link onSuccess={() => toast.success("Successfully restored from bin.")} method="post" href={route('users.restore', user.id)}>
                                            Restore from bin
                                        </Dropdown.Link>
                                        <Dropdown.Link onSuccess={() => toast.success("Permanently deleted.")} method="post" href={route('users.forceDelete', user.id)}>
                                            Permanently delete
                                        </Dropdown.Link>
                                    </>
                                }
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className='p-5  space-y-3'>
                        <span className='flex gap-2'> <AccountCircleIcon /> <p>{user.name}</p></span>
                        <span className='flex gap-2 text-sm'> <EmailIcon /> <p>{user.email}</p></span>
                        <span className='flex gap-2 text-sm'> <QuestionMarkIcon /> <p>{user.role_name}</p></span>
                        <i className='flex gap-2 text-sm text-gray-600'> Created:<p>{user.created_at}</p></i>
                    </div>
                </div>
            </div>

        </>

    );
}
