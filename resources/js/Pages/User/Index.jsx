import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import UserCard from '@/Components/Cards/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ users }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                          <PrimaryButton onClick={() => router.get(route('users.create'))}>
                            Create new user
                          </PrimaryButton>
                        </div>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg p-5 bg-white grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 ">

                        { users.data.length >0 &&
                            users.data?.map((user) => (
                                <div key={user.id}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
