import React, { useEffect } from "react";
import { Alert, Button } from "@mui/material";
import { Link, usePage, Head, router } from "@inertiajs/react";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserList = ({ adminList, userList }) => {
    const { flash } = usePage().props;

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "-";
        const date = new Date(tanggal);
        return date.toLocaleString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleDeleteAdmin = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus user admin ini?")) {
            router.delete(`/admin/user/${id}`, {
                onSuccess: () => {
                    console.log('Admin user deleted successfully!');
                },
                onError: (errors) => {
                    console.error('Failed to delete admin user:', errors);
                    alert('Gagal menghapus user admin. Silakan coba lagi.');
                }
            });
        }
    };

    useEffect(() => {
        if (
            userList?.data?.length === 0 &&
            userList?.links?.length > 3 &&
            userList?.first_page_url
        ) {
            router.visit(userList.first_page_url, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    }, [userList]);

    const PaginationLinks = ({ data }) => {
        if (!data || data.links.length <= 3) return null;

        return (
            <div className="mt-6 flex justify-end space-x-2">
                {data.links.map((link, index) => {
                    if (!link.url) {
                        return (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 text-sm rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <Head title="User List" />
            <div className="w-full bg-gray-100 min-h-screen">
                <div className="w-full flex justify-center fixed top-6 z-[9999]">
                    {flash.success && <Alert severity="success">{flash.success}</Alert>}
                    {flash.failled && <Alert severity="error">{flash.failled}</Alert>}
                </div>

                <PermanentDrawerLeft>
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-2xl font-semibold opacity-90">Data Admin</h1>
                        <Button
                            variant="contained"
                            component={Link}
                            href="/admin/user/create"
                        >
                            Tambah Admin
                        </Button>
                    </div>

                    <div className="p-6 w-full">
                        <div className="bg-white rounded-lg shadow-md overflow-auto">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                                        <th className="text-left py-3 px-4">#</th>
                                        <th className="text-left py-3 px-4">TANGGAL DAFTAR</th>
                                        <th className="text-left py-3 px-4">NAMA</th>
                                        <th className="text-left py-3 px-4">NOMOR TELPON</th>
                                        <th className="text-left py-3 px-4">EMAIL</th>
                                        <th className="text-left py-3 px-4">NIK</th>
                                        <th className="text-left py-3 px-4">NAMA IBU</th>
                                        <th className="text-center py-3 px-4">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminList.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                                Tidak ada data user admin.
                                            </td>
                                        </tr>
                                    ) : (
                                        adminList.data.map((item, index) => (
                                            <tr
                                                key={item.id || index}
                                                className="border-b border-gray-200 hover:bg-gray-50"
                                            >
                                                <td className="py-3 px-4">{adminList.from + index}</td>
                                                <td className="py-3 px-4">{formatTanggal(item.created_at)}</td>
                                                <td className="py-3 px-4">{item.name || "-"}</td>
                                                <td className="py-3 px-4">{item.phone_number || "-"}</td>
                                                <td className="py-3 px-4">{item.email || "-"}</td>
                                                <td className="py-3 px-4">{item.nik || "-"}</td>
                                                <td className="py-3 px-4">{item.nama_ibu || "-"}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="flex justify-center items-center space-x-3">
                                                        <Link
                                                            href={`/admin/user/edit/${item.id}`}
                                                            className="text-green-700 font-semibold"
                                                        >
                                                            <FaEdit className="text-xl text-green-500 hover:text-green-700 transition" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteAdmin(item.id)}
                                                            className="text-red-700 font-semibold"
                                                        >
                                                            <FaTrash className="text-xl text-red-500 hover:text-red-700 transition" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationLinks data={adminList} />
                    </div>

                    <div className="w-full mb-4 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold opacity-95">Data User</h1>
                    </div>
                    <div className="p-6 w-full">
                        <div className="bg-white rounded-lg shadow-md overflow-auto">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                                        <th className="text-left py-3 px-4">#</th>
                                        <th className="text-left py-3 px-4">TANGGAL DAFTAR</th>
                                        <th className="text-left py-3 px-4">NAMA</th>
                                        <th className="text-left py-3 px-4">NOMOR TELPON</th>
                                        <th className="text-left py-3 px-4">EMAIL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                                Tidak ada data user.
                                            </td>
                                        </tr>
                                    ) : (
                                        userList.data.map((item, index) => (
                                            <tr
                                                key={item.id || index}
                                                className="border-b border-gray-200 hover:bg-gray-50"
                                            >
                                                <td className="py-3 px-4">{userList.from + index}</td>
                                                <td className="py-3 px-4">{formatTanggal(item.created_at)}</td>
                                                <td className="py-3 px-4">{item.name || "-"}</td>
                                                <td className="py-3 px-4">{item.phone_number || "-"}</td>
                                                <td className="py-3 px-4">{item.email || "-"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationLinks data={userList} />
                    </div>
                </PermanentDrawerLeft>
            </div>
        </>
    );
};

export default UserList;
