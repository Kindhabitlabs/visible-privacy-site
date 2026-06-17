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

renderFilters();
renderCards();