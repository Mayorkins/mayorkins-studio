/* ÉLAN ESTATES — content database */
window.ELAN = window.ELAN || {};

ELAN.PROPERTIES = [
  {
    slug: "glass-house", name: "The Glass House", location: "Beverly Hills, California",
    price: "$8,500,000", beds: 5, baths: 6, sqft: "7,200", type: "Estate", lifestyle: "Modern Architecture",
    year: "2023", featured: true, tag: "Featured",
    image: "assets/img/glass-house.jpg",
    blurb: "A pavilion of glass suspended above the canyon — transparency as architecture.",
    description: [
      "The Glass House is a study in radical transparency. Eleven thousand square feet of cantilevered glass float above Beverly Hills, each pane calibrated to frame a different version of the sky. By day the house disappears into the landscape; by night it becomes a lantern above the city.",
      "Every material was chosen for silence. Board-formed concrete, rift-cut oak, bronze set flush to the millimetre. The result is a residence that feels less like a building than a clearing in the air — architecture reduced to light, line and view."
    ],
    features: ["Infinity Pool", "Smart Home", "Private Cinema", "Wine Cellar", "Wellness Suite", "Canyon Views"],
    gallery: ["assets/img/glass-house.jpg", "assets/img/interior-living.jpg", "assets/img/interior-pool.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Beach", "Private Schools", "Shopping", "Airport"]
  },
  {
    slug: "villa-solara", name: "Villa Solara", location: "Miami, Florida",
    price: "$5,200,000", beds: 6, baths: 7, sqft: "8,400", type: "Villa", lifestyle: "Coastal Escapes",
    year: "2022", featured: true, tag: "Featured",
    image: "assets/img/villa-solara.jpg",
    blurb: "White curves, turquoise water and light that never ends.",
    description: [
      "Villa Solara was drawn the way the sea draws lines — in long, unbroken curves. The façade is a single gesture of warm white plaster, wrapping a courtyard, a lagoon pool and six suites that all open to the water.",
      "Inside, the palette is sand, shell and shadow. Hand-troweled lime plaster, honed travertine and linen absorb the noise of the city, leaving only the sound of water and the particular gold of a Miami afternoon."
    ],
    features: ["Lagoon Pool", "Private Dock", "Outdoor Kitchen", "Spa Pavilion", "Smart Home", "Ocean Terrace"],
    gallery: ["assets/img/villa-solara.jpg", "assets/img/interior-pool.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Beach", "Private Schools", "Shopping", "Airport"]
  },
  {
    slug: "the-penthouse", name: "The Penthouse", location: "Manhattan, New York",
    price: "$12,800,000", beds: 4, baths: 5, sqft: "5,900", type: "Penthouse", lifestyle: "City Living",
    year: "2024", featured: true, tag: "Featured",
    image: "assets/img/penthouse.jpg",
    blurb: "Forty floors above the city — the skyline, uninterrupted.",
    description: [
      "The Penthouse occupies the crown of a limestone tower on the Upper East Side, wrapped on three sides by a continuous ribbon of glass. From the great room, Central Park reads as a single green plane; the skyline recedes like a city drawn in light.",
      "Inside, the residence is disciplined and warm — dark walnut, honed marble, bronze — a quiet counterpoint to the spectacle beyond the glass. A private elevator, a gallery hall and a terrace that holds the entire city at your feet."
    ],
    features: ["Private Elevator", "Terrace Garden", "Wine Room", "Smart Home", "Concierge", "Skyline Views"],
    gallery: ["assets/img/penthouse.jpg", "assets/img/manhattan-loft.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Private Schools", "Shopping", "Theater", "Airport"]
  },
  {
    slug: "casa-pacifica", name: "Casa Pacifica", location: "Malibu, California",
    price: "$9,750,000", beds: 4, baths: 5, sqft: "5,200", type: "Estate", lifestyle: "Coastal Escapes",
    year: "2021", featured: true, tag: "New",
    image: "assets/img/malibu-cliff.jpg",
    blurb: "Cantilevered above the Pacific — the ocean as a living wall.",
    description: [
      "Casa Pacifica is anchored to a cliff the way a ship is anchored to the sea. The main volume hovers twenty feet above the water, so that from the living room the Pacific appears to begin at the edge of the sofa.",
      "The house is deliberately elemental — glass, ipe wood, raw steel. Fog rolls through the canyon in the morning; by evening the terrace turns to gold. It is architecture that refuses to compete with the view, because nothing can."
    ],
    features: ["Ocean Terrace", "Glass Railing Pool", "Outdoor Firepit", "Beach Access", "Smart Home", "Sunset Bar"],
    gallery: ["assets/img/malibu-cliff.jpg", "assets/img/interior-pool.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Beach", "Fine Dining", "Private Schools", "Surf", "Airport"]
  },
  {
    slug: "alpine-house", name: "Alpine House", location: "Aspen, Colorado",
    price: "$7,900,000", beds: 5, baths: 6, sqft: "6,800", type: "Chalet", lifestyle: "Country Estates",
    year: "2022", featured: false, tag: "New",
    image: "assets/img/aspen-lodge.jpg",
    blurb: "Dark timber, warm light and mountains held in silence.",
    description: [
      "Alpine House is built the way a lodge should be built — low, dark and rooted. Charred timber and board-formed concrete hold the snow; inside, firelight, wool and stone do the work of making winter feel like a privilege.",
      "Five suites, a ski room with heated floors, and a great room whose double-height glass turns the Aspen range into a living painting that changes with every hour of light."
    ],
    features: ["Ski Room", "Hot Spring Pool", "Great Room Fireplace", "Wine Cellar", "Boot Room", "Mountain Views"],
    gallery: ["assets/img/aspen-lodge.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg", "assets/img/interior-pool.jpg"],
    highlights: ["Ski", "Fine Dining", "Private Schools", "Shopping", "Airport"]
  },
  {
    slug: "soho-sky-loft", name: "Soho Sky Loft", location: "Manhattan, New York",
    price: "$4,950,000", beds: 3, baths: 3, sqft: "3,400", type: "Loft", lifestyle: "City Living",
    year: "2020", featured: false, tag: "Off-Market",
    image: "assets/img/manhattan-loft.jpg",
    blurb: "A double-height loft where cast iron meets the skyline.",
    description: [
      "Fourteen-foot ceilings, original cast-iron columns and a wall of glass that holds the Empire State Building at eye level. Soho Sky Loft is the rare New York home that is both a piece of history and a perfectly modern machine for living.",
      "The interior is gallery-clean — white oak floors, plaster walls, a kitchen of dark stone and brass — designed so the architecture and the view do the talking."
    ],
    features: ["Double Height", "Gallery Walls", "Chef's Kitchen", "Smart Home", "Doorman", "Skyline Views"],
    gallery: ["assets/img/manhattan-loft.jpg", "assets/img/penthouse.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Shopping", "Theater", "Galleries", "Airport"]
  },
  {
    slug: "the-sanctuary", name: "The Sanctuary", location: "Beverly Hills, California",
    price: "$6,800,000", beds: 5, baths: 6, sqft: "6,400", type: "Estate", lifestyle: "Modern Architecture",
    year: "2023", featured: false, tag: "New",
    image: "assets/img/interior-living.jpg",
    blurb: "A home designed from the inside out — around light and calm.",
    description: [
      "The Sanctuary begins with a single idea: silence. Every room was composed around natural light and the precise relationship between furniture and view, so the house feels less like a floor plan than a sequence of atmospheres.",
      "Low Italian leather, honed limestone and bronze were chosen to age gracefully. The result is a residence that becomes more beautiful with use — quiet, warm and utterly unhurried."
    ],
    features: ["Courtyard Pool", "Meditation Garden", "Wine Room", "Smart Home", "Gym", "Cinema"],
    gallery: ["assets/img/interior-living.jpg", "assets/img/interior-pool.jpg", "assets/img/glass-house.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Private Schools", "Shopping", "Country Club", "Airport"]
  },
  {
    slug: "maison-lumiere", name: "Maison Lumière", location: "Miami Beach, Florida",
    price: "$6,400,000", beds: 5, baths: 6, sqft: "6,100", type: "Villa", lifestyle: "Coastal Escapes",
    year: "2021", featured: false, tag: "New",
    image: "assets/img/interior-pool.jpg",
    blurb: "Water, light and white architecture — a villa made of reflections.",
    description: [
      "Maison Lumière is a villa made almost entirely of reflections. An interior pool runs the full length of the house, doubling every arch and window, so that walking through it feels like walking through both the building and its mirror.",
      "The palette is white on white — lime plaster, alabaster, bleached oak — interrupted only by the deep blue of the water and the gold of the evening."
    ],
    features: ["Interior Pool", "Rooftop Terrace", "Outdoor Shower", "Smart Home", "Summer Kitchen", "Ocean Views"],
    gallery: ["assets/img/interior-pool.jpg", "assets/img/villa-solara.jpg", "assets/img/interior-living.jpg", "assets/img/malibu-cliff.jpg"],
    highlights: ["Beach", "Fine Dining", "Nightlife", "Shopping", "Airport"]
  },
  {
    slug: "the-atelier", name: "The Atelier", location: "Los Angeles, California",
    price: "$3,900,000", beds: 4, baths: 4, sqft: "4,200", type: "Residence", lifestyle: "Modern Architecture",
    year: "2019", featured: false, tag: "",
    image: "assets/img/interior-kitchen.jpg",
    blurb: "A collector's home — part residence, part gallery, part studio.",
    description: [
      "The Atelier was built for someone who collects more than houses. A twelve-foot walnut island anchors the kitchen — the social heart of the home — while gallery-scaled walls, daylight from above and a sculpture court make every room a setting.",
      "It is a home for making things, showing things and entertaining the people who love both."
    ],
    features: ["Sculpture Court", "Gallery Lighting", "Chef's Island", "Wine Wall", "Studio", "Garden"],
    gallery: ["assets/img/interior-kitchen.jpg", "assets/img/interior-living.jpg", "assets/img/glass-house.jpg", "assets/img/interior-pool.jpg"],
    highlights: ["Fine Dining", "Galleries", "Private Schools", "Shopping", "Airport"]
  },
  {
    slug: "bel-air-residence", name: "Bel Air Residence", location: "Los Angeles, California",
    price: "$10,500,000", beds: 6, baths: 8, sqft: "9,800", type: "Estate", lifestyle: "Modern Architecture",
    year: "2024", featured: false, tag: "New",
    image: "assets/img/hero-dusk.jpg",
    blurb: "A hillside estate that commands the city — and the horizon.",
    description: [
      "Bel Air Residence is a compound of light and cantilever. Its principal volumes step down the hillside so that every terrace overlooks the one before it, ending in a glass-walled pool that appears to pour over the edge of the city.",
      "Nine thousand eight hundred square feet of board-formed concrete, bronze and glass — a house built to be looked at from the valley below, and to look back."
    ],
    features: ["Infinity Pool", "Cinema", "Wine Grotto", "Wellness Wing", "Staff Quarters", "City Views"],
    gallery: ["assets/img/hero-dusk.jpg", "assets/img/interior-living.jpg", "assets/img/interior-pool.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Private Schools", "Shopping", "Country Club", "Airport"]
  },
  {
    slug: "the-meridian", name: "The Meridian", location: "Manhattan, New York",
    price: "$9,200,000", beds: 4, baths: 5, sqft: "5,100", type: "Penthouse", lifestyle: "City Living",
    year: "2023", featured: false, tag: "",
    image: "assets/img/penthouse.jpg",
    blurb: "A full-floor residence with the park on one side, the river on the other.",
    description: [
      "The Meridian is a full-floor residence in a landmark Art Deco tower, reimagined by a celebrated interior studio. Its great room runs the entire width of the building — park on one side, river on the other — and holds both without flinching.",
      "Details are exacting: herringbone oak, book-matched marble, lighting curated like a museum's. It is New York living at its most composed."
    ],
    features: ["Full Floor", "Park Views", "River Views", "Private Elevator", "Concierge", "Wine Room"],
    gallery: ["assets/img/penthouse.jpg", "assets/img/manhattan-loft.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Fine Dining", "Park", "Private Schools", "Shopping", "Airport"]
  },
  {
    slug: "harbor-house", name: "Harbor House", location: "Malibu, California",
    price: "$7,450,000", beds: 4, baths: 5, sqft: "4,800", type: "Residence", lifestyle: "Coastal Escapes",
    year: "2020", featured: false, tag: "",
    image: "assets/img/malibu-cliff.jpg",
    blurb: "Wrapped in glass and weather — the Pacific in every room.",
    description: [
      "Harbor House is the quieter cousin of the cliff houses above it — lower, wider, more weathered. The main living floor opens to the ocean on three sides, with deep overhangs that blur the line between terrace and room.",
      "It is a house for long dinners, wet suits on the railing and the particular peace of a coast that never sleeps."
    ],
    features: ["Ocean Deck", "Firepit", "Outdoor Dining", "Surf Room", "Smart Home", "Beach Access"],
    gallery: ["assets/img/malibu-cliff.jpg", "assets/img/interior-pool.jpg", "assets/img/interior-living.jpg", "assets/img/interior-kitchen.jpg"],
    highlights: ["Beach", "Fine Dining", "Surf", "Shopping", "Airport"]
  }
];

ELAN.NEIGHBORHOODS = [
  {
    slug: "beverly-hills", name: "Beverly Hills", region: "California",
    image: "assets/img/glass-house.jpg",
    count: 14, price: "$2.4M – $75M",
    story: "Where the canyon meets the boulevard. Beverly Hills is the world's most storied address — gardens behind walls, glass pavilions above the city, and a quiet that money has spent a century perfecting."
  },
  {
    slug: "malibu", name: "Malibu", region: "California",
    image: "assets/img/malibu-cliff.jpg",
    count: 9, price: "$4M – $120M",
    story: "Twenty-seven miles of coast where the mountains fall into the Pacific. Malibu is not a suburb — it is a weather system of its own, and the houses here are built to live inside it."
  },
  {
    slug: "miami-beach", name: "Miami Beach", region: "Florida",
    image: "assets/img/villa-solara.jpg",
    count: 11, price: "$1.8M – $40M",
    story: "White architecture, turquoise water and light that arrives like a guest. Miami Beach is the only city in America that looks like it was designed by the sea itself."
  },
  {
    slug: "manhattan", name: "Manhattan", region: "New York",
    image: "assets/img/manhattan-loft.jpg",
    count: 17, price: "$2M – $95M",
    story: "The vertical city. From prewar co-ops to glass penthouses, Manhattan remains the world's most demanding — and most rewarding — real estate market. Every floor is a different world."
  },
  {
    slug: "aspen", name: "Aspen", region: "Colorado",
    image: "assets/img/aspen-lodge.jpg",
    count: 6, price: "$3M – $60M",
    story: "A silver-mining town that became the winter capital of the world. Aspen rewards those who build low, warm and dark — and who understand that the mountains need no decoration."
  }
];

ELAN.JOURNAL = [
  {
    slug: "remarkable-homes", title: "Inside the World's Most Remarkable Homes",
    category: "Architecture", date: "August 2026", read: "8 min",
    image: "assets/img/interior-living.jpg",
    excerpt: "From a glass pavilion over a canyon to a lodge carved into the alpine dark — a tour of the residences that changed what a home can be.",
    body: [
      "Some houses are addresses. Others are arguments — buildings that quietly insist that the way we live can be better. This is a tour of the latter: homes where the architect's hand is visible in every line, and where living well was treated as the most serious kind of art.",
      "The first is a pavilion of glass suspended over a canyon in Beverly Hills. Its owner says the house disappears at noon and returns at dusk, when the interior lights turn it into a lantern above the city. Transparency, it turns out, is the boldest form of privacy.",
      "The second is a lodge in the Colorado mountains, built low and dark in charred timber. Its great room holds a double-height wall of glass that frames the Aspen range — a painting that changes with every hour of light, free of charge, forever.",
      "And the third is a villa in Miami made almost entirely of reflections, where an interior pool runs the full length of the house and the architecture doubles itself in the water. Standing in its center, you are never sure which building is real. That, perhaps, is the point."
    ]
  },
  {
    slug: "architecture-defines", title: "Why Architecture Defines the Way We Live",
    category: "Design", date: "July 2026", read: "6 min",
    image: "assets/img/interior-kitchen.jpg",
    excerpt: "We shape our buildings, and afterwards our buildings shape us. What the best residential architecture actually does — and why it matters more than square footage.",
    body: [
      "Winston Churchill's aphorism has aged well because it is literally true. Ceiling height changes your posture. The position of a window changes where you stand in a room. The route from the garage to the kitchen changes the choreography of a family's morning.",
      "The best residential architects understand this — that a house is not a collection of rooms but a sequence of atmospheres, each one composing your behavior without your noticing. A low corridor that opens into a double-height living space is not decoration; it is an experience of arrival.",
      "This is why the most expensive homes are rarely the largest. They are the ones where the light arrives at the right hour, where the sound of the kitchen does not reach the bedroom, where the threshold between inside and outside is a considered decision.",
      "When we advise clients, we ask them to ignore square footage and look for something else: whether the house, walking through it, makes them stand a little taller. Everything else can be renovated. That cannot."
    ]
  },
  {
    slug: "new-standard-luxury", title: "The New Standard of Luxury Living",
    category: "Market", date: "June 2026", read: "7 min",
    image: "assets/img/interior-pool.jpg",
    excerpt: "Ostentation is out. Silence, light and space are the new currencies of the world's most sought-after homes.",
    body: [
      "For a century, luxury real estate communicated through volume — more marble, more gold, more square footage than the neighbors. The most desired homes of the coming decade communicate through the opposite: restraint.",
      "The new standard is a house that can hold silence. It is measured in light-to-wall ratios, in the quality of materials that will age rather than tarnish, in the absence of noise from street and neighbor, in rooms designed for actual use rather than display.",
      "We see it in our clients' questions. They ask less about chandeliers and more about acoustics, air quality, and whether the morning light reaches the kitchen. They are buying wellbeing disguised as real estate.",
      "The market has followed. Homes that deliver this quiet — the glass pavilion, the alpine lodge, the waterfront villa that listens to the sea — are outperforming the market by every metric. Luxury, it seems, has finally gone introvert."
    ]
  },
  {
    slug: "light-space-silence", title: "Light, Space, Silence: The Architecture of Calm",
    category: "Design", date: "May 2026", read: "5 min",
    image: "assets/img/hero-dusk.jpg",
    excerpt: "Three ingredients, repeated with discipline, make the homes we never want to leave.",
    body: [
      "Ask a dozen architects what makes a great home and you will get a dozen answers — all of them variations on three words: light, space, silence.",
      "Light is the cheapest luxury in architecture and the most difficult to engineer. It is not about more windows; it is about the precise hour at which each window lets the sun in, and what it reveals when it does.",
      "Space is not about size. It is about the pause between things — the corridor that is two feet wider than necessary, the wall that is allowed to be blank. Generosity of emptiness is what makes a room feel expensive.",
      "Silence is the rarest of the three, and the one money buys least reliably. It is the sound of nothing — no traffic, no plumbing, no neighbor — and it is what our clients mention first when they describe their favorite houses. Light, space, silence. Build with those, and the rest is decoration."
    ]
  }
];

ELAN.TEAM = [
  { name: "Adrienne Moreau", role: "Founder & Principal", initials: "AM", city: "Los Angeles" },
  { name: "Julian Whitmore", role: "Director, Private Office", initials: "JW", city: "New York" },
  { name: "Camille Hartley", role: "Head of Advisory", initials: "CH", city: "London" },
  { name: "Rafael DeLuca", role: "Director, International", initials: "RD", city: "Dubai" },
  { name: "Sofia Lindqvist", role: "Design & Concierge", initials: "SL", city: "Miami" },
  { name: "Marcus Chen", role: "Portfolio Strategy", initials: "MC", city: "Aspen" }
];

ELAN.OFFICES = [
  { city: "Los Angeles", address: "9601 Wilshire Boulevard, Beverly Hills, CA 90210", phone: "+1 310 555 0148" },
  { city: "New York", address: "432 Park Avenue, 18th Floor, New York, NY 10022", phone: "+1 212 555 0179" },
  { city: "Miami", address: "1200 Brickell Avenue, Suite 900, Miami, FL 33131", phone: "+1 305 555 0162" },
  { city: "London", address: "27 Grosvenor Square, Mayfair, London W1K 4LF", phone: "+44 20 7946 0851" },
  { city: "Dubai", address: "Level 42, Index Tower, DIFC, Dubai, UAE", phone: "+971 4 555 0190" }
];

ELAN.SERVICES = [
  {
    n: "01", title: "Private Acquisition",
    text: "Off-market access and discreet negotiation in the world's most competitive markets. When the best homes never reach the public, we are already inside the room."
  },
  {
    n: "02", title: "Advisory & Portfolio",
    text: "A long-term view of your holdings — acquisition strategy, disposition timing and the quiet mathematics of a portfolio that performs while you live in it."
  },
  {
    n: "03", title: "Design Direction",
    text: "From first sketch to final installation. We curate architects, interiors and artisans to ensure the residence you buy becomes the home you imagined."
  },
  {
    n: "04", title: "Concierge & Beyond",
    text: "Schools, staffing, aircraft, art. The life around the house, arranged. Our concierge desk exists so that owning extraordinary never feels like work."
  }
];

ELAN.STATS = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 2, suffix: "B+", label: "Property Value Represented", prefix: "$" },
  { value: 12, suffix: "", label: "Global Locations" },
  { value: 500, suffix: "+", label: "Exceptional Homes" }
];

ELAN.SEARCH = {
  locations: ["All Locations", "Beverly Hills", "Malibu", "Miami Beach", "Manhattan", "Aspen", "Los Angeles", "Miami"],
  types: ["All Types", "Estate", "Villa", "Penthouse", "Loft", "Residence", "Chalet"],
  prices: ["Any Price", "Under $5M", "$5M – $8M", "$8M – $12M", "$12M+"],
  beds: ["Any Bedrooms", "3+", "4+", "5+", "6+"]
};
