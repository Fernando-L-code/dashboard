const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-medium text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <button
        onClick={toggleDarkMode}
        className="text-gray-600 dark:text-gray-300"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
