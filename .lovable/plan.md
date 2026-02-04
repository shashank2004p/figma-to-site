
# Plan: Center Aurora Mini Purse Card (Half on Image, Half Below)

## Current Situation
The mobile product info card currently uses `-mt-20` (80px negative margin) to position it overlapping the hero image. The user wants it to be more centered so that half the card overlaps the image and half extends below it.

## Proposed Solution
Change the positioning approach to use a transform-based centering technique that automatically positions the card exactly half on the image and half below it, regardless of the card's height.

## Technical Implementation

### File: `src/components/HeroSection.tsx`

**Changes to Mobile Product Info Card (lines 103-128):**

1. **Add a wrapper container** around the product info card that extends outside the image container
2. **Use absolute positioning** with `bottom-0` on the card container
3. **Apply `translate-y-1/2`** to shift the card down by exactly half its height

**Before:**
```jsx
{/* Mobile Product Info Card */}
<motion.div 
  className="bg-background rounded-2xl shadow-lg p-4 mx-4 -mt-20 relative z-10"
  ...
>
```

**After:**
```jsx
{/* Mobile Product Info Card - Centered half on image */}
<motion.div 
  className="absolute -bottom-0 left-0 right-0 translate-y-1/2 z-10"
>
  <div className="bg-background rounded-2xl shadow-lg p-4 mx-4">
    ...
  </div>
</motion.div>
```

**Additional adjustment:**
- Add padding-bottom to the mobile section container to accommodate the card that now extends below the image

## Visual Result
- The product info card will sit exactly centered at the edge of the image
- 50% of the card will overlap the product image
- 50% of the card will extend below the image
- This creates a polished floating card effect that looks more balanced
