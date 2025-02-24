import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import BackLink from '@/Components/Links/BackLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Edit({user, students }) {

    const { data, setData, post, processing, errors, reset } = useForm({

        user_id: user.user_id,


    });

    const submit = (e) => {
        e.preventDefault();

        post(route('students.update',user.id), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                toast.success('Student created successfully!');
                reset();
                router.get(route('students.index'));
            },
            onError: (error) => {
                toast.error(error.user_id);

            }
        });

    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit | Student
                </h2>
            }
        >
            <Head title="Edit | Student" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BackLink href={route('students.index')}>
                                Go back to students
                            </BackLink>
                        </div>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg p-5 bg-white grid gap-5 lg:grid-cols-2 sm:grid-cols-1 ">


                        <form onSubmit={submit} className='w-full'>


                            <div className="mt-4">
                                <InputLabel htmlFor="student" value="Student" />

                                <select  value={data.user_id} onChange={(e) => setData('user_id', e.target.value)}

                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                                >
                                    <option value={''}>{"Select student"}</option>
                                    {students?.map((student) => (
                                        <option key={student.id} value={student.id}>{student.name}</option>
                                    ))}
                                </select>

                                <InputError message={errors.user_id} className="mt-2" />
                            </div>


                            <div className="mt-4 flex items-center justify-start">


                                <PrimaryButton disabled={processing}>
                                  Save
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
