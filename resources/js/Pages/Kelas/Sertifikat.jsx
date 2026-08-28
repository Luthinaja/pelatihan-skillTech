import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Sertifikat({  sertifikat, kelas, auth, kategori }) {
    console.log(auth);
    const handleDownload = async () => {
        const element = document.getElementById("certificate");
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate.pdf");
    };
    return (
        <div className="w-full">
            <Navbar auth={auth}/>
            <div className="w-full flex flex-col justify-start items-center gap-4 mt-12 min-h-screen">
                <h1 className="text-3xl font-medium opacity-95">
                    {auth.name} sudah mendapatkan sertifikat🙌🙌
                </h1>
                <div className="mt-12 w-full flex flex-col justify-center items-center gap-4">
                    <div
                        className="w-[800px] h-[430px] shadow-2xl border flex flex-col justify-center items-center px-12"
                        id="certificate"
                    >
                        <div className="flex gap-2 justify-center items-center">
                            <div className="w-8 overflow-hidden">
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="w-full object-cover object-center"
                                />
                            </div>
                            <h1 className="text-3xl font-bold">
                                SkillTech Pro
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-8">
                            <h1 className="font-normal text-3xl">
                                {auth.name}
                            </h1>
                            <span className="text-lg font-normal opacity-80">
                                has successfully completed the training program
                                in
                            </span>
                        </div>
                        <div className="w-full border-y flex justify-center my-8 border-black border-opacity-40 py-2 px-10 relative">
                            <div className="w-[70%] flex justify-center border-y border-black border-opacity-40 absolute h-[70px] -top-[13px]"></div>
                            <h1 className="text-xl font-black">
                                {kelas.name}
                            </h1>
                        </div>
                        <span className="text-lg font-medium opacity-90">
                            Category: {kategori.name}
                        </span>
                        <span className="text-base font-medium opacity-80 mt-12">
                            Presented by: SkillTech Pro
                        </span>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="mb-4 p-2 text-base font-semibold underline underline-offset-1 text-blue-600"
                    >
                        Download Sertifikat
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}