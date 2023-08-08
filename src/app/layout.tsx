import './globals.css'
 import Link from 'next/link'

export const metadata = {
  title: 'Inspector Gamut',
  description: 'An AI-powered proof of concept for generating CSS color palettes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="pt-24">
        <header className="content flex items-center bg-black/50 z-20 backdrop-blur-sm p-4 fixed top-0 left-1/2 -translate-x-1/2 h-20">
          <div className="w-full flex items-center justify-between">  
            <Link href="/" className="flex gap-2 items-center">
              <svg aria-hidden="true" className="w-12" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 202">
                <path d="M38.5 84H185l-19.5 54-53.5 63-52.5-63-21-54Z" fill="#000"/>
                <path d="M207 67.5c0 3.612-1.833 7.576-6.271 11.72-4.446 4.153-11.152 8.122-19.855 11.56C163.496 97.644 139.148 102 112 102c-27.147 0-51.496-4.356-68.874-11.22-8.703-3.438-15.409-7.407-19.855-11.56C18.833 75.077 17 71.113 17 67.5s1.833-7.576 6.271-11.72c4.446-4.153 11.152-8.122 19.855-11.56C60.504 37.356 84.853 33 112 33c27.148 0 51.496 4.355 68.874 11.22 8.703 3.438 15.409 7.407 19.855 11.56C205.167 59.923 207 63.887 207 67.5Z" fill="#fff" stroke="#000" strokeWidth="10"/>
                <path d="M74.39 5h75.162a7 7 0 0 1 6.59 4.64l17.139 47.847c1.309 3.654-.593 7.446-4.052 8.545-14.433 4.586-39.139 11.44-57.236 11.468-18.22.027-43.103-6.846-57.642-11.451-3.476-1.101-5.38-4.921-4.04-8.585L67.815 9.596A7 7 0 0 1 74.389 5ZM16.875 124.35l13.49-26.914 76.631 76.635v19.237l-.413-.189a436.466 436.466 0 0 1-18.044-8.81c-14.272-7.387-31.056-17.157-42.223-27.051-6.755-5.985-14.56-14.765-20.769-22.189a429.457 429.457 0 0 1-8.672-10.719ZM207.289 124.35 193.8 97.436l-76.632 76.635v19.237l.413-.189a436.29 436.29 0 0 0 18.045-8.81c14.272-7.387 31.055-17.157 42.223-27.051 6.755-5.985 14.559-14.765 20.769-22.189a431.112 431.112 0 0 0 8.671-10.719Z" fill="#fff" stroke="#000" strokeWidth="10"/>
                <circle cx="151.171" cy="111.829" r="5.829" fill="#fff"/>
                <circle cx="72.829" cy="111.829" r="5.829" fill="#fff"/>
                <path d="M127.001 122.365c0 5.923-7.119 12.591-15.039 12.591-7.919 0-15.038-6.668-15.038-12.591 0-5.923 7.119-8.86 15.038-8.86 7.92 0 15.039 2.937 15.039 8.86Z" fill="#fff"/>
              </svg>
              <span className="text-lg font-bold">Inspector Gamut</span>
            </Link>
            <Link className="py-2 px-4 rounded-md bg-purple-600 hover:bg-purple-500 transition" href="https://github.com/sponsors/jh3y" target="_blank">Sponsor</Link>
          </div>
        </header>
        {children}
        <footer className="content p-4">
          <div className="flex items-center justify-center">
            jh3y &copy; 2023 ┬┴┬┴┤•ᴥ•ʔ├┬┴┬┴
          </div>
        </footer>
      </body>
    </html>
  )
}
