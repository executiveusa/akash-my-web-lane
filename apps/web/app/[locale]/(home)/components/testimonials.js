"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonials = void 0;
const testimonialItems = [
    {
        quote: "Our site went from 6 seconds to under 400ms. Google rankings improved within weeks.",
        name: "Sarah Chen",
        role: "Founder",
        location: "Austin, TX",
    },
    {
        quote: "No more plugin updates, no more security scares. Just a fast, beautiful site.",
        name: "Marcus Johnson",
        role: "Marketing Director",
        location: "Chicago, IL",
    },
    {
        quote: "The AI search feature has transformed how customers find products on our site.",
        name: "Priya Sharma",
        role: "E-commerce Manager",
        location: "New York, NY",
    },
];
const Testimonials = () => (<div className="w-full bg-[#0d0d0d] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl tracking-tight md:text-5xl">What Our Clients Say</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonialItems.map((item, index) => (<div className="rounded-xl border border-[#f2ece0]/10 bg-[#f2ece0]/5 p-6" key={index}>
              <p className="mb-6 text-[#f2ece0]/85">&quot;{item.quote}&quot;</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-[#f2ece0]/60">
                {item.role} &bull; {item.location}
              </p>
            </div>))}
        </div>
      </div>
    </div>
  </div>);
exports.Testimonials = Testimonials;
