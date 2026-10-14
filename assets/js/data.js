/* In-Vehicle Evolution — content plan seed data (v3: ATARC Roundtable removed).
   Source: IVE-Content-Plan-Oct-Nov-2026_1.docx (proposed plan, Oct 8 – Nov 30, 2026).
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
    { id: 'autoinn', name: 'Auto Innovators OEM Roundtable',            window: ['2026-10-15', '2026-10-31'], when: 'Mid–Late October 2026', location: 'TBD', tentative: true },
    { id: 'ncts',    name: 'NC Transportation Summit',                  date: '2026-10-27', location: 'Raleigh Convention Center, Raleigh, NC', url: 'https://www.nctransportationsummit.com/' },
    { id: 'mcuh',    name: 'Mastercard Urban Mobility Hub Partner Event', date: '2026-10-27', location: 'Mastercard Amsterdam Office' },
    { id: 'v2x',     name: 'V2X Tolling Peer Exchange',                 date: '2026-10-28', location: 'Online' }
  ],

  posts: [
    // ── October 2026 ─────────────────────────────────────────
    {
      id: "v03", channel: "blog", date: "2026-10-12", time: "07:00", status: "idea", event: "", category: "Testing pilot technology",
      title: "What We're Learning Through Testing",
      copy: "Project update: what the road tests are measuring, early lessons on accuracy and reliability, and what comes next. (Strategy October angle.)",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v04", channel: "ive", date: "2026-10-12", time: "10:00", status: "idea", event: "",
      title: "Blog promo: What we are learning through testing",
      copy: "Project summary of the update + one stat or photo from testing. CTA to InVehicleEvolution.com/news.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v05", channel: "jj", date: "2026-10-13", time: "08:30", status: "idea", event: "",
      title: "Why testing in the real world matters",
      copy: "Executive perspective on the testing update: why this milestone matters and what the tolling industry can learn from it.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v08", channel: "ive", date: "2026-10-15", time: "10:00", status: "idea", event: "",
      title: "Video: Testing is underway, behind the scenes",
      copy: "30–60 sec clip of road-testing footage showing the vehicle, the toll point and the in-dash experience.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v10", channel: "jj", date: "2026-10-19", time: "08:30", status: "idea", event: "autoinn",
      title: "What OEMs and toll operators need from each other",
      copy: "Automakers and toll operators on one road: what each side needs from the other. Tie to the Auto Innovators OEM Roundtable.",
      notes: "Title and angle from the proposed plan; final copy to follow. Auto Innovators date is TBD; move this post once confirmed."
    },
    {
      id: "v11", channel: "ive", date: "2026-10-19", time: "10:00", status: "idea", event: "",
      title: "How a transaction connects (explainer carousel)",
      copy: "Four-slide explainer: vehicle infotainment → Tollsy → secure payment → toll facility.",
      notes: "Pillar: Technology education. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v12", channel: "email", date: "2026-10-20", time: "10:00", status: "idea", event: "ncts",
      title: "October update + meet us in Raleigh",
      copy: "Monthly roundup: testing blog and behind-the-scenes video. Invite to NC Transportation Summit and V2X.",
      notes: "Title and angle from the proposed plan; final copy to follow. Email audience and platform to confirm."
    },
    {
      id: "v13", channel: "blog", date: "2026-10-21", time: "07:00", status: "idea", event: "", category: "Thought leadership",
      title: "How Connected Vehicles Could Change Toll Payments",
      copy: "Monthly thought-leadership piece: from transponders to the connected car, and what it means for agencies, drivers and partners.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v14", channel: "ive", date: "2026-10-21", time: "10:00", status: "idea", event: "",
      title: "Blog promo: How connected vehicles could change toll payments",
      copy: "Short summary of the article + a pull quote graphic. CTA to read on the site.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v15", channel: "jj", date: "2026-10-22", time: "08:30", status: "idea", event: "",
      title: "The toll gantry is becoming a point of sale",
      copy: "JJ's executive take on the article: why North Carolina is leaning into in-vehicle payments.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v16", channel: "ive", date: "2026-10-22", time: "10:00", status: "idea", event: "v2x",
      title: "Register: V2X Tolling Peer Exchange",
      copy: "Invite to join the online peer exchange on Oct 28 and the question on the table.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v17", channel: "ive", date: "2026-10-23", time: "10:00", status: "idea", event: "",
      title: "Newsjacking slot: industry news of the week",
      copy: "Quick-turn commentary on a relevant Volvo, Mastercard, connected-vehicle or tolling announcement.",
      notes: "Pillar: Listening & newsjacking. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v18", channel: "jj", date: "2026-10-26", time: "08:30", status: "idea", event: "ncts",
      title: "See you in Raleigh tomorrow",
      copy: "Why North Carolina can show what modern, frictionless tolling looks like. Invite to connect at the summit.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v19", channel: "ive", date: "2026-10-26", time: "10:00", status: "idea", event: "",
      title: "Event week: Raleigh, Amsterdam & V2X",
      copy: "Three-stop week-ahead graphic: NC Transportation Summit, Mastercard Urban Mobility Hub, V2X Peer Exchange.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v20", channel: "ive", date: "2026-10-27", time: "08:00", status: "idea", event: "mcuh",
      title: "Meanwhile in Amsterdam: Mastercard Urban Mobility Hub",
      copy: "Partner-event moment from Amsterdam: making payments invisible to the traveler.",
      notes: "Title and angle from the proposed plan; final copy to follow. Partner approval needed before tagging Volvo or Mastercard."
    },
    {
      id: "v21", channel: "ive", date: "2026-10-27", time: "13:00", status: "idea", event: "ncts",
      title: "Live from the NC Transportation Summit",
      copy: "On-site photo + key moment from Raleigh.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v22", channel: "jj", date: "2026-10-27", time: "08:30", status: "idea", event: "ncts",
      title: "Reflections from the NC Transportation Summit",
      copy: "One insight from the day + a thank-you / shout-out.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v23", channel: "ive", date: "2026-10-28", time: "10:00", status: "idea", event: "v2x",
      title: "Today: V2X Tolling Peer Exchange",
      copy: "How vehicle-to-everything communication could reshape toll collection.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v24", channel: "jj", date: "2026-10-29", time: "08:30", status: "idea", event: "v2x",
      title: "V2X: the questions agencies are asking",
      copy: "Three open questions from the peer exchange and why peer conversations matter.",
      notes: "Pillar: Listening & newsjacking. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v25", channel: "ive", date: "2026-10-29", time: "10:00", status: "idea", event: "",
      title: "Testing for security, reliability and accuracy",
      copy: "Carousel on what the pilot checks before a payment is trusted: security, reliability, accuracy.",
      notes: "Pillar: Testing pilot technology. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v26", channel: "ive", date: "2026-10-30", time: "10:00", status: "idea", event: "",
      title: "October on the road: month in review",
      copy: "Carousel recap of Raleigh, Amsterdam and V2X with one takeaway each.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    // ── November 2026 ─────────────────────────────────────────
    {
      id: "v27", channel: "blog", date: "2026-11-02", time: "07:00", status: "idea", event: "", category: "Technology education",
      title: "Inside the Technology Behind In-Vehicle Payments",
      copy: "Plain-language explainer of how the vehicle, Tollsy, secure payment processing and the toll facility work together.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v28", channel: "ive", date: "2026-11-02", time: "10:00", status: "idea", event: "",
      title: "Blog promo: Inside the technology",
      copy: "Explainer graphic + summary. CTA to the article.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v29", channel: "jj", date: "2026-11-03", time: "08:30", status: "idea", event: "",
      title: "The best payment technology is the one drivers never notice",
      copy: "Executive take on the explainer: why reducing friction for drivers is the real goal.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v30", channel: "email", date: "2026-11-04", time: "10:00", status: "idea", event: "",
      title: "November update: October on the road",
      copy: "Monthly roundup: takeaways from Raleigh, Amsterdam and V2X, the technology explainer blog and the latest video.",
      notes: "Title and angle from the proposed plan; final copy to follow. Email audience and platform to confirm."
    },
    {
      id: "v31", channel: "ive", date: "2026-11-05", time: "10:00", status: "idea", event: "",
      title: "Video: Meet the technology (Tollsy walkthrough)",
      copy: "In-vehicle screen walkthrough of a toll payment, start to finish.",
      notes: "Pillar: Technology education. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v32", channel: "jj", date: "2026-11-06", time: "08:30", status: "idea", event: "",
      title: "Newsjacking slot: JJ commentary",
      copy: "Timely executive comment on a tolling, mobility or payments headline that ties back to the pilot.",
      notes: "Pillar: Listening & newsjacking. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v33", channel: "ive", date: "2026-11-09", time: "10:00", status: "idea", event: "",
      title: "Pilot milestone: where testing stands",
      copy: "Milestone graphic with a simple stat on testing progress and what comes next.",
      notes: "Pillar: Testing pilot technology. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v34", channel: "jj", date: "2026-11-10", time: "08:30", status: "idea", event: "",
      title: "What a month on the road taught me",
      copy: "JJ reflects on the common thread across Raleigh, Amsterdam and V2X.",
      notes: "Pillar: Thought leadership. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v35", channel: "ive", date: "2026-11-11", time: "10:00", status: "idea", event: "",
      title: "From transponders to connected vehicles (carousel)",
      copy: "Timeline of how toll payment technology has evolved and where it goes next.",
      notes: "Pillar: Technology education. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v36", channel: "ive", date: "2026-11-12", time: "10:00", status: "idea", event: "",
      title: "Partner spotlight",
      copy: "Spotlight a project partner (e.g. Volvo or Mastercard) and their role in the pilot.",
      notes: "Title and angle from the proposed plan; final copy to follow. Partner approval needed before tagging Volvo or Mastercard."
    },
    {
      id: "v37", channel: "ive", date: "2026-11-13", time: "10:00", status: "idea", event: "",
      title: "Newsjacking slot: industry news of the week",
      copy: "Quick-turn commentary on a relevant connected-vehicle, automotive or tolling announcement.",
      notes: "Pillar: Listening & newsjacking. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v38", channel: "blog", date: "2026-11-16", time: "07:00", status: "idea", event: "", category: "Thought leadership",
      title: "Reducing Friction Across the Tolling Ecosystem",
      copy: "Monthly thought-leadership piece on the recurring theme: customer experience, interoperability and public-private collaboration.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v39", channel: "ive", date: "2026-11-16", time: "10:00", status: "idea", event: "",
      title: "Blog promo: Reducing friction across the tolling ecosystem",
      copy: "Pull-quote graphic + CTA to the article.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v40", channel: "jj", date: "2026-11-17", time: "08:30", status: "idea", event: "",
      title: "Public-private partnership, done right",
      copy: "Executive view on what makes the pilot partnership work and what other agencies can borrow.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v41", channel: "ive", date: "2026-11-18", time: "10:00", status: "idea", event: "",
      title: "Video: Q&A with project leadership",
      copy: "Short interview with JJ or Manish answering the most common questions about the pilot.",
      notes: "Pillar: Thought leadership. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v42", channel: "ive", date: "2026-11-19", time: "10:00", status: "idea", event: "",
      title: "FAQ: is paying from the car secure?",
      copy: "FAQ graphic on how payment information is securely processed.",
      notes: "Pillar: Technology education. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v43", channel: "jj", date: "2026-11-20", time: "08:30", status: "idea", event: "",
      title: "What interoperability could look like",
      copy: "JJ's view on a future where any connected car can pay any toll.",
      notes: "Pillar: Thought leadership. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v44", channel: "ive", date: "2026-11-23", time: "10:00", status: "idea", event: "",
      title: "How the customer experience is being evaluated",
      copy: "Behind-the-scenes look at how testers rate the in-vehicle payment experience.",
      notes: "Pillar: Testing pilot technology. Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v45", channel: "jj", date: "2026-11-24", time: "08:30", status: "idea", event: "",
      title: "Thankful for the people behind the pilot",
      copy: "Thanksgiving-week thank-you to the testing team and partners.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v46", channel: "blog", date: "2026-11-30", time: "07:00", status: "idea", event: "", category: "Testing pilot technology",
      title: "From Testing to Real-World Enrollment: What Comes Next",
      copy: "Project update on the path from road testing to enrollment, and what drivers and agencies can expect.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    },
    {
      id: "v47", channel: "ive", date: "2026-11-30", time: "10:00", status: "idea", event: "",
      title: "Blog promo: From testing to enrollment",
      copy: "Project summary + milestone graphic. CTA to the article.",
      notes: "Title and angle from the proposed plan; final copy to follow."
    }
  ]
};
