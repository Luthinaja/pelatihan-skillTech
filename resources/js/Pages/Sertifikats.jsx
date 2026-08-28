import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link, Head } from "@inertiajs/react";

export default function Pelatihan({ user, sertifikats }) {
    return (
       <div className="w-full">
            <Navbar auth={user} />
            <div className="w-full min-h-screen flex flex-col items-center gap-10 mt-12 px-4">
                {sertifikats.length > 0 ? (
                    <>
                        <h1 className="text-3xl font-medium opacity-95 text-center">
                            {user.name} sudah mendapatkan {sertifikats.length} sertifikat 🎉
                        </h1>
                        {sertifikats.map((sertifikat) => (
                            <SertifikatCard
                                key={sertifikat.id}
                                sertifikat={sertifikat}
                                auth={user}
                                kelas={sertifikat.kelas}
                                kategori={sertifikat.kelas?.kategori}
                            />
                        ))}
                    </>
                ) : (
                    <div className="flex flex-col items-center mt-24">
                        <h1 className="text-2xl font-semibold text-gray-700 text-center">
                            Belum ada sertifikat yang diselesaikan.
                        </h1>
                        <p className="text-gray-500 mt-2 text-center">
                            Yuk selesaikan kelas dan dapatkan sertifikatmu!
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>

    );
}

function SertifikatCard({ sertifikat, kelas, kategori, auth }) {
    const handleDownload = async () => {
        const element = document.getElementById(`certificate-${sertifikat.id}`);
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`sertifikat_${kelas?.name || "kelas"}.pdf`);
    };

    return (
        <>
         <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Sertifikat</title>
        </Head>
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <div
                className="w-[800px] h-[430px] shadow-2xl border flex flex-col justify-center items-center px-12"
                id={`certificate-${sertifikat.id}`}
            >
                <div className="flex gap-2 justify-center items-center">
                    <div className="w-8 overflow-hidden">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="w-full object-cover object-center"
                        />
                    </div>
                    <h1 className="text-3xl font-bold">SkillTech Pro</h1>
                </div>

                <div className="flex flex-col justify-center items-center mt-8">
                    <h1 className="font-normal text-3xl">{auth.name}</h1>
                    <span className="text-lg font-normal opacity-80">
                        has successfully completed the training program in
                    </span>
                </div>

                <div className="w-full border-y flex justify-center my-8 border-black border-opacity-40 py-2 px-10 relative">
                    <div className="w-[70%] flex justify-center border-y border-black border-opacity-40 absolute h-[70px] -top-[13px]"></div>
                    <h1 className="text-xl font-black">{kelas?.name || "Kelas Tidak Diketahui"}</h1>
                </div>

                <span className="text-lg font-medium opacity-90">
                    Category: {kategori?.name || "Kategori Tidak Tersedia"}
                </span>
                <span className="text-base font-medium opacity-80 mt-12">
                    Presented by: SkillTech Pro
                </span>
            </div>

            <button
                onClick={handleDownload}
                className="mb-8 p-2 text-base font-semibold underline underline-offset-1 text-blue-600"
            >
                Download Sertifikat
            </button>
        </div>
        </>
    );
}
