import { Heart, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWishlist } from "@/contexts/WishlistContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "@/hooks/use-toast";

interface ProductQuickViewProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    originalPrice: number;
    image: string;
    colors: string[];
    rating?: number;
    reviews?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-secondary/30 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={product.image}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-coral text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                -{discount}% OFF
              </span>
            )}

            {/* Wishlist Button */}
            <motion.button
              className={`absolute top-4 right-4 rounded-full p-2.5 transition-all duration-300 shadow-lg ${
                isWishlisted
                  ? "bg-coral text-white"
                  : "bg-white/90 hover:bg-coral text-muted-foreground hover:text-white"
              }`}
              onClick={() => toggleWishlist(product.id, product.name)}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-5">
            {/* Title & Rating */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h2>
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating!)
                            ? "fill-coral text-coral"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews || "0 Reviews"})
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}.00
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}.00
              </span>
              {discount > 0 && (
                <span className="text-sm font-medium text-coral">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Select Color</p>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === index
                        ? "border-coral scale-110 shadow-md"
                        : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                className="flex-1 bg-foreground text-background font-medium px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-coral transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast({
                    title: "Added to Cart 🛒",
                    description: `${quantity}x ${product.name} has been added to your cart.`,
                  });
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 border-2 border-foreground text-foreground font-medium px-6 py-3.5 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast({
                    title: "Proceeding to Checkout 🚀",
                    description: `Buying ${quantity}x ${product.name}...`,
                  });
                }}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
