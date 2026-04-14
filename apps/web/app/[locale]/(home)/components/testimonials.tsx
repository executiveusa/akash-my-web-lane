import type { Dictionary } from "@repo/internationalization";

type TestimonialsProps = {
  dictionary: Dictionary;
};

export const Testimonials = ({ dictionary }: TestimonialsProps) => (
  <div className="w-full bg-[#0d0d0d] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl tracking-tight md:text-5xl">{dictionary.web.home.testimonials.title}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dictionary.web.home.testimonials.items.map((item, index) => (
            <div className="rounded-xl border border-[#f2ece0]/10 bg-[#f2ece0]/5 p-6" key={index}>
              <p className="mb-6 text-[#f2ece0]/85">“{item.quote}”</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-[#f2ece0]/60">{item.role} • {item.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
