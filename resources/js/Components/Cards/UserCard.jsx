import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
export default function UserCard({ user }) {

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-2xl space-y-4">
            <span className='flex gap-2'> <AccountCircleIcon /> <p>{user.name}</p></span>
            <span className='flex gap-2'> <EmailIcon /> <p>{user.email}</p></span>
            <span className='flex gap-2'> <QuestionMarkIcon /> <p>{user.role_name}</p></span>
        </div>

    );
}
