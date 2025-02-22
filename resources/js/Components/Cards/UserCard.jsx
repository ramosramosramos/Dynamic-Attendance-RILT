import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Dropdown from '../DropDowns/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
export default function UserCard({ user }) {

    return (
        <>

            <div className='bg-gray-900 rounded-md p-2'>
                <div className='flex justify-end'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <spa className='cursor-pointer text-white'>
                                <MoreVertIcon />
                            </spa>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('users.edit', user.id)}>
                                Edit
                            </Dropdown.Link>
                            <Dropdown.Link onSuccess= {()=>toast.success("Successfully move to archive.")}  method="post" href={route('users.moveArchive', user.id)}>
                                Archive
                            </Dropdown.Link>
                            <Dropdown.Link  onSuccess= {()=>toast.success("Successfully move to bin.")}  method="post" href={route('users.destroy', user.id)}>
                                Move to bin
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="  text-white rounded-lg shadow-2xl space-y-4">
                    <span className='flex gap-2'> <AccountCircleIcon /> <p>{user.name}</p></span>
                    <span className='flex gap-2 text-sm'> <EmailIcon /> <p>{user.email}</p></span>
                    <span className='flex gap-2 text-sm'> <QuestionMarkIcon /> <p>{user.role_name}</p></span>
                </div>
            </div>

        </>

    );
}
