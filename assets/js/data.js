/* In-Vehicle Evolution — content plan seed data.
   Edits made in the planner are saved in the browser (localStorage), which
   takes precedence over this file once it exists. */
window.IVE_DATA = {
  channels: {
    ive:   { label: 'In-Vehicle Evolution LinkedIn', short: 'IVE', color: '#FF46A6', image: 'assets/images/placeholderimages/InVehicleEvolution-Post-1.jpg', size: [1080, 1080] },
    jj:    { label: 'JJ LinkedIn',                   short: 'JJ',  color: '#4C8DFF', image: 'assets/images/placeholderimages/JJEden-Post-1.jpg', size: [800, 800] },
    blog:  { label: 'Blog',                          short: 'Blog', color: '#A66BFF', image: 'assets/images/placeholderimages/Blog-Post-1.jpg', size: [1728, 6627] },
    email: { label: 'Email',                         short: 'Email', color: '#2FD4C4', image: 'assets/images/placeholderimages/Email-Event-Post-1.jpg', size: [600, 1206] }
  },

  categories: [
    'Testing pilot technology',
    'Technology education',
    'Thought leadership',
    'Listening & newsjacking'
  ],

  statuses: {
    idea:      { label: 'Idea',      color: '#8C8599' },
    drafting:  { label: 'Drafting',  color: '#FFB547' },
    review:    { label: 'In review', color: '#4C8DFF' },
    scheduled: { label: 'Scheduled', color: '#A66BFF' },
    published: { label: 'Published', color: '#3DDC97' }
  },

  events: [
    { id: 'atarc',   name: 'ATARC Roundtable',                         date: '2026-10-14', location: 'Tysons Corner, VA' },
    { id: 'autoinn', name: 'Auto Innovators OEM Roundtable',            window: ['2026-10-15', '2026-10-31'], when: 'Mid–Late October 2026', location: 'TBD', tentative: true },
    { id: 'ncts',    name: 'NC Transportation Summit',                  date: '2026-10-27', location: 'Raleigh Convention Center, Raleigh, NC', url: 'https://www.nctransportationsummit.com/' },
    { id: 'mcuh',    name: 'Mastercard Urban Mobility Hub Partner Event', date: '2026-10-27', location: 'Mastercard Amsterdam Office' },
    { id: 'v2x',     name: 'V2X Tolling Peer Exchange',                 date: '2026-10-28', location: 'Online' }
  ],

  posts: [
    // ── Week 1 · Set the stage ─────────────────────────────────────────
    {
      id: 'p01', channel: 'ive', date: '2026-10-01', time: '09:00', status: 'published', event: '',
      title: 'October roadmap: where to find us this month',
      copy: "October is a big month on the road.\n\nWe'll be in Tysons Corner for the ATARC Roundtable, in Raleigh for the NC Transportation Summit, joining partners at the Mastercard Urban Mobility Hub in Amsterdam, and online for the V2X Tolling Peer Exchange.\n\nEvery stop has the same goal: making the journey easier, safer and more secure with trusted in-vehicle payments.\n\nWhich conversation should we bring back to you?\n\n#InVehicleEvolution #Tolling #ConnectedCar #InVehiclePayments",
      notes: 'Carousel: one slide per event + closing CTA slide.'
    },
    {
      id: 'p02', channel: 'jj', date: '2026-10-02', time: '08:30', status: 'published', event: '',
      title: 'Toll agencies need to think like payment networks',
      copy: "Something I keep coming back to:\n\nThe toll gantry is becoming a point of sale.\n\nWhen the car can pay on its own, agencies stop managing transponders and start managing trusted transactions. That calls for a different playbook, and different partners at the table.\n\nI'll be sharing more of what we're learning this month. Glad to compare notes with anyone working on the same problem.\n\n#Tolling #Mobility #InVehicleEvolution",
      notes: 'Personal voice. No graphic needed; uses headshot.'
    },
    {
      id: 'p03', channel: 'blog', date: '2026-10-05', time: '07:00', status: 'published', event: '', category: 'Thought leadership',
      title: 'The Car Is the New Wallet: What Toll Agencies Should Plan for in 2027',
      copy: 'Connected vehicles are turning every toll point into a payment moment. Here are the five decisions agencies should be making now (identity, tokenization, interoperability, customer consent and back-office readiness) before OEM payment platforms reach scale.',
      notes: 'Pillar post for the month. Link back from every October recap.'
    },
    {
      id: 'p04', channel: 'ive', date: '2026-10-06', time: '10:00', status: 'scheduled', event: '',
      title: 'Blog promo: The Car Is the New Wallet',
      copy: "Your next toll payment might not involve a transponder at all.\n\nOur new article covers the five decisions toll agencies should make now as connected cars become payment devices.\n\nRead it on InVehicleEvolution.com 👇\n\n#InVehiclePayments #Tolling #ConnectedCar",
      notes: 'Link in first comment.'
    },
    {
      id: 'p05', channel: 'email', date: '2026-10-07', time: '10:00', status: 'scheduled', event: '',
      title: 'October newsletter: the road ahead',
      subject: 'Four stops, one conversation: October with In-Vehicle Evolution',
      preheader: 'ATARC, NC Transportation Summit, Amsterdam and V2X. Here is where to find us.',
      cta: 'See the October lineup',
      copy: 'Lead story: The Car Is the New Wallet (blog). Then an event lineup with dates and locations, an invite to meet in Raleigh, and V2X Peer Exchange registration.',
      notes: 'Segment: full list. Hold Raleigh invite details until confirmed.'
    },
    {
      id: 'p06', channel: 'jj', date: '2026-10-08', time: '08:30', status: 'drafting', event: 'atarc',
      title: 'Heading to ATARC next week',
      copy: "Next Wednesday I'm joining the ATARC Roundtable in Tysons Corner.\n\nThe question I'm bringing: how do public agencies keep trust and equity at the center as payments move into the vehicle?\n\nIf you'll be there, let's find time to talk.\n\n#ATARC #Tolling #GovTech #InVehicleEvolution",
      notes: ''
    },
    {
      id: 'p07', channel: 'ive', date: '2026-10-09', time: '11:00', status: 'drafting', event: '',
      title: 'In-vehicle payments 101 (carousel)',
      copy: "How does a car pay a toll at 65 mph?\n\n1️⃣ The vehicle is identified at the gantry\n2️⃣ A secure token stands in for the card\n3️⃣ The payment is authorized in milliseconds\n4️⃣ The driver gets a receipt on the dashboard\n\nNo transponder. No account top-ups. Swipe through for the full picture →\n\n#TechnologyEducation #InVehiclePayments #ConnectedCar",
      notes: 'Teaser for the Oct 12 education blog. 5-slide carousel.'
    },

    // ── Week 2 · ATARC ───────────────────────────────────────────────
    {
      id: 'p08', channel: 'blog', date: '2026-10-12', time: '07:00', status: 'drafting', event: '', category: 'Technology education',
      title: 'In-Vehicle Payments 101: Tokenization, Identity and the Connected Car',
      copy: 'A plain-language explainer for agency and OEM teams covering how vehicle identity, network tokenization and OEM wallets work together to make a toll payment frictionless and secure.',
      notes: 'Include diagram of the transaction flow. Glossary sidebar.'
    },
    {
      id: 'p09', channel: 'ive', date: '2026-10-13', time: '09:00', status: 'drafting', event: 'atarc',
      title: 'Tomorrow: ATARC Roundtable',
      copy: "Tomorrow we're in Tysons Corner for the ATARC Roundtable, talking with federal and state technology leaders about where connected-vehicle payments go next.\n\nFollow along here for takeaways.\n\n#ATARC #InVehicleEvolution #Tolling",
      notes: 'Event card graphic.'
    },
    {
      id: 'p10', channel: 'ive', date: '2026-10-14', time: '13:00', status: 'idea', event: 'atarc',
      title: 'Live from ATARC',
      copy: "Live from the ATARC Roundtable in Tysons Corner 📍\n\n[Add photo + one key quote from the session]\n\n#ATARC #InVehicleEvolution",
      notes: 'Capture photos on site. Post same day.'
    },
    {
      id: 'p11', channel: 'jj', date: '2026-10-14', time: '17:00', status: 'idea', event: 'atarc',
      title: 'ATARC takeaway: trust is the product',
      copy: "One line from today's ATARC Roundtable that stuck with me:\n\n[Insert quote]\n\nMy take: [1–2 sentences of reflection]\n\nThanks to everyone who joined the conversation.\n\n#ATARC #Tolling #InVehicleEvolution",
      notes: 'Draft on site; JJ to approve before posting.'
    },
    {
      id: 'p12', channel: 'ive', date: '2026-10-15', time: '10:00', status: 'idea', event: 'atarc',
      title: 'ATARC recap: 3 takeaways',
      copy: "3 takeaways from the ATARC Roundtable:\n\n→ [Takeaway 1]\n→ [Takeaway 2]\n→ [Takeaway 3]\n\nThe full recap is coming to the blog tomorrow.\n\n#ATARC #InVehiclePayments #Tolling",
      notes: ''
    },
    {
      id: 'p13', channel: 'blog', date: '2026-10-16', time: '07:00', status: 'idea', event: 'atarc', category: 'Listening & newsjacking',
      title: 'What the ATARC Roundtable Told Us About Public-Sector Appetite for Connected Payments',
      copy: "A recap of the ATARC conversation: what agencies are asking about, where they're cautious, and how those concerns shape the in-vehicle payments roadmap.",
      notes: 'Pull quotes from p10/p11. Publish within 48 hrs of event.'
    },

    // ── Week 3 · Pilots, OEMs & build-up to Raleigh ──────────────────
    {
      id: 'p14', channel: 'blog', date: '2026-10-19', time: '07:00', status: 'idea', event: 'ncts', category: 'Testing pilot technology',
      title: "Inside the Pilot: What We're Testing on the Road, and Why",
      copy: 'A behind-the-scenes look at the in-vehicle toll payment pilot: test goals, vehicles and partners involved, success metrics and early lessons. Sets up the conversation for the NC Transportation Summit.',
      notes: 'Confirm what can be shared publicly with pilot partners.'
    },
    {
      id: 'p15', channel: 'ive', date: '2026-10-20', time: '10:00', status: 'idea', event: '',
      title: 'Pilot blog promo',
      copy: "What does it take to test in-vehicle toll payments on real roads?\n\nWe're sharing what we're testing, why it matters and what we've learned so far.\n\nRead the full story on the blog 👇\n\n#PilotProgram #InVehiclePayments #ConnectedCar",
      notes: ''
    },
    {
      id: 'p16', channel: 'email', date: '2026-10-20', time: '09:00', status: 'idea', event: 'ncts',
      title: 'Invite: meet us at the NC Transportation Summit',
      subject: "Meet us in Raleigh on Oct 27: let's talk in-vehicle payments",
      preheader: "We'll be at the NC Transportation Summit. Here's how to connect.",
      cta: 'Book time with our team',
      copy: 'Event invite with date and venue (Raleigh Convention Center), what we will be discussing, a link to the pilot blog, and a CTA to book a meeting.',
      notes: 'Segment: NC + Southeast contacts, agency partners.'
    },
    {
      id: 'p17', channel: 'jj', date: '2026-10-21', time: '08:30', status: 'idea', event: 'autoinn',
      title: 'What OEMs and toll operators need from each other',
      copy: "Automakers and toll operators have spent decades on parallel tracks.\n\nIn-vehicle payments put us on the same road. Here's what each side needs from the other for this to work:\n\n🚗 OEMs: [ ]\n🛣️ Operators: [ ]\n\nLooking forward to digging into this with the Auto Innovators OEM Roundtable.\n\n#AutoInnovators #ConnectedCar #Tolling",
      notes: 'Auto Innovators date TBD. Move this post next to it once confirmed.'
    },
    {
      id: 'p18', channel: 'ive', date: '2026-10-22', time: '11:00', status: 'idea', event: 'v2x',
      title: 'Register: V2X Tolling Peer Exchange',
      copy: "V2X is changing how vehicles and infrastructure talk to each other, including how they pay.\n\nJoin the V2X Tolling Peer Exchange online on October 28.\n\n#V2X #Tolling #ConnectedVehicles",
      notes: 'Add registration link if public.'
    },
    {
      id: 'p19', channel: 'jj', date: '2026-10-23', time: '08:30', status: 'idea', event: 'ncts',
      title: 'See you in Raleigh next week',
      copy: "Next Tuesday: NC Transportation Summit at the Raleigh Convention Center.\n\nNorth Carolina has a real chance to show what modern, frictionless tolling looks like. I'm looking forward to the conversation.\n\nComing? Let me know.\n\n#NCTransportationSummit #Tolling #InVehicleEvolution",
      notes: ''
    },

    // ── Week 4 · Event week ──────────────────────────────────────────
    {
      id: 'p20', channel: 'ive', date: '2026-10-26', time: '09:00', status: 'idea', event: '',
      title: 'Event week: Raleigh, Amsterdam & V2X',
      copy: "Big week ahead 🗓️\n\n📍 Tue: NC Transportation Summit, Raleigh\n📍 Tue: Mastercard Urban Mobility Hub Partner Event, Amsterdam\n💻 Wed: V2X Tolling Peer Exchange, online\n\nTwo continents, one conversation about the future of in-vehicle payments.\n\n#InVehicleEvolution #Tolling #UrbanMobility",
      notes: 'Graphic: three-stop route map.'
    },
    {
      id: 'p21', channel: 'ive', date: '2026-10-27', time: '12:00', status: 'idea', event: 'ncts',
      title: 'Live from the NC Transportation Summit',
      copy: "Live from the NC Transportation Summit in Raleigh 📍\n\n[Photo + key moment]\n\n#NCTransportationSummit #InVehicleEvolution",
      notes: ''
    },
    {
      id: 'p22', channel: 'jj', date: '2026-10-27', time: '17:00', status: 'idea', event: 'ncts',
      title: 'Reflections from the NC Transportation Summit',
      copy: "What a day in Raleigh.\n\n[1 insight from the summit]\n[1 thank-you / shout-out]\n\nThe road to frictionless tolling runs through collaboration.\n\n#NCTransportationSummit #Tolling",
      notes: ''
    },
    {
      id: 'p23', channel: 'ive', date: '2026-10-27', time: '08:00', status: 'idea', event: 'mcuh',
      title: 'Across the Atlantic: Mastercard Urban Mobility Hub',
      copy: "Meanwhile in Amsterdam 🇳🇱\n\nWe're with partners at the Mastercard Urban Mobility Hub, comparing notes on how cities and mobility operators are making payments invisible to the traveler.\n\n#UrbanMobility #Mastercard #InVehiclePayments",
      notes: 'Schedule for morning ET (afternoon CET). Confirm partner approval to tag.'
    },
    {
      id: 'p24', channel: 'ive', date: '2026-10-28', time: '09:00', status: 'idea', event: 'v2x',
      title: 'Today: V2X Tolling Peer Exchange',
      copy: "Today we're joining peers online for the V2X Tolling Peer Exchange.\n\nThe question on the table: how will vehicle-to-everything communication reshape toll collection?\n\n#V2X #Tolling #ConnectedVehicles",
      notes: ''
    },
    {
      id: 'p25', channel: 'email', date: '2026-10-29', time: '10:00', status: 'idea', event: 'ncts',
      title: 'Recap: October on the road',
      subject: 'What we heard in Raleigh, Amsterdam and online',
      preheader: 'Takeaways from NC Transportation Summit, the Mastercard Urban Mobility Hub and V2X.',
      cta: 'Read the full recap',
      copy: 'Thank-you and recap email in the style of the IBTTA follow-up: hero photo from Raleigh, key takeaways per event, featured voices, and a "Keep the conversation going" CTA band.',
      notes: 'Mirror IBTTA recap template (Email-Event-Post-1).'
    },
    {
      id: 'p26', channel: 'jj', date: '2026-10-29', time: '08:30', status: 'idea', event: 'v2x',
      title: 'V2X peer exchange: what agencies are asking',
      copy: "Yesterday's V2X Tolling Peer Exchange surfaced the questions agencies are really asking:\n\n❓ [ ]\n❓ [ ]\n❓ [ ]\n\nNone of these have easy answers yet, and that's why peer exchanges matter.\n\n#V2X #Tolling",
      notes: ''
    },
    {
      id: 'p27', channel: 'blog', date: '2026-10-30', time: '07:00', status: 'idea', event: 'mcuh', category: 'Thought leadership',
      title: 'From Raleigh to Amsterdam: What October Taught Us About Interoperable In-Vehicle Payments',
      copy: 'A month-end synthesis of ATARC, the NC Transportation Summit, the Mastercard Urban Mobility Hub and the V2X Peer Exchange. Covers the common threads, open questions and what comes next for interoperable in-vehicle payments.',
      notes: 'Link back to the Oct 5 pillar post.'
    }
  ]
};
