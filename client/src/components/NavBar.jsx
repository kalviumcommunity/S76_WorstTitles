export default function Navbar() {
    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Worst Titles</div>
            <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Services</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
        </nav>
    );
  }
  