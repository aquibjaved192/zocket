'use client';

export default function Header() {
  return (
      <header className="bg-blue-500 text-white p-4">
        <nav className="mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Zocket</div>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
      </header>
  );
}
