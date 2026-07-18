const CATEGORIES = [
  { id: "all", label: "All Violations", color: "#e5e5e5" },
  { id: "antitrust", label: "Antitrust & Monopoly", color: "#f97316" },
  { id: "labor", label: "Labor Exploitation", color: "#ef4444" },
  { id: "health", label: "Public Health Harm", color: "#a855f7" },
  { id: "environmental", label: "Environmental", color: "#22c55e" },
  { id: "financial", label: "Financial Fraud", color: "#3b82f6" },
  { id: "privacy", label: "Data Privacy", color: "#eab308" },
];

const COMPANIES = [
  {
    name: "Johnson & Johnson",
    ticker: "JNJ",
    industry: "Pharmaceutical",
    totalFines: "$18B+",
    fineRaw: 18,
    categories: ["health", "environmental"],
    violations: [
      {
        title: "Opioid Crisis Contribution",
        amount: "$9B+",
        year: "2021-2023",
        detail:
          "J&J reached multi-billion-dollar settlements with states across the US over allegations its marketing and distribution practices fueled the opioid epidemic, which has killed over 500,000 Americans.",
        source: "DOJ / State AGs",
      },
      {
        title: "Talc / Asbestos Cover-Up",
        amount: "$8.9B",
        year: "2023-2024",
        detail:
          "Faced mass litigation alleging its baby powder contained asbestos and caused ovarian cancer. J&J attempted to use a controversial 'Texas Two-Step' bankruptcy maneuver to limit payouts to cancer victims.",
        source: "Federal Bankruptcy Court",
      },
    ],
  },
  {
    name: "3M Company",
    ticker: "MMM",
    industry: "Industrial / Defense",
    totalFines: "$18.7B+",
    fineRaw: 18.7,
    categories: ["environmental", "health"],
    violations: [
      {
        title: "PFAS Water Contamination",
        amount: "$12.5B",
        year: "2023",
        detail:
          'Settled claims that 3M contaminated public water systems across the US with so-called "forever chemicals" (PFAS), which are linked to cancer, thyroid disorders, and developmental harm.',
        source: "EPA / State Water Authorities",
      },
      {
        title: "Defective Military Earplugs",
        amount: "$6B",
        year: "2023",
        detail:
          "Settled lawsuits from over 200,000 US military veterans who claim 3M knowingly sold defective Combat Arms earplugs that caused hearing loss and tinnitus.",
        source: "DOJ / Federal Court",
      },
    ],
  },
  {
    name: "PG&E Corp",
    ticker: "PCG",
    industry: "Utilities",
    totalFines: "$16.1B",
    fineRaw: 16.1,
    categories: ["environmental", "financial"],
    violations: [
      {
        title: "California Wildfire Deaths",
        amount: "$13.5B",
        year: "2020",
        detail:
          "PG&E's equipment directly caused multiple deadly Northern California wildfires, including the 2018 Camp Fire which killed 85 people and destroyed the entire town of Paradise. The company pleaded guilty to 84 counts of involuntary manslaughter.",
        source: "Federal Bankruptcy Court / DOJ",
      },
      {
        title: "Criminal Negligence",
        amount: "85 lives",
        year: "2020",
        detail:
          "PG&E pleaded guilty to 84 counts of involuntary manslaughter while simultaneously paying out $100M+ in executive compensation during the same period their neglected infrastructure was killing Californians.",
        source: "Federal Criminal Court",
      },
    ],
  },
  {
    name: "Walmart",
    ticker: "WMT",
    industry: "Retail",
    totalFines: "$1.4B+",
    fineRaw: 1.4,
    categories: ["labor", "financial"],
    violations: [
      {
        title: "Largest Wage Theft in US History",
        amount: "$1.4B",
        year: "2000-present",
        detail:
          "Walmart has paid more in wage theft settlements and fines than any other company in the US — 98 documented cases. Violations include off-the-clock work, denied breaks, overtime theft, and misclassifying workers.",
        source: "Good Jobs First / DOL",
      },
      {
        title: "Opioid Distribution Liability",
        amount: "$3.1B",
        year: "2022",
        detail:
          "Walmart agreed to pay $3.1 billion to settle claims that its pharmacies illegally dispensed opioids without proper oversight, contributing to the addiction crisis.",
        source: "DOJ / State AGs",
      },
    ],
  },
  {
    name: "McKesson Corp",
    ticker: "MCK",
    industry: "Healthcare Distribution",
    totalFines: "$8.5B",
    fineRaw: 8.5,
    categories: ["health"],
    violations: [
      {
        title: "Opioid Epidemic Profiteering",
        amount: "$8.5B",
        year: "2022",
        detail:
          "McKesson, the largest US pharmaceutical distributor, settled for $8.5B over allegations it shipped hundreds of millions of opioid pills to pharmacies and doctors it knew — or should have known — were fueling addiction and death.",
        source: "DOJ / State AGs",
      },
    ],
  },
  {
    name: "Walgreens",
    ticker: "WBA",
    industry: "Pharmacy / Retail",
    totalFines: "$7.6B",
    fineRaw: 7.6,
    categories: ["health", "financial"],
    violations: [
      {
        title: "Opioid Crisis Settlement",
        amount: "$5.7B",
        year: "2022",
        detail:
          "Walgreens settled for $5.7B for its role in distributing opioids irresponsibly through its pharmacy network, ignoring red flags of pill mill operations.",
        source: "State AGs / Federal Court",
      },
      {
        title: "Insulin Price Fraud",
        amount: "$1.9B",
        year: "2023",
        detail:
          "Walgreens settled claims it submitted false drug pricing data to Medicare and Medicaid, allowing it to overbill federal programs for insulin and other medications for years.",
        source: "DOJ False Claims Act",
      },
    ],
  },
  {
    name: "Wells Fargo",
    ticker: "WFC",
    industry: "Banking",
    totalFines: "$5.4B+",
    fineRaw: 5.4,
    categories: ["financial", "labor"],
    violations: [
      {
        title: "Fake Accounts Scandal",
        amount: "$3B",
        year: "2020",
        detail:
          "Wells Fargo paid $3B after admitting it opened over 3.5 million fake accounts in customers' names without consent, charging them fees for accounts they never wanted. Branch employees were pressured by sales quotas to commit fraud.",
        source: "DOJ / SEC / CFPB",
      },
      {
        title: "Pervasive Consumer Fraud",
        amount: "$2B+",
        year: "2016-2022",
        detail:
          "Beyond fake accounts, Wells Fargo was fined for illegally repossessing cars from service members, charging improper mortgage fees, misapplying loan payments, and illegally denying mortgage modifications.",
        source: "CFPB / OCC",
      },
      {
        title: "Wage Theft",
        amount: "$205M",
        year: "2000-present",
        detail:
          "205 million dollars in documented wage theft settlements — including forcing financial advisors to work unpaid hours and denying overtime.",
        source: "Good Jobs First / DOL",
      },
    ],
  },
  {
    name: "Google / Alphabet",
    ticker: "GOOGL",
    industry: "Technology",
    totalFines: "$10B+",
    fineRaw: 10,
    categories: ["antitrust", "privacy"],
    violations: [
      {
        title: "Illegal Search Monopoly",
        amount: "Ongoing",
        year: "2024",
        detail:
          "A federal judge ruled in 2024 that Google maintained an illegal monopoly in search by paying Apple ~$18B/year to be the default search engine on iPhones — locking out competitors and charging advertisers monopoly prices.",
        source: "DOJ / US District Court (Judge Mehta)",
      },
      {
        title: "EU Antitrust Fines",
        amount: "$8.25B",
        year: "2017-2019",
        detail:
          "The EU fined Google three times: $2.7B for favoring its own shopping results, $5B for forcing Android phone makers to bundle Google apps, and $1.7B for blocking rival search ads.",
        source: "European Commission",
      },
      {
        title: "Location Data Deception",
        amount: "$391.5M",
        year: "2022",
        detail:
          "Google settled with 40 state AGs over secretly tracking user location even after users explicitly turned off location history — a documented, intentional deception.",
        source: "State AGs Coalition",
      },
    ],
  },
  {
    name: "Meta / Facebook",
    ticker: "META",
    industry: "Social Media / Technology",
    totalFines: "$6.5B+",
    fineRaw: 6.5,
    categories: ["antitrust", "privacy"],
    violations: [
      {
        title: "Biometric Data Theft",
        amount: "$1.4B",
        year: "2024",
        detail:
          "The largest privacy settlement in US history: Meta paid $1.4B to Texas for illegally collecting biometric face data from 20+ million Texans without consent through its facial recognition system.",
        source: "Texas AG",
      },
      {
        title: "Cambridge Analytica / FTC",
        amount: "$5B",
        year: "2019",
        detail:
          "Meta paid the largest FTC fine in history after the Cambridge Analytica scandal revealed it allowed a third party to harvest personal data from 87 million users without consent and use it for political manipulation.",
        source: "FTC",
      },
      {
        title: "Instagram / WhatsApp Acquisitions to Kill Competition",
        amount: "Antitrust Suit",
        year: "2021-present",
        detail:
          "Internal emails revealed Zuckerberg explicitly bought Instagram and WhatsApp to eliminate competition rather than compete with them. 'It is better to buy than compete,' he wrote. The FTC filed suit alleging illegal monopolization.",
        source: "FTC / House Judiciary Subcommittee",
      },
    ],
  },
  {
    name: "Apple",
    ticker: "AAPL",
    industry: "Technology",
    totalFines: "$2B+",
    fineRaw: 2,
    categories: ["antitrust"],
    violations: [
      {
        title: "Smartphone Monopoly Lawsuit",
        amount: "Pending",
        year: "2024-present",
        detail:
          "DOJ + 16 state AGs sued Apple for monopolizing the smartphone market through technical restrictions that lock users into iPhones and punish competitors who try to interoperate. Case is ongoing.",
        source: "DOJ + 16 State AGs",
      },
      {
        title: "App Store 30% Tax on Developers",
        amount: "$1.2B+ annually",
        year: "Ongoing",
        detail:
          "Apple forces all iOS app purchases through its App Store and takes a 30% cut — a toll that costs developers and consumers billions and has been ruled anticompetitive in multiple jurisdictions including the EU and South Korea.",
        source: "Epic v. Apple / EU DMA",
      },
      {
        title: "Supplier Labor Violations",
        amount: "Ongoing",
        year: "2020-present",
        detail:
          "Apple's iPhone manufacturing partner in India was caught committing wage theft against workers, who staged protests. Apple investigated and confirmed multiple violations of its own supplier code — but continued the relationship.",
        source: "BBC / Apple Investigation",
      },
    ],
  },
  {
    name: "Amazon",
    ticker: "AMZN",
    industry: "E-Commerce / Technology",
    totalFines: "$1.3B+",
    fineRaw: 1.3,
    categories: ["antitrust", "labor"],
    violations: [
      {
        title: "FTC Antitrust Lawsuit",
        amount: "Ongoing",
        year: "2023-present",
        detail:
          "FTC + 17 state AGs sued Amazon for illegally maintaining a monopoly — charging sellers inflated fees they can't escape, using seller data to undercut them with Amazon-branded products, and punishing sellers who offer lower prices elsewhere.",
        source: "FTC / 17 State AGs",
      },
      {
        title: "Workplace Safety / Union Busting",
        amount: "$60M+",
        year: "2021-present",
        detail:
          "Amazon has faced repeated OSHA citations for dangerous warehouse conditions with injury rates twice the industry average. It was also caught running a covert union-busting operation including surveillance of workers and hiring anti-union consultants.",
        source: "OSHA / NLRB",
      },
      {
        title: "Driver Misclassification",
        amount: "$100M+",
        year: "Ongoing",
        detail:
          "Amazon structures its delivery network through 'Delivery Service Partners' to deny driver status — and thus benefits — to tens of thousands of drivers who operate under Amazon's direct control.",
        source: "Good Jobs First / State Courts",
      },
    ],
  },
  {
    name: "Disney",
    ticker: "DIS",
    industry: "Entertainment / Media",
    totalFines: "$233M",
    fineRaw: 0.233,
    categories: ["labor"],
    violations: [
      {
        title: "Largest Wage Theft Settlement in California History",
        amount: "$233M",
        year: "2024",
        detail:
          "Disney agreed to pay $233M — the largest wage-and-hour settlement in California history — after 50,000+ Disneyland employees sued for being paid below the living wage guaranteed by a voter-approved city ordinance that Disney lobbied against.",
        source: "Anaheim Superior Court",
      },
    ],
  },
  {
    name: "FedEx",
    ticker: "FDX",
    industry: "Logistics",
    totalFines: "$502M",
    fineRaw: 0.502,
    categories: ["labor"],
    violations: [
      {
        title: "Nationwide Worker Misclassification",
        amount: "$240M",
        year: "2015-2019",
        detail:
          "FedEx settled in 20 states over misclassifying ground delivery drivers as independent contractors to deny them overtime pay and benefits — a practice that saved the company hundreds of millions while costing workers their basic rights.",
        source: "State Courts / DOL",
      },
      {
        title: "Wage Theft (Running Total)",
        amount: "$502M",
        year: "2000-present",
        detail:
          "FedEx's total documented wage theft penalties make it the second-worst corporate wage thief in America, trailing only Walmart.",
        source: "Good Jobs First",
      },
    ],
  },
  {
    name: "Bank of America",
    ticker: "BAC",
    industry: "Banking",
    totalFines: "$16.6B+",
    fineRaw: 16.6,
    categories: ["financial", "labor"],
    violations: [
      {
        title: "Mortgage Fraud / 2008 Financial Crisis",
        amount: "$16.6B",
        year: "2014",
        detail:
          "DOJ's largest civil settlement in history at the time. Bank of America admitted to knowingly selling toxic mortgage-backed securities to investors, contributing to the 2008 financial crisis that destroyed millions of Americans' retirement accounts and homes.",
        source: "DOJ",
      },
      {
        title: "Wage Theft",
        amount: "$381M",
        year: "2000-present",
        detail:
          "Third-worst corporate wage thief in the US with $381M in documented settlements for denying overtime, misclassifying workers, and forcing off-the-clock work.",
        source: "Good Jobs First / DOL",
      },
    ],
  },
  {
    name: "JPMorgan Chase",
    ticker: "JPM",
    industry: "Banking",
    totalFines: "$40B+",
    fineRaw: 40,
    categories: ["financial"],
    violations: [
      {
        title: "Toxic Mortgage Securities",
        amount: "$13B",
        year: "2013",
        detail:
          "JPMorgan paid the largest bank settlement in US history at the time for misleading investors about the quality of mortgage-backed securities it sold before the 2008 financial crisis — knowingly offloading garbage assets onto pension funds and ordinary investors.",
        source: "DOJ",
      },
      {
        title: "Precious Metals / Treasury Market Manipulation",
        amount: "$920M",
        year: "2020",
        detail:
          "JPMorgan's traders engaged in years of 'spoofing' — placing fake orders to manipulate gold, silver, and US Treasury markets. The DOJ charged it with running a racketeering enterprise inside one of America's largest banks.",
        source: "DOJ / CFTC",
      },
    ],
  },
  {
    name: "ExxonMobil",
    ticker: "XOM",
    industry: "Oil & Gas",
    totalFines: "$4B+",
    fineRaw: 4,
    categories: ["environmental", "financial"],
    violations: [
      {
        title: "Climate Denial Campaign",
        amount: "Ongoing Harm",
        year: "1970s-present",
        detail:
          "Exxon's own scientists confirmed man-made climate change internally by the late 1970s. The company then spent decades and hundreds of millions of dollars funding climate denial to protect profits — while coastal communities, farmers, and future generations paid the price.",
        source: "Harvard / Columbia Investigations / State AG Suits",
      },
      {
        title: "Environmental Violations",
        amount: "$4B+",
        year: "Ongoing",
        detail:
          "Exxon has faced billions in fines and settlements for oil spills, pipeline leaks, refinery emissions violations, and illegal dumping across multiple states and countries.",
        source: "EPA / State Regulators",
      },
    ],
  },
  {
    name: "T-Mobile",
    ticker: "TMUS",
    industry: "Telecom",
    totalFines: "$500M+",
    fineRaw: 0.5,
    categories: ["privacy", "financial"],
    violations: [
      {
        title: "Repeat Data Breach Failures",
        amount: "$15.75M",
        year: "2024",
        detail:
          "The FCC fined T-Mobile $15.75M for security failures across three separate data breaches (2021, 2022, 2023) exposing tens of millions of customers. T-Mobile must invest an equal amount to finally fix its security — after years of ignoring it.",
        source: "FCC",
      },
      {
        title: "Customer Data Sales to Bounty Hunters",
        amount: "$200M",
        year: "2020",
        detail:
          "T-Mobile (along with AT&T, Verizon, Sprint) sold real-time customer location data to third-party aggregators who resold it to bounty hunters and others with zero legitimate need — a practice exposed by Motherboard's reporting.",
        source: "FCC / Motherboard Investigation",
      },
    ],
  },
  {
    name: "AT&T",
    ticker: "T",
    industry: "Telecom",
    totalFines: "$800M+",
    fineRaw: 0.8,
    categories: ["privacy", "financial"],
    violations: [
      {
        title: "Throttling 'Unlimited' Data Plans",
        amount: "$60M",
        year: "2019",
        detail:
          "AT&T was caught selling 'unlimited' data plans while secretly throttling customers' speeds after they used a certain amount — misleading millions of consumers who were paying full price for a service they weren't receiving.",
        source: "FTC",
      },
      {
        title: "Selling Customer Location Data",
        amount: "$13M",
        year: "2024",
        detail:
          "AT&T settled with the FCC over a supply chain breach that led to criminals stealing customer personal information — part of a broader industry pattern of treating customer data as a product.",
        source: "FCC",
      },
    ],
  },
  {
    name: "Purdue Pharma",
    ticker: "Private",
    industry: "Pharmaceutical",
    totalFines: "$8.3B",
    fineRaw: 8.3,
    categories: ["health"],
    violations: [
      {
        title: "Manufacturing the Opioid Epidemic",
        amount: "$8.3B",
        year: "2020",
        detail:
          "Purdue Pharma pleaded guilty to federal criminal charges for marketing OxyContin as non-addictive when it knew otherwise, lying to the DEA, and creating the conditions for a public health crisis that has killed over 500,000 Americans. The Sackler family, which owned the company, personally pocketed over $11B before bankruptcy.",
        source: "DOJ Criminal Plea",
      },
    ],
  },
  {
    name: "Union Pacific",
    ticker: "UNP",
    industry: "Railroad / Freight",
    totalFines: "$900M+",
    fineRaw: 0.9,
    categories: ["labor", "environmental"],
    violations: [
      {
        title: "Most Violations of Any US Company",
        amount: "607 violations",
        year: "2020-2024",
        detail:
          "Union Pacific leads all US companies in total regulatory violation count — 607 documented violations including workplace safety failures, environmental spills, and labor law breaches. Workers have been killed by preventable accidents.",
        source: "Protecht / Good Jobs First",
      },
    ],
  },
  {
    name: "Goldman Sachs",
    ticker: "GS",
    industry: "Investment Banking",
    totalFines: "$5.1B+",
    fineRaw: 5.1,
    categories: ["financial"],
    violations: [
      {
        title: "1MDB Sovereign Fund Bribery",
        amount: "$5.1B",
        year: "2020",
        detail:
          "Goldman Sachs's subsidiary pleaded guilty and the parent entered a deferred prosecution agreement after admitting its executives paid $1.6B in bribes to foreign officials to secure bond deals for Malaysia's 1MDB state fund. The scandal involved the theft of at least $2.7B — money that funded a luxury yacht, fine art, and even the Hollywood film 'The Wolf of Wall Street.' The DOJ penalty was the largest ever under the Foreign Corrupt Practices Act.",
        source: "DOJ / SEC / Multiple International Regulators",
      },
      {
        title: "Off-Channel Communications Cover-Up",
        amount: "$125M",
        year: "2022",
        detail:
          "Goldman Sachs paid $125M to the SEC for allowing employees to conduct firm business on personal phones and messaging apps — deliberately evading recordkeeping rules that exist to detect fraud and market manipulation.",
        source: "SEC / CFTC",
      },
    ],
  },
  {
    name: "Boeing",
    ticker: "BA",
    industry: "Aerospace / Defense",
    totalFines: "$3.5B+",
    fineRaw: 3.5,
    categories: ["financial", "health"],
    violations: [
      {
        title: "737 MAX Cover-Up: 346 People Killed",
        amount: "$2.5B+",
        year: "2021-2025",
        detail:
          "Boeing admitted its employees concealed a dangerous flight-control system (MCAS) from FAA regulators to avoid costly pilot retraining. Two 737 MAX crashes — Lion Air (2018) and Ethiopian Airlines (2019) — killed 346 people. Internal messages showed a pilot boasting about 'Jedi-mind tricking' regulators. Boeing entered a deferred prosecution agreement in 2021, violated it, then negotiated repeated settlements to avoid criminal trial. In 2025, the DOJ ultimately allowed Boeing to avoid prosecution with a non-prosecution agreement.",
        source: "DOJ / FAA / Federal Criminal Court",
      },
      {
        title: "Alaska Airlines Door Plug Blowout",
        amount: "Ongoing",
        year: "2024",
        detail:
          "A door plug blew out of a 737 MAX 9 shortly after takeoff in January 2024 — the bolts had never been installed at Boeing's factory. The incident revealed Boeing had violated its own 2021 compliance agreement and was still failing basic quality control, triggering a new DOJ criminal investigation and FAA production caps.",
        source: "NTSB / FAA / DOJ",
      },
    ],
  },
  {
    name: "Uber",
    ticker: "UBER",
    industry: "Rideshare / Tech",
    totalFines: "$500M+",
    fineRaw: 0.5,
    categories: ["labor", "privacy"],
    violations: [
      {
        title: "Systematic Driver Wage Theft",
        amount: "$290M",
        year: "2023",
        detail:
          "The New York AG secured a $290M settlement — the largest of its kind — after finding Uber had systematically withheld pay from drivers for years, violating state wage laws. Uber took fees from drivers' earnings before calculating their legally required pay floor, effectively skimming wages from tens of thousands of workers.",
        source: "NY Attorney General",
      },
      {
        title: "Data Breach Cover-Up",
        amount: "$148M",
        year: "2018",
        detail:
          "Uber suffered a massive 2016 data breach affecting 57 million users and drivers — then paid hackers $100,000 to delete the data and stay quiet, concealing the breach from regulators and victims for over a year. Uber paid $148M to all 50 states to settle the cover-up.",
        source: "State AGs / FTC",
      },
      {
        title: "FTC: Unauthorized Subscription Charges",
        amount: "Lawsuit pending",
        year: "2025",
        detail:
          "The FTC sued Uber in 2025 for charging consumers for its Uber One subscription without consent, and making cancellation intentionally difficult — a classic 'dark pattern' designed to trap customers into recurring charges they didn't want.",
        source: "FTC",
      },
    ],
  },
  {
    name: "UnitedHealth Group",
    ticker: "UNH",
    industry: "Health Insurance",
    totalFines: "$1.1B+ (active investigations)",
    fineRaw: 1.1,
    categories: ["financial", "health", "antitrust"],
    violations: [
      {
        title: "Medicare Advantage Fraud Investigation",
        amount: "Potentially billions",
        year: "2024-present",
        detail:
          "A 2024 federal watchdog report found UnitedHealth received $3.7B from Medicare in 2023 for in-home patient visits where no follow-up treatment was ever provided — a practice critics call 'upcoding.' The DOJ launched a civil fraud investigation, and multiple whistleblower suits allege the company systematically inflated diagnosis codes to extract higher government payments. If proven, penalties could exceed those of any previous healthcare fraud case.",
        source: "HHS Inspector General / DOJ / Wall Street Journal",
      },
      {
        title: "Change Healthcare Data Breach",
        amount: "$1.1B+ in losses",
        year: "2024",
        detail:
          "UnitedHealth's Change Healthcare subsidiary — which processes 15 billion healthcare transactions per year — was hacked in February 2024 in the largest known healthcare data breach in US history, exposing data on 190 million Americans. UnitedHealth paid the hackers a $22M ransom. Hospitals and pharmacies were unable to process claims for weeks, disrupting care nationwide.",
        source: "HHS / Senate Judiciary Committee",
      },
      {
        title: "Antitrust: Monopolizing Healthcare",
        amount: "Active suits",
        year: "2022-present",
        detail:
          "DOJ sued to block UnitedHealth's $13B acquisition of Change Healthcare, arguing it would give the country's largest insurer control over the data and payment infrastructure used by its own competitors. The court allowed the merger. The FTC separately sued UnitedHealth's OptumRx pharmacy arm for anticompetitive insulin pricing that harmed patients.",
        source: "DOJ / FTC",
      },
    ],
  },
  {
    name: "Tyson Foods",
    ticker: "TSN",
    industry: "Meat Processing",
    totalFines: "$100M+",
    fineRaw: 0.1,
    categories: ["labor", "environmental", "health"],
    violations: [
      {
        title: "Illegal Child Labor in Processing Plants",
        amount: "Ongoing",
        year: "2023-present",
        detail:
          "Investigative reporting and DOL probes revealed migrant children as young as 13 working overnight shifts in Tyson-supplier processing plants — cleaning dangerous equipment and working in conditions that violate federal child labor law. Between 2012 and 2021, Tyson plants also experienced 47 ammonia leaks injuring nearly 150 workers — accounting for 60% of all meatpacker ammonia injuries reported to the EPA.",
        source: "DOL / EPA / NYT Investigation",
      },
      {
        title: "Repeated Water Supply Contamination",
        amount: "$2M+",
        year: "Ongoing",
        detail:
          "Tyson has faced repeated federal and state penalties for discharging contaminated wastewater into rivers and streams — including a Missouri incident that killed over 100,000 fish and triggered an EPA criminal investigation. In Virginia, the company was fined multiple times for discharges exceeding permitted limits for ammonia, E. coli, and fecal coliform.",
        source: "EPA / State Environmental Agencies",
      },
      {
        title: "Systemic Hiring Discrimination",
        amount: "$1.6M",
        year: "2016",
        detail:
          "Tyson settled DOL charges of systemic race and gender discrimination in hiring at multiple facilities, agreeing to pay $1.6M in back wages to affected workers — part of a broader pattern of labor violations at its processing plants.",
        source: "DOL / OFCCP",
      },
    ],
  },
  {
    name: "Dollar General",
    ticker: "DG",
    industry: "Discount Retail",
    totalFines: "$33M+",
    fineRaw: 0.033,
    categories: ["labor"],
    violations: [
      {
        title: "Chronic Workplace Safety Violations",
        amount: "$33M+",
        year: "2017-present",
        detail:
          "Dollar General has racked up over $33M in OSHA fines since 2017 — more than any other retailer — for persistently dangerous conditions across its 19,000+ stores: blocked fire exits, cluttered emergency aisles, inaccessible fire extinguishers, and dangerous inventory piles. In 2024, the DOL reached a settlement requiring the company to correct hazards within 48 hours of detection or face $100,000-per-day fines — a level of oversight typically reserved for repeat criminal violators.",
        source: "OSHA / DOL",
      },
      {
        title: "Chronic Wage Law Violations",
        amount: "Multiple settlements",
        year: "Ongoing",
        detail:
          "Dollar General stores have faced repeated state and federal wage complaints for scheduling practices that deny workers required break periods and for pressuring employees to work off the clock to keep labor costs down — a structural feature of its ultra-lean business model.",
        source: "DOL / State Labor Agencies",
      },
    ],
  },
  {
    name: "Cigna",
    ticker: "CI",
    industry: "Health Insurance",
    totalFines: "$172M+",
    fineRaw: 0.172,
    categories: ["financial", "health"],
    violations: [
      {
        title: "Medicare Fraud: False Diagnosis Codes",
        amount: "$172M",
        year: "2023",
        detail:
          "Cigna paid $172M to settle False Claims Act allegations that it submitted fraudulent and inaccurate diagnosis codes to Medicare to inflate government payments. A federal whistleblower alleged Cigna ordered doctors to add new diagnoses during in-home visits — then submitted those codes to CMS without verifying them — in a deliberate scheme to capture higher risk-adjustment payments.",
        source: "DOJ / HHS-OIG",
      },
      {
        title: "Automated Claim Denials Without Review",
        amount: "Class action pending",
        year: "2023-present",
        detail:
          "A ProPublica investigation found Cigna doctors were rejecting claims in bulk using an automated system — spending an average of 1.2 seconds per claim denial — without reviewing patient records. Some doctors denied over 300 claims per day. Patients were left without coverage for treatments their doctors prescribed.",
        source: "ProPublica Investigation / Class Action Suits",
      },
    ],
  },
  {
    name: "Verizon",
    ticker: "VZ",
    industry: "Telecom",
    totalFines: "$48.25M",
    fineRaw: 0.04825,
    categories: ["privacy"],
    violations: [
      {
        title: "'Supercookie' Tracking Without Consent",
        amount: "$1.35M",
        year: "2016",
        detail:
          "Verizon inserted hidden tracking identifiers called 'supercookies' into customers' web traffic starting in 2012, allowing Verizon and ad partners to build profiles of users' browsing habits. Unlike normal cookies, these couldn't be deleted by the customer. Verizon didn't disclose the practice until 2014, two years after it started, and didn't update its privacy policy until 2015.",
        source: "FCC",
      },
      {
        title: "Failure to Protect Location Data, Enabling Unauthorized Tracking",
        amount: "$46.9M",
        year: "2024",
        detail:
          "Verizon sold access to customers' real-time device-location data to third-party aggregators. One of those aggregators, Securus Technologies, let law enforcement access customer location data without proper consent or a warrant. Verizon kept the broader location-data-sharing program running for months after the breach became public. The FCC calculated the penalty as 63 separate continuing violations and added a 50% penalty increase for egregious conduct.",
        source: "FCC / 2nd Circuit Court of Appeals",
      },
    ],
  },
  {
    name: "Clearview AI",
    ticker: "Private",
    industry: "Facial Recognition Tech",
    totalFines: "$51.75M",
    fineRaw: 0.05175,
    categories: ["privacy"],
    violations: [
      {
        title: "Mass Biometric Scraping Without Consent",
        amount: "$51.75M",
        year: "2024",
        detail:
          "Clearview AI scraped billions of facial photographs from social media and other public websites without consent, built a searchable biometric database, and sold access to roughly 2,200 entities including law enforcement agencies and private companies. The settlement is structurally unusual: rather than cash, Clearview is paying out a 23% equity stake in the company, since it didn't have the cash to cover a normal settlement. Twenty-two state attorneys general objected to letting a company settle a privacy violation with ownership in the very business built on that violation.",
        source: "N.D. Illinois Federal Court / Multistate AG Coalition",
      },
    ],
  },
  {
    name: "Twitter / X",
    ticker: "Private",
    industry: "Social Media",
    totalFines: "$150M",
    fineRaw: 0.15,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Security Data for Ad Targeting",
        amount: "$150M",
        year: "2022",
        detail:
          "Twitter told over 140 million users it was collecting their phone numbers and email addresses to secure their accounts, things like two-factor authentication. It then quietly used that same data to sell targeted advertising, without telling users that's what the data would also be used for. This was the second time Twitter had broken a privacy promise to the FTC, having already settled a similar case in 2011. The new order extended federal oversight of Twitter's data practices through 2042. In 2026, under new ownership as X, the company petitioned the FTC to set aside the order, arguing the employees responsible no longer work there.",
        source: "DOJ / FTC",
      },
    ],
  },
  {
    name: "TikTok / ByteDance",
    ticker: "Private",
    industry: "Social Media",
    totalFines: "$5.7M+ (ongoing case)",
    fineRaw: 0.0057,
    categories: ["privacy"],
    violations: [
      {
        title: "Illegal Collection of Children's Data",
        amount: "$5.7M",
        year: "2019",
        detail:
          "TikTok's predecessor, Musical.ly, paid what was then the largest civil penalty ever obtained in a children's privacy case for collecting personal information from kids under 13 without parental consent, a violation of COPPA. The company was placed under a court order requiring specific compliance measures.",
        source: "FTC",
      },
      {
        title: "Continued Violations Despite Court Order",
        amount: "Pending",
        year: "2024-present",
        detail:
          "Despite the 2019 order, the FTC found reason to believe TikTok continued knowingly allowing children under 13 to create accounts and share videos and messages with adults. The DOJ filed suit in 2024 seeking civil penalties of up to $51,744 per violation, per day, a figure that could run into the billions given TikTok's scale.",
        source: "DOJ / FTC",
      },
    ],
  },
  {
    name: "Zoom Video Communications",
    ticker: "ZM",
    industry: "Video Conferencing",
    totalFines: "No fine — compliance order",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Falsely Claiming End-to-End Encryption",
        amount: "No fine",
        year: "2021",
        detail:
          "Zoom told users their meetings were protected by 'end-to-end, 256-bit encryption' when in reality Zoom itself held the cryptographic keys that could let it access meeting content, and the actual encryption level was weaker than advertised. This happened during 2020, while hundreds of millions of people were suddenly relying on Zoom for work, school, therapy, and medical appointments under the belief their conversations were private. Zoom also secretly installed a web server on Mac users' computers in 2018 that bypassed a browser security feature and remained even after Zoom was uninstalled. The settlement included no financial penalty, only a mandated security program and a ban on future misrepresentations.",
        source: "FTC",
      },
    ],
  },
  {
    name: "Epic Games",
    ticker: "Private",
    industry: "Video Games (Fortnite)",
    totalFines: "$520M",
    fineRaw: 0.52,
    categories: ["privacy"],
    violations: [
      {
        title: "Children's Privacy Violations at Massive Scale",
        amount: "$275M",
        year: "2022",
        detail:
          "Fortnite had over 400 million users, many of them minors, yet for years Epic collected children's personal data without parental consent and defaulted to public, on-by-default voice and text chat that matched kids and teens with strangers. This was the largest penalty ever obtained for violating an FTC rule.",
        source: "FTC / DOJ",
      },
      {
        title: "Dark Patterns Tricking Players Into Unwanted Purchases",
        amount: "$245M",
        year: "2022",
        detail:
          "Epic used deliberately confusing button placement and design tricks to cause unintended in-game purchases, then made it difficult for players to find cancellation or refund options. The company ignored more than one million consumer complaints about unauthorized charges, and employees internally flagged the issue repeatedly before the FTC stepped in. This remains the FTC's largest gaming-related refund order in history.",
        source: "FTC",
      },
    ],
  },
  {
    name: "BetterHelp",
    ticker: "Private (Teladoc subsidiary)",
    industry: "Online Mental Health",
    totalFines: "$7.8M",
    fineRaw: 0.0078,
    categories: ["health", "privacy"],
    violations: [
      {
        title: "Selling Therapy Seekers' Mental Health Data to Advertisers",
        amount: "$7.8M",
        year: "2023",
        detail:
          "BetterHelp told users seeking therapy, including a dedicated track for LGBTQ users, that information from their intake questionnaire, covering things like depression, suicidal thoughts, and medications, would stay private between them and their counselor. Instead, BetterHelp sent the email addresses and health questionnaire data of millions of users to Facebook, Snapchat, Pinterest, and Criteo for ad targeting between 2017 and 2020, generating tens of millions of dollars in new customer revenue. This was the FTC's first-ever order requiring direct refunds to consumers over compromised health data.",
        source: "FTC",
      },
    ],
  },
  {
    name: "GoodRx",
    ticker: "GDRX",
    industry: "Prescription Discounts / Telehealth",
    totalFines: "$1.5M",
    fineRaw: 0.0015,
    categories: ["health", "privacy"],
    violations: [
      {
        title: "Sharing Prescription and Health Data With Facebook and Google",
        amount: "$1.5M",
        year: "2023",
        detail:
          "GoodRx promised users it would limit sharing of their personal health information, then disclosed users' specific prescription medications, health conditions, and contact information to Facebook, Google, and Criteo for advertising purposes. This was the first enforcement action ever brought under the FTC's Health Breach Notification Rule, since GoodRx isn't bound by HIPAA as a non-covered entity, a regulatory gap the FTC explicitly used this case to close.",
        source: "DOJ / FTC",
      },
    ],
  },
  {
    name: "Avast",
    ticker: "Private (Gen Digital)",
    industry: "Antivirus Software",
    totalFines: "$16.5M",
    fineRaw: 0.0165,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Browsing Data After Promising to Block Tracking",
        amount: "$16.5M",
        year: "2024",
        detail:
          "Avast marketed its antivirus software and browser extensions as privacy protection that would block third-party tracking. Instead, the company collected over 8 petabytes of detailed browsing history, including users' searches, visited pages, and inferred religious beliefs, health concerns, political leanings, and financial status, then sold it through its subsidiary Jumpshot to more than 100 third parties including ad agencies and data brokers. Despite claiming the data was anonymized, some contracts let buyers re-identify specific users and connect their browsing history to other personal data they already held.",
        source: "FTC",
      },
    ],
  },
  {
    name: "Kochava",
    ticker: "Private",
    industry: "Location Data Broker",
    totalFines: "No fine — injunctive relief",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Location Data That Tracked Visits to Abortion Clinics and Shelters",
        amount: "No fine",
        year: "2026",
        detail:
          "Kochava's tracking code, embedded in over 10,000 apps, collected precise GPS-level location data on hundreds of millions of phones and sold it with minimal restriction, at one point making a sample of over 61 million devices available to anyone with a basic AWS account. The FTC demonstrated that the data could be used to trace a specific phone from a reproductive health clinic to a private residence, or identify someone's stay at a domestic violence shelter or addiction recovery center. The case arrived months after Roe v. Wade was overturned, amid concerns that commercially available location data could be used to prosecute abortion-related activity in states that had banned it. The settlement bans Kochava from selling sensitive location data without affirmative consent.",
        source: "FTC / U.S. District Court, District of Idaho",
      },
    ],
  },
  {
    name: "Equifax",
    ticker: "EFX",
    industry: "Credit Reporting",
    totalFines: "$700M",
    fineRaw: 0.7,
    categories: ["privacy", "financial"],
    violations: [
      {
        title: "Largest Data Breach in US History at the Time",
        amount: "$700M",
        year: "2019",
        detail:
          "A security flaw in a web application tool let hackers steal the personal data of roughly 147 million Americans, nearly half the country, including Social Security numbers, birth dates, addresses, and driver's license numbers. Equifax knew about the underlying security flaw for two months before hackers exploited it. The company didn't publicly disclose the breach until three months after discovering it, during which time three executives sold company stock. As a credit bureau, Equifax's entire business model is collecting and monetizing Americans' financial data, without most of those people ever choosing to become its customers.",
        source: "FTC / CFPB / 48 State AGs",
      },
    ],
  },
  {
    name: "Amazon (Ring & Alexa)",
    ticker: "AMZN",
    industry: "E-Commerce / Smart Home Tech",
    totalFines: "$30.8M",
    fineRaw: 0.0308,
    categories: ["privacy"],
    violations: [
      {
        title: "Illegally Retaining Children's Voice Recordings",
        amount: "$25M",
        year: "2023",
        detail:
          "Amazon promised parents they could delete their children's Alexa voice recordings, then kept the audio, written transcripts, and geolocation data indefinitely, sometimes ignoring deletion requests entirely and retaining the data 'for its own potential use.' Because children's speech patterns differ from adults', the FTC found Amazon used the illegally retained recordings to train Alexa's algorithm to better understand children, turning a privacy violation into a direct commercial advantage. Amazon was barred from using improperly retained data to train its models going forward.",
        source: "FTC / DOJ",
      },
      {
        title: "Ring Employees Spied on Customers in Bedrooms and Bathrooms",
        amount: "$5.8M",
        year: "2023",
        detail:
          "Despite marketing Ring's home security cameras around the promise of protection, the company gave every employee and hundreds of Ukraine-based contractors unrestricted access to every customer's video feed, with no logging or oversight of who viewed what. One employee spent months in 2017 viewing thousands of recordings from at least 81 female users, specifically targeting cameras placed in bedrooms and bathrooms. A coworker's initial misconduct report was ignored until a supervisor separately noticed the employee was only watching videos of 'pretty girls.' Ring's lax security also let outside hackers hijack customer accounts and cameras.",
        source: "FTC",
      },
    ],
  },
  {
    name: "Oracle",
    ticker: "ORCL",
    industry: "Enterprise Software / Data Broker",
    totalFines: "$115M",
    fineRaw: 0.115,
    categories: ["privacy"],
    violations: [
      {
        title: "Secret Surveillance Network Tracking 5 Billion People",
        amount: "$115M",
        year: "2024",
        detail:
          "While best known as an enterprise database company, Oracle quietly built one of the largest data brokerages on Earth, compiling detailed digital dossiers on an estimated 5 billion people worldwide, including roughly 300 million Americans, or about 80% of the US population. Using cookies, device identifiers, tracking pixels, and its BlueKai and AddThis subsidiaries, Oracle combined online browsing behavior with real-world purchase and location data to build identity profiles that advertisers could target down to the specific store aisle a person was standing in. The lawsuit alleged this amounted to deliberate, purposeful surveillance of the general population conducted largely without consent. Oracle shut down its ad-tech business and agreed to stop several of the specific tracking practices as part of the settlement.",
        source: "N.D. California Federal Court / Class Action",
      },
    ],
  },
  {
    name: "Grindr",
    ticker: "GRND",
    industry: "Dating App",
    totalFines: "$20M+ (US) / $11.7M (Norway)",
    fineRaw: 0.032,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling HIV Status and Sexual Orientation to Advertisers",
        amount: "$20M",
        year: "2026",
        detail:
          "Grindr shared users' precise location, HIV status, and sexual orientation with ad-tech companies without meaningful consent, data sensitive enough that its exposure has led directly to people being outed. In one documented case, a religious advocacy group purchased a user's Grindr data for years and passed it to a publication that used it to out him publicly, causing severe reputational harm. Norway's data protection authority separately fined Grindr $11.7 million for the same underlying practice, finding it let advertisers effectively label users as LGBTQ+ without their knowledge. The FTC settlement requires Grindr to obtain affirmative consent before sharing any health or sexual orientation data going forward.",
        source: "FTC / Norway Data Protection Authority",
      },
    ],
  },
  {
    name: "Flo Health",
    ticker: "Private",
    industry: "Period & Fertility Tracking App",
    totalFines: "Settlement (undisclosed) + FTC order",
    fineRaw: 0,
    categories: ["privacy", "health"],
    violations: [
      {
        title: "Sharing Period and Pregnancy Data With Facebook and Google",
        amount: "No fine — compliance order",
        year: "2021",
        detail:
          "Flo promised over 100 million users it would keep their menstrual cycle, symptom, and pregnancy intention data private, using that promise as a core selling point for an app built around some of the most intimate health information a person can share. Instead, Flo told Facebook's and Google's analytics divisions exactly when a user was on their period or had indicated an intention to get pregnant. The app only stopped after a Wall Street Journal investigation and resulting press coverage forced its hand, not proactively. A subsequent class action against Flo, Google, and Meta over the same conduct settled directly with users.",
        source: "FTC / Class Action (N.D. California)",
      },
    ],
  },
  {
    name: "LexisNexis Risk Solutions",
    ticker: "Private (RELX subsidiary)",
    industry: "Data Broker / Background Checks",
    totalFines: "$13.5M+",
    fineRaw: 0.0135,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Americans' Personal Data to ICE and Debt Collectors",
        amount: "$13.5M",
        year: "2010-present",
        detail:
          "LexisNexis compiles a database on over 200 million Americans, called Accurint, built from everyday consumer interactions like setting up a utility account or taking out a car loan, then sells access to that database to third parties including federal immigration authorities and debt collectors. A 2022 lawsuit from immigration advocacy groups alleged the company's data directly enabled ICE enforcement actions against immigrants, calling it a grave threat to civil liberties. Separately, LexisNexis settled a class action for $13.5 million after selling Accurint reports to debt collectors while claiming the reports weren't subject to federal consumer protection law, a legal workaround that let it skip disclosures normally required when selling data used to make decisions about people's lives. The company disclosed a further breach in December 2024 affecting over 364,000 people, exposing Social Security numbers and driver's license data.",
        source: "D.N.J. Federal Court / Cook County Lawsuit / Company Disclosures",
      },
    ],
  },
  {
    name: "Vizio",
    ticker: "Private (acquired by Walmart)",
    industry: "Smart TV Manufacturer",
    totalFines: "$19.2M",
    fineRaw: 0.0192,
    categories: ["privacy"],
    violations: [
      {
        title: "Secretly Tracking What 11 Million Households Watched",
        amount: "$2.2M",
        year: "2017",
        detail:
          "Vizio built software into its smart TVs that captured second-by-second data on everything displayed on screen, including cable, DVD, streaming, and over-the-air broadcasts, then appended household demographic details like income, marital status, and education level before selling the combined profiles to advertisers. The company marketed the feature as 'Smart Interactivity' that enabled 'program offers and suggestions,' never disclosing that it also secretly tracked viewing habits. Vizio even remotely installed the tracking software onto TVs that didn't originally have it at the time of purchase. A related class action added another $17 million in consumer payouts.",
        source: "FTC / New Jersey AG / Class Action",
      },
    ],
  },
  {
    name: "Marriott International",
    ticker: "MAR",
    industry: "Hotels / Hospitality",
    totalFines: "$76M+",
    fineRaw: 0.076,
    categories: ["privacy"],
    violations: [
      {
        title: "Three Data Breaches Exposing 344 Million Guests Worldwide",
        amount: "$52M",
        year: "2024",
        detail:
          "Marriott acquired Starwood Hotels in 2016 without ever detecting that intruders had already been living inside Starwood's reservation database since 2014. The breach went unnoticed for four more years, ultimately exposing 339 million guest records worldwide, including 5.25 million unencrypted passport numbers. A second, separate breach hit Marriott's own network from 2018 to 2020, exposing another 5.2 million guest records. Regulators found a clear pattern: Marriott's security failures weren't a single incident but a repeated failure to protect guest data across multiple systems and years. The UK's data regulator separately fined Marriott $24 million for the same underlying breach affecting seven million UK residents.",
        source: "FTC / 49 State AGs / UK ICO",
      },
    ],
  },
  {
    name: "Rite Aid",
    ticker: "Private (post-bankruptcy)",
    industry: "Pharmacy Retail",
    totalFines: "No fine — 5-year technology ban",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Facial Recognition Falsely Accused Shoppers of Shoplifting, Disproportionately Targeting People of Color",
        amount: "No fine",
        year: "2023",
        detail:
          "For nearly a decade, Rite Aid used AI facial recognition built from a database of low-quality images, pulled from security cameras, employee phones, and even news stories, to flag customers as 'likely' shoplifters without ever telling them the technology existed, and actively discouraged employees from disclosing it. The system generated thousands of false positives, and the FTC found those false matches were significantly more common in stores located in neighborhoods with large Black and Asian populations than in predominantly white ones. Acting on false alerts, employees followed shoppers around stores, searched them, publicly accused them of crimes in front of family and coworkers, and called police to remove them, sometimes flagging the same misidentified person as a repeat offender at stores thousands of miles apart.",
        source: "FTC",
      },
    ],
  },
  {
    name: "Life360",
    ticker: "LIF (ASX)",
    industry: "Family Location-Tracking App",
    totalFines: "Litigation ongoing",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Children's and Families' Precise Locations to Data Brokers",
        amount: "No fine — litigation pending",
        year: "2021-present",
        detail:
          "Life360 markets itself as a family safety app that gives parents peace of mind by tracking their kids' whereabouts, used by over 33 million people worldwide. A 2021 investigation found the company was quietly one of the largest suppliers to the entire location-data-broker industry, selling precise GPS coordinates on millions of users, many of them minors, to roughly a dozen data brokers who then resold the data to virtually anyone willing to pay. Unlike apps that leak data through detectable third-party code, Life360 routed the data through its own servers, making the transfer invisible to the privacy researchers and app-store reviewers who normally catch this kind of practice. A later investigation found Life360 continued selling location-based advertising 'segments,' like which specific businesses a user visited, through a separate data marketplace years after publicly promising to scale back.",
        source: "The Markup Investigation / Class Action (Florida)",
      },
    ],
  },
  {
    name: "Sephora",
    ticker: "Private (LVMH subsidiary)",
    industry: "Beauty Retail",
    totalFines: "$1.2M",
    fineRaw: 0.0012,
    categories: ["privacy"],
    violations: [
      {
        title: "First-Ever CCPA Enforcement Case for Ignoring Do-Not-Sell Requests",
        amount: "$1.2M",
        year: "2022",
        detail:
          "Sephora installed tracking software from third-party companies on its website and app that shared customers' shopping activity and precise identity in exchange for free or discounted analytics services, a practice California's attorney general classified as a 'sale' of personal data under the state's new privacy law. When customers used their browser's Global Privacy Control signal, an industry-standard tool that broadcasts 'do not sell my data' automatically, Sephora didn't honor it. This became the first enforcement action ever brought under the California Consumer Privacy Act, and the case was explicitly framed by regulators as a warning shot to the broader retail industry about ignoring consumer opt-out signals.",
        source: "California Attorney General",
      },
    ],
  },
];

function categoryColor(catId) {
  const c = CATEGORIES.find((c) => c.id === catId);
  return c ? c.color : "#999";
}
function categoryLabel(catId) {
  const c = CATEGORIES.find((c) => c.id === catId);
  return c ? c.label : catId;
}

let activeCategory = "all";
let sortBy = "fines";
let searchTerm = "";
const openCards = new Set();

function getFiltered() {
  let list = [...COMPANIES];
  if (activeCategory !== "all") {
    list = list.filter((c) => c.categories.includes(activeCategory));
  }
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
  }
  if (sortBy === "fines") {
    list.sort((a, b) => b.fineRaw - a.fineRaw);
  } else if (sortBy === "az") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

function renderFilters() {
  const row = document.getElementById("filter-row");
  row.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-pill" + (activeCategory === cat.id ? " active" : "");
    btn.textContent = cat.label;
    btn.style.color = activeCategory === cat.id ? cat.color : "";
    btn.style.borderColor = activeCategory === cat.id ? cat.color : "";
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderFilters();
      renderCards();
    });
    row.appendChild(btn);
  });
}

function renderCards() {
  const list = getFiltered();
  const container = document.getElementById("card-list");
  container.innerHTML = "";
  document.getElementById("result-count").textContent =
    list.length + (list.length === 1 ? " result" : " results");

  list.forEach((company) => {
    const card = document.createElement("div");
    card.className = "company-card";

    const header = document.createElement("div");
    header.className = "card-header";

    const nameBlock = document.createElement("div");
    nameBlock.className = "card-name-block";
    nameBlock.innerHTML = `
      <div class="card-name">${company.name}</div>
      <div class="card-meta">${company.ticker} &middot; ${company.industry}</div>
    `;

    const badges = document.createElement("div");
    badges.className = "card-badges";
    company.categories.forEach((cat) => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = categoryLabel(cat);
      b.style.color = categoryColor(cat);
      b.style.borderColor = categoryColor(cat) + "55";
      b.style.background = categoryColor(cat) + "11";
      badges.appendChild(b);
    });

    const fines = document.createElement("div");
    fines.className = "card-fines";
    fines.innerHTML = `
      <div class="amt">${company.totalFines}</div>
      <div class="lbl">total fines</div>
    `;

    const arrow = document.createElement("div");
    arrow.className = "card-arrow" + (openCards.has(company.name) ? " open" : "");
    arrow.innerHTML = "&#9660;";

    header.appendChild(nameBlock);
    header.appendChild(badges);
    header.appendChild(fines);
    header.appendChild(arrow);

    const body = document.createElement("div");
    body.className = "card-body" + (openCards.has(company.name) ? " open" : "");
    company.violations.forEach((v) => {
      const vDiv = document.createElement("div");
      vDiv.className = "violation";
      vDiv.innerHTML = `
        <div class="violation-top">
          <div class="violation-title">${v.title}</div>
          <div class="violation-amt-year">
            <span class="violation-amt">${v.amount}</span>
            <span class="violation-year">${v.year}</span>
          </div>
        </div>
        <div class="violation-detail">${v.detail}</div>
        <div class="violation-source">SOURCE: ${v.source}</div>
      `;
      body.appendChild(vDiv);
    });

    header.addEventListener("click", () => {
      if (openCards.has(company.name)) {
        openCards.delete(company.name);
      } else {
        openCards.add(company.name);
      }
      arrow.classList.toggle("open");
      body.classList.toggle("open");
    });

    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

document.getElementById("search-input").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderCards();
});

document.querySelectorAll(".sort-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    sortBy = btn.dataset.sort;
    document.querySelectorAll(".sort-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards();
  });
});

document.getElementById("stat-companies").textContent = COMPANIES.length;
const totalFinesSum = COMPANIES.reduce((sum, c) => sum + c.fineRaw, 0);
document.getElementById("stat-total-fines").textContent = "$" + Math.round(totalFinesSum) + "B+";

renderFilters();
renderCards();