const img = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const CITIES = ['Hyderabad', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Chennai', 'Pune'];

export const categories = [
  { id: 'cleaning', name: 'Home Cleaning', icon: 'broom', color: '#0EA5E9', image: img('photo-1581578731548-c64695cc6952') },
  { id: 'plumbing', name: 'Plumbing', icon: 'pipe-wrench', color: '#2563EB', image: img('photo-1607472586893-edb57bdc0e39') },
  { id: 'electrical', name: 'Electrician', icon: 'flash', color: '#F59E0B', image: img('photo-1621905251189-08b45d6a269e') },
  { id: 'ac', name: 'AC Repair', icon: 'air-conditioner', color: '#06B6D4', image: img('photo-1631545806609-16c5e0fd7b7b') },
  { id: 'painting', name: 'Painting', icon: 'format-paint', color: '#EC4899', image: img('photo-1562259949-e8e7689d7828') },
  { id: 'carpentry', name: 'Carpentry', icon: 'hammer', color: '#92400E', image: img('photo-1504148455328-c376907d081c') },
  { id: 'pest', name: 'Pest Control', icon: 'bug', color: '#16A34A', image: img('photo-1584820927498-cfe5211fd8bf') },
  { id: 'appliance', name: 'Appliance Repair', icon: 'washing-machine', color: '#7C3AED', image: img('photo-1626806787461-102c1bfaaea1') },
  { id: 'salon', name: 'Salon at Home', icon: 'content-cut', color: '#DB2777', image: img('photo-1560066984-138dadb4c035') },
  { id: 'massage', name: 'Massage & Spa', icon: 'spa', color: '#0D9488', image: img('photo-1544161515-4ab6ce6db874') },
  { id: 'movers', name: 'Packers & Movers', icon: 'truck', color: '#EA580C', image: img('photo-1600518464441-9154a4dea21b') },
  { id: 'gardening', name: 'Gardening', icon: 'flower', color: '#65A30D', image: img('photo-1416879595882-3373a0480b5b') },
];

let sid = 0;
const S = (category, name, price, duration, rating, reviews, desc, includes, image) => ({
  id: `s${++sid}`,
  category,
  name,
  price,
  duration,
  rating,
  reviews,
  desc,
  includes,
  image: image || categories.find((c) => c.id === category).image,
});

export const services = [
  S('cleaning', 'Full Home Deep Cleaning', 2499, '4-6 hrs', 4.8, 12840, 'Top-to-bottom deep clean of your home with professional equipment and eco-friendly products.', ['Floor scrubbing & mopping', 'Kitchen degreasing', 'Bathroom descaling', 'Dusting of fans & fixtures', 'Window & balcony cleaning']),
  S('cleaning', 'Bathroom Cleaning', 499, '1 hr', 4.7, 9320, 'Intensive cleaning and disinfection of one bathroom.', ['Tile & grout scrub', 'Fittings polish', 'Toilet disinfection']),
  S('cleaning', 'Kitchen Deep Cleaning', 1199, '2-3 hrs', 4.7, 7210, 'Remove grease and grime from chimney, hob, cabinets and tiles.', ['Chimney exterior', 'Cabinet cleaning', 'Slab & sink scrub']),
  S('cleaning', 'Sofa & Carpet Shampooing', 799, '2 hrs', 4.6, 5120, 'Vacuum and shampoo cleaning to revive fabrics.', ['Dry vacuum', 'Foam shampoo', 'Stain treatment']),
  S('plumbing', 'Tap & Mixer Repair', 249, '45 min', 4.6, 8120, 'Fix leaking or damaged taps and mixers.', ['Diagnosis', 'Washer / cartridge change', '30 day warranty']),
  S('plumbing', 'Blockage Removal', 399, '1 hr', 4.5, 6540, 'Clear blocked sinks, drains and toilets.', ['Drain snaking', 'Pressure flush', 'Odour check']),
  S('plumbing', 'Water Tank Cleaning', 899, '2 hrs', 4.7, 3980, 'Mechanised cleaning of overhead or underground tanks.', ['Sludge removal', 'Disinfection', 'Rinse & refill']),
  S('electrical', 'Fan Installation / Repair', 299, '45 min', 4.7, 10320, 'Install new ceiling fans or fix noisy and slow ones.', ['Wiring check', 'Capacitor change', 'Balancing']),
  S('electrical', 'Switchboard & Socket Repair', 249, '45 min', 4.6, 7640, 'Repair or replace faulty switches and sockets.', ['Fault diagnosis', 'Replacement parts extra', '30 day warranty']),
  S('electrical', 'Inverter / MCB Installation', 599, '1.5 hrs', 4.6, 2860, 'Safe installation of inverters, MCBs and distribution boards.', ['Load check', 'Installation', 'Safety test']),
  S('ac', 'AC Service (Split)', 599, '1 hr', 4.8, 15420, 'Jet-pump wet service for split AC units.', ['Filter wash', 'Coil cleaning', 'Gas pressure check']),
  S('ac', 'AC Gas Refill', 2199, '1.5 hrs', 4.5, 4410, 'Leak test and complete gas top-up.', ['Leak test', 'Gas charging', '90 day warranty']),
  S('ac', 'AC Installation / Uninstall', 1299, '2 hrs', 4.6, 5090, 'Professional installation or removal of split & window ACs.', ['Bracket fixing', 'Piping', 'Trial run']),
  S('painting', 'Room Painting (per room)', 4999, '1-2 days', 4.7, 3120, 'Two coat premium emulsion painting with furniture protection.', ['Wall putty', 'Primer + 2 coats', 'Post-work cleanup']),
  S('painting', 'Waterproofing Treatment', 6999, '1-2 days', 4.5, 1640, 'Terrace and wall seepage treatment.', ['Crack filling', 'Coating', '1 year warranty']),
  S('carpentry', 'Furniture Assembly', 499, '1-2 hrs', 4.6, 4730, 'Assemble beds, wardrobes, tables and more.', ['Tools provided', 'Wall mounting', 'Cleanup']),
  S('carpentry', 'Door & Lock Repair', 349, '1 hr', 4.6, 3890, 'Fix hinges, handles, locks and door alignment.', ['Diagnosis', 'Minor parts', '30 day warranty']),
  S('pest', 'General Pest Control', 999, '1.5 hrs', 4.7, 6010, 'Treatment for cockroaches, ants and spiders.', ['Gel + spray', 'Odourless', '3 month warranty']),
  S('pest', 'Termite Control', 2999, '3 hrs', 4.6, 2210, 'Drill-and-inject anti-termite treatment.', ['Inspection', 'Chemical treatment', '1 year warranty']),
  S('appliance', 'Washing Machine Repair', 349, '1 hr', 4.6, 8910, 'Repair for front-load and top-load machines.', ['Diagnosis', 'Minor repair', '30 day warranty']),
  S('appliance', 'Refrigerator Repair', 399, '1 hr', 4.5, 5470, 'Cooling issues, noise and leakage fixes.', ['Diagnosis', 'Gas check', '30 day warranty']),
  S('appliance', 'RO / Water Purifier Service', 499, '45 min', 4.7, 9750, 'Filter change and full service.', ['TDS check', 'Sediment clean', 'Membrane check']),
  S('salon', 'Haircut & Styling (Men)', 399, '45 min', 4.7, 11200, 'Salon-quality haircut at home.', ['Wash', 'Cut & style', 'Sanitised tools']),
  S('salon', 'Facial & Cleanup (Women)', 899, '1 hr', 4.8, 9640, 'Skin-brightening facial by a trained beautician.', ['Cleansing', 'Massage', 'Mask']),
  S('massage', 'Full Body Massage', 1499, '1 hr', 4.8, 7380, 'Relaxing full body massage by certified therapists.', ['Oil of choice', 'Fresh linen', 'Pressure customisation']),
  S('movers', 'Packers & Movers (1 BHK)', 5999, 'Full day', 4.5, 2860, 'Packing, loading, transport and unloading.', ['Packing material', 'Insurance', 'Trained crew']),
  S('gardening', 'Garden Maintenance', 599, '2 hrs', 4.6, 1890, 'Pruning, weeding and plant care.', ['Pruning', 'Soil care', 'Waste removal']),
];

const NAMES = [
  'Ravi Kumar', 'Suresh Reddy', 'Anita Sharma', 'Imran Khan', 'Priya Nair', 'Vikram Singh', 'Deepak Verma',
  'Meena Iyer', 'Arjun Patil', 'Sanjay Gupta', 'Lakshmi Devi', 'Mohammed Ali', 'Kiran Rao', 'Pooja Joshi',
  'Rahul Mehta', 'Sunita Das', 'Naveen Babu', 'Farhan Sheikh', 'Divya Menon', 'Harish Chandra', 'Rohit Yadav', 'Asha Pillai',
  'Manoj Tiwari', 'Neha Kapoor',
];

export const workers = categories.flatMap((cat, ci) =>
  [0, 1].map((k) => {
    const idx = ci * 2 + k;
    return {
      id: `w${idx + 1}`,
      name: NAMES[idx % NAMES.length],
      category: cat.id,
      rating: Math.round((4.4 + ((idx * 7) % 6) / 10) * 10) / 10,
      jobs: 320 + ((idx * 137) % 1800),
      experience: 3 + (idx % 9),
      verified: true,
      languages: ['English', 'Hindi', idx % 2 ? 'Telugu' : 'Kannada'],
      bio: `${cat.name} specialist with a strong record of on-time, tidy work. Background verified by HouServices.`,
      avatar: `https://i.pravatar.cc/200?img=${(idx % 70) + 1}`,
    };
  })
);

export const offers = [
  { code: 'FIRST20', title: '20% off your first booking', sub: 'Use code FIRST20', color: '#0F766E', icon: 'sale' },
  { code: 'HOME10', title: 'Flat 10% off any service', sub: 'Use code HOME10', color: '#B45309', icon: 'tag' },
  { code: null, title: 'Free re-visit within 7 days', sub: 'On all repair services', color: '#7C3AED', icon: 'shield-check' },
];

export const COUPONS = { FIRST20: 0.2, HOME10: 0.1 };

export const howItWorks = [
  { icon: 'magnify', title: 'Choose a service', text: 'Browse 12 categories and 25+ services.' },
  { icon: 'calendar-clock', title: 'Pick a slot', text: 'Select a date, time and your preferred pro.' },
  { icon: 'shield-check', title: 'Relax', text: 'A verified professional arrives at your door.' },
  { icon: 'star', title: 'Rate & rebook', text: 'Share feedback and book again in a tap.' },
];

export const testimonials = [
  { name: 'Aarti S.', city: 'Pune', text: 'The AC service was done in under an hour and the technician was so polite. Booking was effortless.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=47' },
  { name: 'Rohan M.', city: 'Mumbai', text: 'Deep cleaning made my flat look brand new. Transparent pricing with no surprises.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=12' },
  { name: 'Sneha K.', city: 'Bengaluru', text: 'Plumber arrived on time and fixed the leak the same day. Highly recommend!', rating: 4, avatar: 'https://i.pravatar.cc/100?img=32' },
];

export const faqs = [
  { q: 'How do I book a service?', a: 'Pick a service, choose a professional (or let us auto-assign), select a date, time slot and address, then confirm payment.' },
  { q: 'What is the demo OTP?', a: 'This is a demo app. The OTP is always 1234.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes. Open My Bookings and cancel any upcoming booking at no charge.' },
  { q: 'Which coupons are available?', a: 'Use FIRST20 for 20% off or HOME10 for 10% off at checkout.' },
  { q: 'Are professionals verified?', a: 'Every professional completes ID and background verification before being listed.' },
  { q: 'Which payment modes are supported?', a: 'Pay after service (cash/UPI) or pay online with UPI or card (demo only, no real payment is made).' },
];

export const TIME_SLOTS = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

export const getCategory = (id) => categories.find((c) => c.id === id);
export const getService = (id) => services.find((s) => s.id === id);
export const getWorker = (id) => workers.find((w) => w.id === id);
export const workersFor = (category) => workers.filter((w) => w.category === category);
