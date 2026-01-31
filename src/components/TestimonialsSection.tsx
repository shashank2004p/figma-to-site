import { Quote } from "lucide-react";
import avatarMale from "@/assets/avatar-male.jpg";
import avatarFemale from "@/assets/avatar-female.png";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: 1,
    quote: "The Quality Of The Purse Exceeded My Expectations. It Feels Premium And Is Perfect For Special Occasions.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
  },
  {
    id: 2,
    quote: "I Love How Lightweight Yet Spacious The Bag Is. The Design Is Elegant, And I've Received So Many Compliments Already.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 3,
    quote: "From Ordering To Delivery, Everything Was Smooth. The Purse Looks Exactly Like The Pictures And Feels Very Durable.",
    name: "Cameron Williamson",
    title: "Agency Owner, USA",
    avatar: avatarFemale,
  },
  {
    id: 4,
    quote: "Beautiful Craftsmanship And Excellent Finish. Has Quickly Become My Go-To Bag For Everyday Use.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 5,
    quote: "The Quality Of The Purse Exceeded My Expectations. It Feels Premium And Is Perfect For Special Occasions.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
  },
  {
    id: 6,
    quote: "I Love How Lightweight Yet Spacious The Bag Is. The Design Is Elegant, And I've Received So Many Compliments Already.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: 7,
    quote: "Beautiful Detailing And Premium Material. The Purse Feels Comfortable To Carry And Adds A Classy Touch To Any Outfit.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 8,
    quote: "I'm Really Impressed With The Craftsmanship. It Feels High Quality And Is Ideal For Everyday Use As Well As Events.",
    name: "Cameron Williamson",
    title: "Agency Owner, USA",
    avatar: avatarFemale,
  },
  {
    id: 9,
    quote: "The Purse Has A Premium Look And Feel. It's Versatile Enough To Carry Every Day Or For Special Occasions.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 10,
    quote: "The Detailing Is Exquisite. It's A Great Choice For Formal And Casual Outings.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
  },
  {
    id: 11,
    quote: "Beautiful Detailing And Premium Material. The Purse Feels Comfortable To Carry And Adds A Classy Touch To Any Outfit.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 12,
    quote: "I'm Really Impressed With The Craftsmanship. It Feels High Quality And Is Ideal For Everyday Use As Well As Events.",
    name: "Cameron Williamson",
    title: "Agency Owner, USA",
    avatar: avatarFemale,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-coral fill-coral/20 mb-4" />

      {/* Quote Text */}
      <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base">
            {testimonial.name}
          </h4>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          What Our <span className="text-coral">Clients Say</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
          Discover What Our Customers Are Saying About Their Experience, Quality, And
          Timeless Style They Love.
        </p>
      </div>

      {/* Scrolling Rows */}
      <div className="space-y-6">
        {/* Row 1 - Scroll Left to Right */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-left">
            {[...testimonialsRow1, ...testimonialsRow1].map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2 - Scroll Right to Left */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-right">
            {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
