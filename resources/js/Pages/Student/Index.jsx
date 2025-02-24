import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import StudentCard from '@/Components/Cards/StudentCard';
import Dropdown from '@/Components/DropDowns/Dropdown';
import SearchInput from '@/Components/Inputs/SearchInput';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';
export default function Index({ students, filters }) {
    const filteredArrays = { search: filters?.search ?? '' };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students
                </h2>
            }
        >
            <Head title="Students" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-between items-center">
                            <PrimaryButton onClick={() => router.get(route('students.create'))}>
                                Create new student
                            </PrimaryButton>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className='cursor-pointer text-black'>
                                        <MenuIcon />
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('students.archive')}>
                                        Archive
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('students.bin')}>
                                        Bin
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="p-6 text-gray-900 flex flex-wrap gap-5 items-center max-sm:justify-center  sm:justify-center md:justify-center lg:justify-start">
                            <SearchInput items={students.data} url={route('students.index')} filters={filteredArrays} />
                        </div>


                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg p-5 bg-white grid gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ">

                        {students.data.length > 0 ?
                            students.data?.map((student) => (
                                <div key={student.id}>
                                    <StudentCard student={student} />
                                </div>
                            )) : <p className='text-slate-700'>No data found</p>
                        }

                    </div>
                    <DefaultPaginator meta={students.meta} url={route('students.index')} filters={filteredArrays} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
