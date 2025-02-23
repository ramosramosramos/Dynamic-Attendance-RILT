import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TeacherCard from '@/Components/Cards/TeacherCard';
import UserCard from '@/Components/Cards/UserCard';
import Dropdown from '@/Components/DropDowns/Dropdown';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';
export default function Index({ teachers, filters }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Teachers
                </h2>
            }
        >
            <Head title="Teachers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-between items-center">
                            <PrimaryButton onClick={() => router.get(route('teachers.create'))}>
                                Create new teacher
                            </PrimaryButton>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className='cursor-pointer text-black'>
                                        <MenuIcon />
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('teachers.archive')}>
                                        Archive
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('teachers.bin')}>
                                        Bin
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="p-6 text-gray-900 flex flex-wrap gap-5 items-center max-sm:justify-center  sm:justify-center md:justify-center lg:justify-start">

                        </div>


                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg p-5 bg-white grid gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ">

                        {teachers.data.length > 0 ?
                            teachers.data?.map((teacher) => (
                                <div key={teacher.id}>
                                    <TeacherCard teacher={teacher} />
                                </div>
                            )) : <p className='text-slate-700'>No data found</p>
                        }

                    </div>
                    <DefaultPaginator meta={teachers.meta} url={route('teachers.index')} filters={filters} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
