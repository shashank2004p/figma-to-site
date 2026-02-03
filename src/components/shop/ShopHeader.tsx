import { Link } from "react-router-dom";

const ShopHeader = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Purses
        </h1>
        <nav className="text-muted-foreground">
          <Link to="/" className="hover:text-coral transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Purses</span>
        </nav>
      </div>
    </div>
  );
};

export default ShopHeader;
