const Footer = () => {
  return (
    <footer className="absolute flex items-center bottom-0 left-0 w-full z-10 h-10">
      <div className="absolute inset-0 bg-background-transparent backdrop-blur-xs pointer-events-none"></div>
      <p className="font-oswald text-lg text-heading w-full text-center md:text-start md:pl-8 absolute z-50">
        &copy; SgnCycles
      </p>
    </footer>
  );
};

export default Footer;