import Link from 'next/link';

interface SidebarProps {
  activeRoute: string;
}

const menuItems = [
  { path: '/', label: 'Books' },
  { path: '/settings', label: 'Settings' },
];

const Sidebar = ({ activeRoute }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-gray-100 dark:bg-gray-800 p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Trupropel App</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 mb-2 rounded-lg transition-colors ${
              activeRoute === item.path
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
