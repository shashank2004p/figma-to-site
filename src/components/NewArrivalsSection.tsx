import { Heart, ArrowRight, Flame, TrendingUp, Award, Sparkles, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import ProductQuickView from "./ProductQuickView";
import StockBadge from "./StockBadge";
import { useWishlist } from "@/contexts/WishlistContext";
import { products, type Product, type BadgeType } from "@/data/products";

const BadgeComponent = ({ type }: { type: BadgeType }) => {
  const badgeStyles = {
    new: {
      bg: "bg-gradient-to-br from-coral via-rose-500 to-pink-600",
      glow: "before:bg-coral/30",
      icon: Sparkles,
      text: "New",
      iconColor: "text-rose-100",
    },
    hot: {
      bg: "bg-gradient-to-br from-red-400 via-red-500 to-rose-600",
      glow: "before:bg-red-400/30",
      icon: Flame,
      text: "Hot",
      iconColor: "text-red-100",
    },
    trending: {
      bg: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600",
      glow: "before:bg-emerald-400/30",
      icon: TrendingUp,
      text: "Trending",
      iconColor: "text-emerald-100",
    },
    bestseller: {
      bg: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600",
      glow: "before:bg-amber-400/30",
      icon: Award,
      text: "Best Seller",
      iconColor: "text-amber-100",
    },
    limited: {
      bg: "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600",
      glow: "before:bg-purple-400/30",
      icon: Zap,
      text: "Limited",
      iconColor: "text-violet-100",
    },
  };

  const style = badgeStyles[type];
  const Icon = style.icon;

  return (
    <span
      className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 ${style.bg} text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-500 group-hover:scale-105 shadow-lg backdrop-blur-sm before:absolute before:inset-0 before:rounded-full ${style.glow} before:blur-xl before:-z-10 before:animate-pulse border border-white/20`}
    >
      <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${style.iconColor} drop-shadow-sm`} />
      <span className="drop-shadow-sm">{style.text}</span>
    </span>
  );
};

const NewProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id + 100);

  return (
    <div 
      className="w-full group cursor-pointer bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.2)] transition-all duration-300" 
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Dynamic Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button */}
        <motion.button 
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 rounded-full p-2 sm:p-2.5 transition-all duration-300 hover:scale-110 shadow-md ${
            isWishlisted 
              ? "bg-coral text-white" 
              : "bg-background/90 hover:bg-coral text-muted-foreground hover:text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id + 100, product.name);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Name & Colors */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-coral transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-border hover:scale-125 transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Stock Urgency Indicator */}
        <StockBadge stock={product.stock} variant="text" />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            ${product.price.toLocaleString()}.00
          </span>
          <span className="text-muted-foreground line-through text-sm">
            ${product.originalPrice.toLocaleString()}.00
          </span>
        </div>

        {/* CTA Link */}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-coral font-medium text-sm group/link hover:gap-3 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Let's Check It Out
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

const ProductCarousel = ({ 
  productList, 
  onProductClick 
}: { 
  productList: Product[]; 
  onProductClick: (product: Product) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(1);

  // Calculate visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, productList.length - visibleCards);
  const totalDots = maxIndex + 1;

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / productList.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / productList.length;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, maxIndex));
    }
  };

  const goToPrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm text-foreground p-2 sm:p-3 rounded-full shadow-lg hover:bg-coral hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/90 disabled:hover:text-foreground"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      
      <button
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
        className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm text-foreground p-2 sm:p-3 rounded-full shadow-lg hover:bg-coral hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/90 disabled:hover:text-foreground"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-8 sm:px-0"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 sm:gap-6">
          {productList.map((product) => (
            <div 
              key={product.id} 
              className="snap-start flex-shrink-0"
              style={{ width: `calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})` }}
            >
              <NewProductCard product={product} onClick={() => onProductClick(product)} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? "w-8 bg-coral" 
                : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const NewArrivalsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Show 5 products for new arrivals
  const newArrivalProducts = products.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Fresh Styles <span className="text-coral">Just Dropped</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
              Whether It's Daily Use, Office Wear, Or A Special Occasion — We Have The
              Perfect Purse For You.
            </p>
          </div>
        </ScrollReveal>

        {/* Products Carousel */}
        <ProductCarousel 
          productList={newArrivalProducts} 
          onProductClick={setSelectedProduct} 
        />

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductQuickView
            product={{
              ...selectedProduct,
              id: selectedProduct.id + 100,
            }}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {/* Explore Button */}
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center mt-10 sm:mt-14">
            <button className="bg-foreground text-background font-medium px-8 py-4 rounded-full flex items-center gap-2 hover:bg-coral transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Explore All New Arrivals
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
