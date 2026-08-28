import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AccountMenu from "@/Components/AccountMenu";

export default function Navbar({ auth }) {
    // cont user = Auth::user();
    const theme = useTheme();
    // console.log(auth);

    function openAuthPopup(event) {
    event.preventDefault(); // Mencegah default behavior dari link
    const width = 600;
    const height = 700;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
  
    // Membuka popup
    const popup = window.open('/google/redirect', 'AuthPopup', `
      width=${width},
      height=${height},
      top=${top},
      left=${left},
      resizable,
      scrollbars
    `);
  
    if (popup) {
      // Set interval untuk mendeteksi apakah popup sudah ditutup
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup); // Hentikan interval jika popup sudah ditutup
          window.location.reload(); // Refresh halaman utama untuk memperbarui state
        }
      }, 1000);
  
      // Menutup popup secara manual setelah 5 detik (contoh)
      setTimeout(() => {
        if (!popup.closed) {
          popup.close(); // Menutup popup
          console.log('Popup closed manually by script.');
        }
      }, 5000); // Ganti durasi jika diperlukan
    } else {
      alert("Popup blocked by the browser!");
    }
  }
    return (
        <div className="container mx-auto py-6 px-3 md:px-3 lg:px-10 border-b border-opacity-30">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <a href="/" className="flex items-center space-x-2">
                        <div className="w-6 overflow-hidden">
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                className="w-full object-cover object-center"
                            />
                        </div>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.primary,
                                fontFamily: theme.typography.fontFamily,
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI'",
                            }}
                        >
                            SkillTech Pro
                        </Typography>
                    </a>
                </div>
                {auth ? (
                    <AccountMenu auth={auth}/>
                ) : (
                    <ul className="flex items-center space-x-3">
                        <li>
                            <Button
                                LinkComponent={"a"}
                                href="/login"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    borderColor: theme.palette.text.secondary,
                                    borderRadius: "7px",
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: "13px",
                                    fontWeight: "semibold",
                                }}
                                variant="outlined"
                            >
                                Masuk
                            </Button>
                        </li>
                        {/* <li>
                            <a
                                href="/google/redirect"
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-300 hover:shadow-md transition-all duration-200 text-sm font-medium text-gray-700"
                            >
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <img
                                    src="/storage/google_logo/google.png"
                                    alt="Google Logo"
                                    className="w-full h-full object-contain"
                                    />
                                </div>
                                <span>Login</span>
                            </a>
                        </li> */}
                    </ul>
                )}

            </div>
        </div>
    );
}
