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
    totalFines: "$1.5B+",
    fineRaw: 1.5,
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
      {
        title: "Deceiving Its Own Delivery Drivers About Pay and Tips",
        amount: "$100M",
        year: "2026",
        detail:
          "Walmart agreed to a $100 million judgment with the FTC and a coalition of states in February 2026 over its Spark Driver program, which uses independent contractors to make deliveries. Regulators alleged Walmart misled nearly one million drivers who completed more than 272 million deliveries about how much they would earn, including advertising tip amounts it had not preauthorized and failing to tell drivers when those advertised tips did not materialize.",
        source: "FTC / State AGs",
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
    totalFines: "$11.4B+",
    fineRaw: 11.375,
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
      {
        title: "Largest State Privacy Recovery in US History",
        amount: "$1.375B",
        year: "2025",
        detail:
          "Google paid Texas $1.375 billion to settle claims that it unlawfully tracked users' geolocation after they turned tracking off, logged searches made in Incognito mode that the browser told users were private, and collected biometric face and voiceprint data from Texans without consent. It is the largest amount any state has ever recovered from Google for a privacy violation, roughly triple the $391.5M that 40 states obtained together in 2022, and it covers conduct Google continued after those earlier settlements.",
        source: "Texas Attorney General",
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
      {
        title: "Texas Lawsuit Over WhatsApp Privacy Claims",
        amount: "Litigation pending",
        year: "2026",
        detail:
          "Texas sued Meta and WhatsApp in May 2026, alleging the company misrepresented how private the messaging app actually is and collected user data in ways its own privacy promises ruled out. WhatsApp is marketed on end-to-end encryption, and the suit turns on the gap between that promise and the metadata and account information Meta still collects and uses.",
        source: "Texas Attorney General",
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
    fineRaw: 1.30225,
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
      {
        title: "Knowingly Violating the Fair Credit Reporting Act",
        amount: "$2.25M",
        year: "2026",
        detail:
          "Amazon paid $2.25 million in June 2026 to resolve FTC charges that it knowingly violated the Fair Credit Reporting Act. The FCRA governs how background and consumer reports may be obtained and used about job applicants and workers, and requires disclosure and consent before a report is pulled and notice before it is used against someone.",
        source: "FTC",
      },
    ],
  },
  {
    name: "Disney",
    ticker: "DIS",
    industry: "Entertainment / Media",
    totalFines: "$236M",
    fineRaw: 0.23575,
    categories: ["labor", "privacy"],
    violations: [
      {
        title: "Largest Wage Theft Settlement in California History",
        amount: "$233M",
        year: "2024",
        detail:
          "Disney agreed to pay $233M — the largest wage-and-hour settlement in California history — after 50,000+ Disneyland employees sued for being paid below the living wage guaranteed by a voter-approved city ordinance that Disney lobbied against.",
        source: "Anaheim Superior Court",
      },
      {
        title: "Largest CCPA Settlement to Date for Ignoring Opt-Outs",
        amount: "$2.75M",
        year: "2026",
        detail:
          "California's attorney general announced a $2.75 million settlement with Disney, the largest under the California Consumer Privacy Act, after finding the company failed to honor consumers' requests to opt out of the sale or sharing of their personal information across its devices and streaming services. Opting out on one Disney service did not stop the sharing on the others, which meant the request people made was recorded but not actually carried out.",
        source: "California Attorney General",
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
    totalFines: "NOK 65M (~$6.5M, Norway)",
    fineRaw: 0.0065,
    categories: ["privacy"],
    violations: [
      {
        title: "Disclosing Location and Sexual Orientation to Ad Partners",
        amount: "NOK 65M",
        year: "2021-2025",
        detail:
          "Norway's data protection authority issued its largest ever fine, NOK 65 million, after finding that Grindr disclosed users' GPS location, IP address, mobile advertising ID, age and gender to third parties for behavioural advertising without a valid legal basis. Critically, the regulator held that the mere fact of being a Grindr user is itself data about sexual orientation or sex life, a special category under the GDPR. Grindr's consents were found to be neither voluntary, specific nor informed. The fine covers practices from the GDPR's start until April 2020, when Grindr changed its consent mechanism, and it has been upheld through three rounds of appeals: the Privacy Appeals Board in 2023, the District Court, and Borgarting Court of Appeal on 21 October 2025.",
        source: "Norway Data Protection Authority (Datatilsynet)",
      },
      {
        title: "Regulator Complaint Over HIV Status and Sensitive Data",
        amount: "No fine — complaint pending",
        year: "2023",
        detail:
          "The Electronic Privacy Information Center asked the FTC to investigate Grindr, arguing its handling of highly sensitive data — HIV and vaccination status, sexual preference, app usage and location — is an unfair and deceptive practice under Section 5 and may violate the Health Breach Notification Rule. The complaint drew on allegations from Grindr's former chief privacy officer, Ronald De Jesus, in his June 2023 wrongful termination suit. This is a request for investigation, not a finding or a settlement; no FTC enforcement action against Grindr has been announced.",
        source: "EPIC complaint to the FTC",
      },
      {
        title: "Location Data Resold Through Brokers to Out a Named Individual",
        amount: "No fine — documented harm",
        year: "2021",
        detail:
          "The Pillar, a Catholic newsletter, bought commercially available location data from an unnamed vendor and correlated it to the phone of Monsignor Jeffrey Burrill, general secretary of the US Conference of Catholic Bishops, to assert he had used Grindr and visited gay bars between 2018 and 2020. Burrill resigned. Grindr denied being the source of the data and called the report an unethical witch hunt; privacy researchers noted the data most plausibly reached the broker chain through a third-party ad network. The episode is the clearest public demonstration of what the ad-tech pipeline around dating apps makes possible, regardless of which app the records originated in.",
        source: "The Pillar / NBC News / Slate",
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
      {
        title: "Buying Drivers' Behavior Data From GM and Selling It to Insurers",
        amount: "Litigation pending",
        year: "2019-2024",
        detail:
          "Under a data deal signed in August 2019, LexisNexis bought granular driving behavior collected by General Motors' internet-connected vehicles, including hard braking, rapid acceleration and speeding events, and turned it into risk reports it sold to auto insurers. Drivers had no practical way to know their own car was reporting on them, and many learned of it only when their premiums rose or coverage was denied. GM says it stopped sharing in April 2024, and Texas has sued GM over the arrangement. This is the same Accurint business model applied to the inside of a car.",
        source: "Texas Attorney General / Class Action (E.D. Tex.)",
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
  {
    name: "General Motors / OnStar",
    ticker: "GM",
    industry: "Automotive / Connected Vehicles",
    totalFines: "No fine — FTC ban + state suit",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Drivers' Second-by-Second Driving Data to Insurers",
        amount: "No fine — 5-year FTC ban",
        year: "2019-2024",
        detail:
          "GM collected granular driving behavior from its internet-connected vehicles, including hard braking, rapid acceleration, speeding and trip-by-trip mileage, and sold it to LexisNexis Risk Solutions and Verisk Analytics, who repackaged it into risk scores that insurers used to raise premiums or deny coverage. Drivers found out only when their rates jumped. GM enrolled customers through its OnStar Smart Driver product and, according to Texas, told buyers that certain vehicle safety features would be disabled unless they signed up — without clearly disclosing that enrollment also meant consenting to the sale of their driving data. The FTC banned GM from disclosing driver data to consumer reporting agencies for five years and required affirmative consent going forward. GM says it stopped sharing with LexisNexis and Verisk in April 2024.",
        source: "FTC Consent Order / Texas Attorney General",
      },
      {
        title: "Texas Lawsuit Over 1.8 Million Drivers",
        amount: "Litigation pending",
        year: "2024-present",
        detail:
          "Texas sued GM and OnStar under the state's Deceptive Trade Practices Act, alleging the companies unlawfully collected and sold driving data on more than 1.8 million Texas drivers without meaningful consent. The suit was the opening action of the Texas attorney general's data privacy initiative and remains pending.",
        source: "Texas Attorney General",
      },
    ],
  },
  {
    name: "LG Electronics USA",
    ticker: "Private (LG Corp, KRX: 003550)",
    industry: "Consumer Electronics / Smart TVs",
    totalFines: "No fine — injunctive settlement",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Smart TVs Fingerprinting Everything on Screen Without Consent",
        amount: "No fine — injunctive relief",
        year: "2025-2026",
        detail:
          "LG televisions ran Automated Content Recognition, a technology that captures a screenshot of the display roughly every 500 milliseconds and matches it against a catalog of known media, building a record of everything a household watches regardless of whether it came from cable, a streaming app, a game console or a DVD. Texas alleged LG did this without informed consent and monetized the resulting viewing profiles. Under the May 2026 agreement LG must stop using ACR without informed consent, ship a pop-up disclosure explaining what is collected, publish the same disclosure on its website, and give users a clear way to opt out. LG also agreed to bar transfers of viewing data to the Chinese government. The settlement is the second in a suit Texas filed in December 2025 against five television manufacturers; Samsung settled on similar terms first, and cases against Sony, Hisense and TCL remain pending.",
        source: "Texas Attorney General",
      },
    ],
  },
  {
    name: "Hims & Hers Health",
    ticker: "HIMS",
    industry: "Telehealth",
    totalFines: "Litigation pending",
    fineRaw: 0,
    categories: ["privacy", "health"],
    violations: [
      {
        title: "Sending Patients' Medical Conditions to Meta and Snap",
        amount: "Litigation pending",
        year: "2026",
        detail:
          "The FTC, joined by Utah and by California through the Los Angeles County Counsel, sued Hims & Hers in July 2026 alleging it shared consumers' sensitive health information, including the specific conditions they sought treatment for, with third-party advertising platforms including Meta and Snap. The company had marketed itself to patients as private and discreet, which is the entire premise of a telehealth service built around erectile dysfunction, hair loss, mental health and weight loss. Regulators brought the claims under Section 5 of the FTC Act.",
        source: "FTC / Utah AG / LA County Counsel",
      },
      {
        title: "Subscription Traps and Early Refill Charges",
        amount: "Litigation pending",
        year: "2026",
        detail:
          "The same complaint alleges Hims advertised monthly or quarterly refill schedules but processed the charges roughly ten days earlier than customers would reasonably expect, then required cancellation two days before that early date, and made cancelling unreasonably difficult. The FTC charged the conduct under the Restore Online Shoppers' Confidence Act.",
        source: "FTC / Federal Court",
      },
    ],
  },
  {
    name: "Match Group / OkCupid",
    ticker: "MTCH",
    industry: "Dating Apps",
    totalFines: "$14M+",
    fineRaw: 0.014,
    categories: ["privacy", "financial"],
    violations: [
      {
        title: "Handing Millions of Dating Profiles to an Unauthorized Third Party",
        amount: "No fine — FTC order",
        year: "2026",
        detail:
          "The FTC found that OkCupid gave nearly three million user photos, plus location and other data, to a company that was not a service provider, business partner or affiliate — the categories its own privacy policy named — and never told users or offered them a chance to opt out. Per the complaint, the recipient had no business relationship with OkCupid at all; it asked for the datasets because OkCupid's founders were financial investors in it, and no contractual restrictions were placed on how the data could be used. The FTC further alleged that since September 2014 Match and OkCupid took extensive steps to conceal the sharing, including obstructing the FTC's investigation and publicly denying any involvement with the recipient after a news story exposed it. The agency had to enforce its Civil Investigative Demand in federal court to get the records. The March 30, 2026 stipulated order permanently bars both companies from misrepresenting their data practices, but carries no monetary penalty. Press reporting identified the recipient as the AI firm Clarifai. Dating profiles are among the most sensitive data any company holds, and Match Group also operates Tinder, Hinge, Match.com and Plenty of Fish, which concentrates that data under a single corporate roof.",
        source: "FTC / N.D. Tex., Dallas Division",
      },
      {
        title: "Fake Match Notifications and a Cancellation Maze",
        amount: "$14M",
        year: "2025",
        detail:
          "Match.com agreed to a $14 million stipulated order in August 2025 resolving long-running FTC claims that it used misleading advertisements, including messages implying that another user was trying to contact the subscriber when the sender was in fact an account the company had already flagged as likely fraudulent, and that it made cancelling a subscription deliberately difficult.",
        source: "FTC / N.D. Tex.",
      },
      {
        title: "Registered Sex Offenders Left Unscreened on the Free Apps",
        amount: "No fine — investigation",
        year: "2019-2020",
        detail:
          "A 16-month investigation by Columbia Journalism Investigations, ProPublica and BuzzFeed News, which analysed more than 150 incidents of sexual assault involving dating apps drawn from a decade of news reports, civil suits and criminal records, found that Match Group checked users against state sex-offender registries only on its paid platforms. Its free products — Tinder, OkCupid and Plenty of Fish among them — were left unscreened, and the company acknowledged that registered sex offenders use them. The chair of a House Oversight subcommittee, Rep. Raja Krishnamoorthi, opened an inquiry into underage users, the sale and dissemination of users' personal information, and the presence of registered sex offenders on free dating sites.",
        source: "Columbia Journalism Investigations / ProPublica / House Oversight",
      },
    ],
  },
  {
    name: "RentGrow",
    ticker: "Private (Yardi Systems subsidiary)",
    industry: "Tenant Screening",
    totalFines: "$2.25M",
    fineRaw: 0.00225,
    categories: ["privacy", "financial"],
    violations: [
      {
        title: "Bad Tenant Screening Reports Used to Deny People Housing",
        amount: "$2.25M",
        year: "2026",
        detail:
          "RentGrow sells tenant screening reports that landlords use to decide who gets an apartment. The FTC alleged in July 2026 that the company failed to take reasonable steps to ensure those reports were accurate, producing records that wrongly attributed evictions, criminal history and debts to applicants, and that it failed to meet the Fair Credit Reporting Act obligations that let people see and dispute what is being said about them. Because tenant screening decisions happen fast and applicants rarely learn why they were rejected, errors in this industry often go uncorrected while the person loses housing.",
        source: "FTC / Federal Court",
      },
    ],
  },
  {
    name: "Gravy Analytics / Venntel",
    ticker: "Private",
    industry: "Location Data Broker",
    totalFines: "No fine — FTC order",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Selling Visits to Clinics, Churches, Shelters and Military Bases",
        amount: "No fine — injunctive order",
        year: "2024-2025",
        detail:
          "Gravy Analytics and its subsidiary Venntel bought precise smartphone location data from other suppliers and packaged it for sale to private companies and to government agencies. The FTC alleged Gravy purchased from suppliers that gave vague confirmation or none at all that the people being tracked had ever consented, and that the resulting data was precise enough to identify individual visits to medical facilities, religious institutions, domestic violence shelters and military installations. The final order, issued January 2025, bars the companies from selling sensitive location data, restricts national security and law enforcement disclosures, and requires them to build and maintain a list of sensitive locations to be excluded.",
        source: "FTC Final Order",
      },
    ],
  },
  {
    name: "Mobilewalla",
    ticker: "Private",
    industry: "Adtech / Data Broker",
    totalFines: "No fine — FTC order",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Harvesting Location Data Out of Ad Auctions It Was Not Buying",
        amount: "No fine — injunctive order",
        year: "2024-2025",
        detail:
          "Mobilewalla collected consumers' mobile advertising identifiers and precise geolocation from real-time bidding exchanges, the millisecond auctions that decide which ad loads on a phone. The mechanism matters: bid requests broadcast a user's location and device ID to every potential bidder, and the FTC alleged Mobilewalla retained and resold that data from auctions it did not win, meaning the data was taken from a process the user never knew was happening and that the app itself did not authorize. The January 2025 final order bars the sale of sensitive location data and requires deletion of data collected this way.",
        source: "FTC Final Order",
      },
    ],
  },
  {
    name: "Tractor Supply Company",
    ticker: "TSCO",
    industry: "Rural Lifestyle Retail",
    totalFines: "$1.35M",
    fineRaw: 0.00135,
    categories: ["privacy"],
    violations: [
      {
        title: "Largest California Privacy Agency Fine to Date",
        amount: "$1.35M",
        year: "2025",
        detail:
          "The California Privacy Protection Agency fined Tractor Supply $1.35 million in September 2025, its largest administrative penalty ever, after finding the retailer failed to tell consumers and job applicants what data it collected and what rights they had, failed to put required contracts in place with the service providers it handed data to, and failed to provide opt-out mechanisms that actually worked. The investigation began with a complaint from a single consumer, which the agency has since cited as proof that one person's report can trigger a full enforcement action.",
        source: "California Privacy Protection Agency",
      },
    ],
  },
  {
    name: "PlayOn Sports / GoFan",
    ticker: "Private",
    industry: "Youth Sports Media / Ticketing",
    totalFines: "$1.1M",
    fineRaw: 0.0011,
    categories: ["privacy"],
    violations: [
      {
        title: "Making High School Students Accept Tracking to Open Their Own Tickets",
        amount: "$1.1M",
        year: "2026",
        detail:
          "GoFan, PlayOn's digital ticketing platform used by roughly 1,400 California schools, required students to agree to tracking before they could access tickets they had already purchased, then fed that student data into targeted advertising. The California Privacy Protection Agency found in March 2026 that conditioning access to an already-bought ticket on consent was an illegal dark pattern that coerced agreement rather than obtaining it, and ordered PlayOn to pay $1.1 million and change the practice. The people affected were minors attending school events.",
        source: "California Privacy Protection Agency",
      },
    ],
  },
  {
    name: "Norfolk Southern",
    ticker: "NSC",
    industry: "Rail Freight",
    totalFines: "$910M+",
    fineRaw: 0.91,
    categories: ["environmental", "health"],
    violations: [
      {
        title: "East Palestine Derailment and Vinyl Chloride Burn",
        amount: "$310M+",
        year: "2023-2024",
        detail:
          "A Norfolk Southern train carrying hazardous materials derailed in East Palestine, Ohio in February 2023. Responders then conducted a controlled burn of five tank cars of vinyl chloride, sending a plume of hydrogen chloride and phosgene over the town. The United States reached a settlement of more than $310 million in May 2024 requiring the railroad to pay a $15 million Clean Water Act civil penalty, reimburse the EPA roughly $57 million in response costs plus all subsequent costs, fund long-term medical monitoring and drinking water monitoring, and improve rail safety practices.",
        source: "DOJ / EPA Consent Decree",
      },
      {
        title: "$600M Residents' Class Settlement",
        amount: "$600M",
        year: "2024",
        detail:
          "Norfolk Southern separately agreed to a $600 million class settlement covering residents and businesses within 20 miles of the derailment. The railroad's total disclosed cost from the incident has passed $1.7 billion. The National Transportation Safety Board later found the controlled burn was unnecessary and that Norfolk Southern had withheld information from the officials who authorized it.",
        source: "N.D. Ohio Federal Court / NTSB",
      },
    ],
  },
  {
    name: "Bayer / Monsanto",
    ticker: "BAYRY",
    industry: "Agrochemical / Pharmaceutical",
    totalFines: "$19B+",
    fineRaw: 19,
    categories: ["environmental", "health"],
    violations: [
      {
        title: "Roundup Cancer Litigation",
        amount: "$18.1B+",
        year: "2020-2026",
        detail:
          "Bayer, which bought Monsanto in 2018 for $63 billion, agreed in 2020 to pay between $10.1 billion and $10.9 billion to resolve roughly 75 percent of claims from an estimated 125,000 people who said exposure to Roundup weedkiller caused their non-Hodgkin lymphoma. In February 2026 it announced a further $7.25 billion class settlement covering current and future claims. Internal Monsanto documents surfaced in the litigation showed the company ghostwriting scientific papers and working to discredit researchers who linked glyphosate to cancer.",
        source: "N.D. Cal. Federal Court / Company Disclosures",
      },
      {
        title: "PCB Water Contamination",
        amount: "$2.65B+",
        year: "2020-present",
        detail:
          "Monsanto manufactured polychlorinated biphenyls for decades after its own studies showed they were toxic and accumulating in the environment. Bayer set aside $650 million for a PCB class settlement and has agreed to pay roughly $2 billion more to states, cities and counties whose waterways and school buildings were contaminated. PCBs were banned in the US in 1979 and still persist in sediment and in human tissue.",
        source: "State AGs / Municipal Litigation",
      },
      {
        title: "Dicamba Drift Damage",
        amount: "$400M",
        year: "2020",
        detail:
          "Bayer paid $400 million to settle claims from farmers whose crops were destroyed when dicamba herbicide drifted off neighboring fields, a known volatility problem with a product marketed for widespread use.",
        source: "Federal Multidistrict Litigation",
      },
    ],
  },
  {
    name: "Live Nation / Ticketmaster",
    ticker: "LYV",
    industry: "Live Entertainment / Ticketing",
    totalFines: "$280M+",
    fineRaw: 0.28,
    categories: ["antitrust", "financial"],
    violations: [
      {
        title: "Monopoly Over Live Music, Settled With DOJ",
        amount: "$280M",
        year: "2024-2026",
        detail:
          "The DOJ and a coalition of states sued to break up Live Nation, alleging it used its control of concert promotion, artist management and the venues themselves to force artists and venues into using Ticketmaster. Live Nation settled in March 2026 without admitting wrongdoing, agreeing to open its amphitheaters to all promoters, let promoters control distribution of up to half the tickets, cap ticketing service fees at 15 percent, divest 13 exclusive amphitheater booking agreements, and extend its 2020 modified consent decree by eight years. It created a $280 million fund for the states' damages claims.",
        source: "DOJ Antitrust Division / State AGs",
      },
      {
        title: "Working With Scalpers and Hiding the Real Price",
        amount: "Litigation pending",
        year: "2025-present",
        detail:
          "The FTC and seven states sued Live Nation and Ticketmaster in September 2025 under the Better Online Ticket Sales Act and Section 5 of the FTC Act, alleging the company knowingly allowed brokers to use bots to sweep up tickets far beyond posted purchase limits, then earned fees again when those tickets were resold at markups on its own resale platform, while advertising prices that concealed mandatory fees until checkout.",
        source: "FTC / 7 State AGs",
      },
    ],
  },
  {
    name: "Samsung Electronics America",
    ticker: "Private (Samsung Electronics, KRX: 005930)",
    industry: "Consumer Electronics / Smart TVs",
    totalFines: "No fine — injunctive settlement",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Screenshotting the Television Twice a Second",
        amount: "No fine — injunctive relief",
        year: "2025-2026",
        detail:
          "Texas alleged that Samsung smart TVs ran Automated Content Recognition that captured a screenshot of whatever was on screen roughly every 500 milliseconds, matched it against a media catalog to identify what the household was watching, and fed the resulting viewing profile to advertisers, all without informed consent. Samsung settled in February 2026, the first of five manufacturers named in the December 2025 suit to do so, agreeing to stop collecting ACR data from Texans without explicit informed consent and to rewrite its on-screen privacy prompts so the choice is presented clearly rather than buried in setup. LG settled on similar terms in May 2026; Sony, Hisense and TCL remain in litigation.",
        source: "Texas Attorney General",
      },
    ],
  },
  {
    name: "Illuminate Education",
    ticker: "Private",
    industry: "Education Technology",
    totalFines: "No fine — FTC order",
    fineRaw: 0,
    categories: ["privacy"],
    violations: [
      {
        title: "Breach Exposing 10 Million Students, Notified Up to Two Years Late",
        amount: "No fine — injunctive order",
        year: "2021-2026",
        detail:
          "A hacker used a former employee's credentials to get into Illuminate's cloud environment in December 2021, exposing personal information on more than 10 million students. The FTC alleged the company stored student data in plain text until at least January 2022, ignored a third-party vendor's warnings about its vulnerabilities, and lacked basic access controls, threat detection and patch management. It then delayed telling its customers: school districts covering more than 380,000 students were not notified until nearly two years after the breach. The final order, approved June 5 2026, requires a security program, limits on what Illuminate may collect and keep, deletion of unnecessary data, and a publicly posted retention schedule. The people whose records leaked were schoolchildren who never chose this vendor.",
        source: "FTC Final Order",
      },
    ],
  },
  {
    name: "American Honda Motor Co.",
    ticker: "HMC",
    industry: "Automotive / Connected Vehicles",
    totalFines: "$632.5K",
    fineRaw: 0.0006325,
    categories: ["privacy"],
    violations: [
      {
        title: "Demanding ID From People Just Trying to Opt Out",
        amount: "$632,500",
        year: "2025",
        detail:
          "The California Privacy Protection Agency's first enforcement order fined Honda $632,500 in March 2025. Honda made consumers hand over their name, full address, phone number and email before it would process a request to opt out of the sale of their data or to limit use of sensitive data. California's rules deliberately forbid that: opt-out and limitation requests are the two rights that carry no identity verification requirement, precisely so that exercising them costs nothing. Regulators also found Honda made opting out of cookie tracking harder than opting in, mishandled requests submitted by authorized agents, and could not produce the required contracts for the ad tech vendors it was sharing data with. The penalty was calculated in part at $2,500 per affected consumer. The case came out of a 2023 sweep of connected-vehicle manufacturers.",
        source: "California Privacy Protection Agency",
      },
    ],
  },
  {
    name: "Ford Motor Company",
    ticker: "F",
    industry: "Automotive / Connected Vehicles",
    totalFines: "$375.7K",
    fineRaw: 0.000375703,
    categories: ["privacy"],
    violations: [
      {
        title: "An Extra Click That Quietly Voided Opt-Out Requests",
        amount: "$375,703",
        year: "2026",
        detail:
          "Ford required consumers to confirm their email address before it would act on a request to opt out of the sale or sharing of their personal information. Anyone who did not click the confirmation link had their request expire, and Ford kept selling or sharing their data as though they had never asked. California's privacy agency fined Ford $375,703 in March 2026 for conduct between July 2023 and March 2024, finding the extra step unlawful even though it concluded Ford had not intended to impose a verification standard and the confirmation prompt appeared to be a misconfiguration. That is the point of the case: a single unnecessary step in a rights process silently nullifies the right at scale. It is the second action from the agency's connected-vehicle sweep, after Honda.",
        source: "California Privacy Protection Agency",
      },
    ],
  },
  {
    name: "Todd Snyder, Inc.",
    ticker: "Private (American Eagle Outfitters)",
    industry: "Apparel Retail",
    totalFines: "$345.2K",
    fineRaw: 0.000345178,
    categories: ["privacy"],
    violations: [
      {
        title: "A Privacy Request Portal Left Broken for 40 Days",
        amount: "$345,178",
        year: "2025",
        detail:
          "The California Privacy Protection Agency fined the menswear retailer $345,178 in May 2025. Todd Snyder had outsourced its consumer privacy request portal to a third party and then failed to oversee or configure it, leaving the mechanism broken for 40 days so that requests submitted during that window simply did not go through. The company also demanded far more information than necessary to process a request, including sensitive personal information such as photographs of government identification, and applied an unlawful verification standard to opt-out requests. The case is a reminder that outsourcing a compliance obligation does not outsource responsibility for it.",
        source: "California Privacy Protection Agency",
      },
    ],
  },
  {
    name: "Care.com",
    ticker: "Private (IAC Inc. subsidiary)",
    industry: "Caregiver Marketplace",
    totalFines: "$8.5M",
    fineRaw: 0.0085,
    categories: ["financial", "labor"],
    violations: [
      {
        title: "Inflated Job Counts, Baseless Pay Claims, and a Cancellation Maze",
        amount: "$8.5M",
        year: "2024-2025",
        detail:
          "The FTC charged that Care.com lured caregivers into paid subscriptions by advertising millions of jobs that included listings nobody could actually be hired for — a job poster who has not paid cannot even see an application — and by touting hourly and weekly earnings it had no data to support. One 2021 ad campaign promoted \"Childcare jobs from $18/hr\" while Care's own site put the national babysitting rate at $13 to $14.25. The company kept making the earnings claims after receiving an FTC Notice of Penalty Offenses about exactly that in 2021. The complaint also charged dark patterns on cancellation: unrelated links to click through, multi-page questionnaires, confusing language and warnings, with cancelling a paid subscription made materially harder than the two-step process for a free one. Care turned over $8.5 million; the FTC distributed more than $8.1 million to 194,207 consumers in June 2025.",
        source: "FTC / W.D. Tex.",
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