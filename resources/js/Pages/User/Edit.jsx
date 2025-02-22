import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import SelectInput from '@/Components/Inputs/SelectInput';
import TextInput from '@/Components/Inputs/TextInput';
import BackLink from '@/Components/Links/BackLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Edit({ user, roles }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.data.name,
        email: user.data.email,
        role: user.data.role_name,

    });

    const submit = (e) => {
        e.preventDefault();

        post(route('users.update',user.id), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                toast.success('User updated successfully!');
                reset();
                router.get(route('users.index'));
            },
            onError: (error) => {
                toast.error(error.name);
                toast.error(error.email);
                toast.error(error.role);
            }
        });

    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit | User
                </h2>
            }
        >
            <Head title="Edit | User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BackLink href={route('users.index')}>
                                Go back to users
                            </BackLink>
                        </div>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg p-5 bg-white grid gap-5 lg:grid-cols-2 sm:grid-cols-1 ">


                        <form onSubmit={submit} className='w-full'>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}

                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}

                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="role" value="Role" />

                                <SelectInput value={data.role} onChange={(e) => setData('role', e.target.value)} items={roles} />

                                <InputError message={errors.role} className="mt-2" />
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
