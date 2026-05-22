import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Section, SectionLabel } from "@/components/Section";
import { Search, ArrowRight, ArrowLeft, Sparkles, MapPin, Globe, Users, Award, ShieldCheck, ChevronRight, ChevronDown, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { WINGS } from "@/data/wings";
import { ZONE_BREAKDOWN } from "@/data/zones";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/wings")({
  head: () => ({
    meta: [
      { title: "Wings & Divisions · Tamil Nadu Vanigargalin Sangamam" },
      { name: "description", content: "Explore the specialized wings and regional constituencies of Tamil Nadu Vanigargalin Sangamam." },
    ],
  }),
  component: Wings,
});

const DEPARTMENTS = [
  {
    id: "professional",
    nameEn: "Professional Services",
    nameTa: "தொழில்முறைப் பிரிவுகள்",
    descEn: "Legal, technical, financial, and digital expert networks.",
    descTa: "சட்டம், தொழில்நுட்பம், நிதி மற்றும் டிஜிட்டல் சார்ந்த நிபுணர் கூட்டமைப்பு.",
    wings: ["women-entrepreneurs", "chartered-accountants", "doctors", "lawyers", "engineers", "information-technology", "young-entrepreneurs", "media-relations"]
  },
  {
    id: "agricultural",
    nameEn: "Agricultural & Food Industry",
    nameTa: "விவசாயம் மற்றும் உணவுப் பிரிவுகள்",
    descEn: "Farming, organic agro-trading, milk farmers, and restaurant owners.",
    descTa: "விவசாயிகள், இயற்கை உற்பத்தி, பால் பண்ணை மற்றும் உணவக உரிமையாளர்கள்.",
    wings: ["agriculture", "restaurant-owners", "marine-business", "tribal-entrepreneurs", "distributors"]
  },
  {
    id: "industrial",
    nameEn: "Industrial & Manufacturing Trade",
    nameTa: "தொழில் மற்றும் வர்த்தகப் பிரிவுகள்",
    descEn: "Heavy industrial manufacturers, textile weavers, logistics, and real estate developers.",
    descTa: "உற்பத்தியாளர்கள், நெசவாளர்கள், தளவாடங்கள் மற்றும் கட்டுமானத் துறை சார்ந்தவர்கள்.",
    wings: ["manufacturers", "import-export", "weavers", "printing-press", "computer-mobile", "insurance-finance"]
  },
  {
    id: "public",
    nameEn: "Public & General Services",
    nameTa: "பொது மற்றும் சமூகப் பிரிவுகள்",
    descEn: "Retailers, handloom craftsmen, tourism agencies, and workers unions.",
    descTa: "சிறு சில்லறை வணிகர்கள், கைத்தறி கலைஞர்கள், சுற்றுலா முகவர்கள் மற்றும் தொழிலாளர்கள்.",
    wings: ["labour", "differently-abled", "transgender-entrepreneurs", "pharmacists", "educators", "tourism-transport", "sports-business", "shop-owners", "street-vendors", "hotels-lodgings", "beauty-fitness", "central-govt-relations", "state-govt-relations", "cottage-industry", "digital-advertisers"]
  }
];

// Deterministic South Indian / Tamil names lists
const TAMIL_MEN_FIRST_NAMES = [
  "Arun", "Karthik", "Saravanan", "Senthil", "Venkatesh", "Murugan", "Prabhu", "Vijay", "Ramesh", "Suresh",
  "Selvam", "Pandian", "Anbarasan", "Muthu", "Rajesh", "Kumar", "Balaji", "Hari", "Ganesh", "Manikandan",
  "Sundar", "Prakash", "Sivakumar", "Dinesh", "Baskar", "Loganathan", "Kathiravan", "Shanmugam", "Rajarajan",
  "Elango", "Ranganathan", "Gunasekaran", "Jayakumar", "Thirumurugan", "Senthilvel", "Velmurugan", "Karthikeyan"
];

const TAMIL_WOMEN_FIRST_NAMES = [
  "Priya", "Meena", "Abirami", "Kavitha", "Lakshmi", "Deepa", "Divya", "Sindhu", "Anitha", "Kokila",
  "Revathi", "Gayathri", "Mythili", "Soundarya", "Malathi", "Suganya", "Chitra", "Uma", "Bhavani", "Shanthi",
  "Saraswathi", "Aruna", "Nandhini", "Radha", "Kalyani", "Geetha", "Vidya", "Sangeetha", "Kokilavani", "Jayanthi"
];

const TAMIL_LAST_NAMES = [
  "Kalyanasundaram", "Ramakrishnan", "Subramanian", "Ganesan", "Muthuvel", "Chidambaram", "Karuppasamy",
  "Swaminathan", "Palani", "Thangaraj", "Sundaram", "Viswanathan", "Arumugam", "Rajendran", "Selvaraj",
  "Narayanan", "Pandian", "Ramasamy", "Sethuraman", "Raghavan", "Nataraajan", "Vasudevan", "Somalingam"
];

const TAMIL_MEN_FIRST_NAMES_TA = [
  "அருண்", "கார்த்திக்", "சரவணன்", "செந்தில்", "வெங்கடேஷ்", "முருகன்", "பிரபு", "விஜய்", "ரமேஷ்", "சுரேஷ்",
  "செல்வம்", "பாண்டியன்", "அன்பரசன்", "முத்து", "ராஜேஷ்", "குமார்", "பாலாஜி", "ஹரி", "கணேஷ்", "மணிகண்டன்",
  "சுந்தர்", "பிரகாஷ்", "சிவகுமார்", "தினேஷ்", "பாஸ்கர்", "லோகநாதன்", "கதிரவன்", "சண்முகம்", "ராஜராஜன்",
  "இளங்கோ", "ரங்கநாதன்", "குணசேகரன்", "ஜெயகுமார்", "திருமுருகன்", "செந்தில்வேல்", "வேல்முருகன்", "கார்த்திகேயன்"
];

const TAMIL_WOMEN_FIRST_NAMES_TA = [
  "பிரியா", "மீனா", "அபிராமி", "கவிதா", "லட்சுமி", "தீபா", "திவ்யா", "சிந்து", "அனிதா", "கோகிலா",
  "ரேவதி", "காயத்ரி", "மைதிலி", "சௌந்தர்யா", "மாலதி", "சுகன்யா", "சித்ரா", "உமா", "பவானி", "சாந்தி",
  "சரஸ்வதி", "அருணா", "நந்தினி", "ராதா", "கல்யாணி", "கீதா", "வித்யா", "சங்கீதா", "கோகிலவாணி", "ஜெயந்தி"
];

const TAMIL_LAST_NAMES_TA = [
  "கல்யாணசுந்தரம்", "ராமகிருஷ்ணன்", "சுப்பிரமணியன்", "கணேசன்", "முத்துவேல்", "சிதம்பரம்", "கருப்பசாமி",
  "சுவாமிநாதன்", "பழனி", "தங்கராஜ்", "சுந்தரம்", "விஸ்வநாதன்", "ஆறுமுகம்", "ராஜேந்திரன்", "செல்வராஜ்",
  "நாராயணன்", "பாண்டியன்", "ராமசாமி", "சேதுராமன்", "ராகவன்", "நடராஜன்", "வாசுதேவன்", "சோமலிங்கம்"
];

const AVATAR_COLORS = [
  "bg-blue-500 text-white border-blue-600",
  "bg-emerald-500 text-white border-emerald-600",
  "bg-violet-500 text-white border-violet-600",
  "bg-amber-500 text-white border-amber-600",
  "bg-rose-500 text-white border-rose-600",
  "bg-indigo-500 text-white border-indigo-600",
  "bg-teal-500 text-white border-teal-600",
  "bg-cyan-500 text-white border-cyan-600",
  "bg-purple-500 text-white border-purple-600"
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getDeterministicRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Officer {
  roleEn: string;
  roleTa: string;
  nameEn: string;
  nameTa: string;
  phone: string;
  email: string;
  avatarColor: string;
  verified: boolean;
  initials: string;
}

function generateOfficers(district: string, wingId: string, wingNameEn: string, wingNameTa: string): Officer[] {
  const roles = [
    { en: "President", ta: "தலைவர்" },
    { en: "Secretary", ta: "செயலாளர்" },
    { en: "Treasurer", ta: "பொருளாளர்" }
  ];

  return roles.map((role, idx) => {
    const seedStr = `${district}-${wingId}-${idx}`;
    let seed = hashString(seedStr);

    const isWomanWing = wingId === "women-entrepreneurs";
    const randGender = getDeterministicRandom(seed);
    const isWoman = isWomanWing || (randGender < 0.3);

    const firstNamesList = isWoman ? TAMIL_WOMEN_FIRST_NAMES : TAMIL_MEN_FIRST_NAMES;
    const firstNamesTaList = isWoman ? TAMIL_WOMEN_FIRST_NAMES_TA : TAMIL_MEN_FIRST_NAMES_TA;
    
    seed = hashString(seed.toString());
    const firstNameIdx = Math.floor(getDeterministicRandom(seed) * firstNamesList.length);
    const firstNameEn = firstNamesList[firstNameIdx];
    const firstNameTa = firstNamesTaList[firstNameIdx];

    seed = hashString(seed.toString());
    const lastNameIdx = Math.floor(getDeterministicRandom(seed) * TAMIL_LAST_NAMES.length);
    const lastNameEn = TAMIL_LAST_NAMES[lastNameIdx];
    const lastNameTa = TAMIL_LAST_NAMES_TA[lastNameIdx];

    let prefixEn = "";
    let prefixTa = "";
    if (wingId === "doctors") {
      prefixEn = "Dr. ";
      prefixTa = "டாக்டர். ";
    } else if (wingId === "lawyers") {
      prefixEn = "Adv. ";
      prefixTa = "வழக்கறிஞர். ";
    } else if (wingId === "chartered-accountants") {
      prefixEn = "CA ";
      prefixTa = "சி.ஏ. ";
    } else if (wingId === "engineers") {
      prefixEn = "Er. ";
      prefixTa = "பொறியாளர். ";
    } else if (wingId === "educators") {
      prefixEn = "Prof. ";
      prefixTa = "பேராசிரியர். ";
    }

    const nameEn = `${prefixEn}${firstNameEn} ${lastNameEn[0]}.`;
    const nameTa = `${prefixTa}${firstNameTa} ${lastNameTa[0]}.`;

    const prefixes = ["944", "984", "948", "978", "890", "737"];
    seed = hashString(seed.toString());
    const phonePrefix = prefixes[Math.floor(getDeterministicRandom(seed) * prefixes.length)];
    seed = hashString(seed.toString());
    const phoneSuffix = Math.floor(1000000 + getDeterministicRandom(seed) * 8999999);
    const phone = `+91 ${phonePrefix} ${phoneSuffix.toString().substring(0, 3)} ${phoneSuffix.toString().substring(3)}`;

    const email = `${firstNameEn.toLowerCase()}.${role.en.toLowerCase()}@vanigarsangamam.org`;
    const initials = (prefixEn ? prefixEn.replace(".", "").trim() : firstNameEn[0]) + lastNameEn[0];

    seed = hashString(seed.toString());
    const avatarColor = AVATAR_COLORS[Math.floor(getDeterministicRandom(seed) * AVATAR_COLORS.length)];

    return {
      roleEn: role.en,
      roleTa: role.ta,
      nameEn,
      nameTa,
      phone,
      email,
      avatarColor,
      verified: true,
      initials
    };
  });
}


function Wings() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"wings" | "zones">("wings");

  // Wings State
  const [query, setQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");

  // Zones State
  const [zoneQuery, setZoneQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  // Collapsible tree expanded nodes state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  // Tree data structure grouped by Zone and District
  const treeData = useMemo(() => {
    const zonesMap: Record<string, Set<string>> = {};
    ZONE_BREAKDOWN.forEach(item => {
      if (selectedZone !== "all" && item.zone !== selectedZone) return;
      if (selectedDistrict !== "all" && item.district !== selectedDistrict) return;

      if (!zonesMap[item.zone]) {
        zonesMap[item.zone] = new Set();
      }
      zonesMap[item.zone].add(item.district);
    });

    return Object.entries(zonesMap).map(([zoneName, districtsSet]) => ({
      zoneName,
      districts: Array.from(districtsSet).sort()
    })).sort((a, b) => a.zoneName.localeCompare(b.zoneName));
  }, [selectedZone, selectedDistrict]);

  // Compute search matches and expand paths automatically
  const getSearchMatches = useMemo(() => {
    const term = zoneQuery.toLowerCase().trim();
    if (!term) return { visibleNodes: null, autoExpanded: null };

    const visibleNodes = new Set<string>();
    const autoExpanded = new Set<string>();

    treeData.forEach(({ zoneName, districts }) => {
      let zoneMatches = zoneName.toLowerCase().includes(term);

      districts.forEach(district => {
        let districtMatches = district.toLowerCase().includes(term);

        DEPARTMENTS.forEach(dept => {
          let deptMatches = dept.nameEn.toLowerCase().includes(term) || dept.nameTa.toLowerCase().includes(term);

          const deptWings = WINGS.filter(w => dept.wings.includes(w.id));
          deptWings.forEach(wing => {
            let wingMatches = wing.nameEn.toLowerCase().includes(term) || wing.nameTa.toLowerCase().includes(term);

            const officers = generateOfficers(district, wing.id, wing.nameEn, wing.nameTa);
            const officerMatches = officers.some(off =>
              off.nameEn.toLowerCase().includes(term) ||
              off.nameTa.toLowerCase().includes(term) ||
              off.email.toLowerCase().includes(term) ||
              off.phone.toLowerCase().includes(term)
            );

            if (wingMatches || officerMatches) {
              const wingKey = `wing:${zoneName}:${district}:${dept.id}:${wing.id}`;
              const deptKey = `dept:${zoneName}:${district}:${dept.id}`;
              const distKey = `dist:${zoneName}:${district}`;
              const zoneKey = `zone:${zoneName}`;

              visibleNodes.add(wingKey);
              visibleNodes.add(deptKey);
              visibleNodes.add(distKey);
              visibleNodes.add(zoneKey);

              autoExpanded.add(deptKey);
              autoExpanded.add(distKey);
              autoExpanded.add(zoneKey);
              if (officerMatches) {
                autoExpanded.add(wingKey);
              }
            }
          });

          if (deptMatches) {
            const deptKey = `dept:${zoneName}:${district}:${dept.id}`;
            const distKey = `dist:${zoneName}:${district}`;
            const zoneKey = `zone:${zoneName}`;

            visibleNodes.add(deptKey);
            visibleNodes.add(distKey);
            visibleNodes.add(zoneKey);

            autoExpanded.add(distKey);
            autoExpanded.add(zoneKey);

            const deptWings = WINGS.filter(w => dept.wings.includes(w.id));
            deptWings.forEach(wing => {
              visibleNodes.add(`wing:${zoneName}:${district}:${dept.id}:${wing.id}`);
            });
          }
        });

        if (districtMatches) {
          const distKey = `dist:${zoneName}:${district}`;
          const zoneKey = `zone:${zoneName}`;

          visibleNodes.add(distKey);
          visibleNodes.add(zoneKey);

          autoExpanded.add(zoneKey);

          DEPARTMENTS.forEach(dept => {
            visibleNodes.add(`dept:${zoneName}:${district}:${dept.id}`);
            const deptWings = WINGS.filter(w => dept.wings.includes(w.id));
            deptWings.forEach(wing => {
              visibleNodes.add(`wing:${zoneName}:${district}:${dept.id}:${wing.id}`);
            });
          });
        }
      });

      if (zoneMatches) {
        const zoneKey = `zone:${zoneName}`;
        visibleNodes.add(zoneKey);

        districts.forEach(district => {
          visibleNodes.add(`dist:${zoneName}:${district}`);
          DEPARTMENTS.forEach(dept => {
            visibleNodes.add(`dept:${zoneName}:${district}:${dept.id}`);
            const deptWings = WINGS.filter(w => dept.wings.includes(w.id));
            deptWings.forEach(wing => {
              visibleNodes.add(`wing:${zoneName}:${district}:${dept.id}:${wing.id}`);
            });
          });
        });
      }
    });

    return { visibleNodes, autoExpanded };
  }, [treeData, zoneQuery]);

  const handleToggle = (nodeKey: string) => {
    setExpandedNodes(prev => {
      const currentVal = getSearchMatches.autoExpanded 
        ? (prev[nodeKey] !== undefined ? prev[nodeKey] : getSearchMatches.autoExpanded.has(nodeKey))
        : !!prev[nodeKey];
      return { ...prev, [nodeKey]: !currentVal };
    });
  };

  const isExpanded = (nodeKey: string) => {
    if (expandedNodes[nodeKey] !== undefined) {
      return expandedNodes[nodeKey];
    }
    if (getSearchMatches.autoExpanded) {
      return getSearchMatches.autoExpanded.has(nodeKey);
    }
    return false;
  };

  const isVisible = (nodeKey: string) => {
    if (getSearchMatches.visibleNodes) {
      return getSearchMatches.visibleNodes.has(nodeKey);
    }
    return true;
  };

  const isTreeEmpty = treeData.length === 0 || (zoneQuery.trim() !== "" && getSearchMatches.visibleNodes && getSearchMatches.visibleNodes.size === 0);

  // Unique Zones list
  const uniqueZones = Array.from(new Set(ZONE_BREAKDOWN.map(item => item.zone)));

  // Available districts based on selected zone
  const availableDistricts = Array.from(
    new Set(
      ZONE_BREAKDOWN
        .filter(item => selectedZone === "all" || item.zone === selectedZone)
        .map(item => item.district)
    )
  );

  // Total statistics for Zones breakdown
  const statsZonesCount = uniqueZones.length;
  const statsDistrictsCount = Array.from(new Set(ZONE_BREAKDOWN.map(item => item.district))).length;

  // Filter wings
  const filteredWings = WINGS.filter((w) => {
    const term = query.toLowerCase();
    return (
      w.nameEn.toLowerCase().includes(term) ||
      w.nameTa.toLowerCase().includes(term) ||
      w.descriptionEn.toLowerCase().includes(term) ||
      w.descriptionTa.toLowerCase().includes(term)
    );
  });

  // Filter zones/constituencies
  const filteredZones = ZONE_BREAKDOWN.filter((item) => {
    const term = zoneQuery.toLowerCase();
    const matchesSearch =
      item.constituency.toLowerCase().includes(term) ||
      item.district.toLowerCase().includes(term) ||
      item.zone.toLowerCase().includes(term) ||
      item.ac_no.toString().includes(term);

    const matchesZone = selectedZone === "all" || item.zone === selectedZone;
    const matchesDistrict = selectedDistrict === "all" || item.district === selectedDistrict;

    return matchesSearch && matchesZone && matchesDistrict;
  });

  return (
    <div className="relative min-h-screen">
      {/* Header section with tab switcher */}
      <section className="border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
          <div className="mb-4">
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> {t("சேவைகளுக்குத் திரும்பு", "Back to Services")}
            </Link>
          </div>

          <div className="flex border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab("wings")}
              className={`pb-4 px-6 font-display text-sm md:text-base font-bold transition-all relative cursor-pointer ${
                activeTab === "wings" ? "text-primary" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t("34 வணிகப் பிரிவுகள்", "34 Specialized Wings")}
              {activeTab === "wings" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.75 bg-primary rounded-full"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("zones")}
              className={`pb-4 px-6 font-display text-sm md:text-base font-bold transition-all relative cursor-pointer ${
                activeTab === "zones" ? "text-primary" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t("மண்டல வாரியான தொகுதிகள்", "Regional Zone Breakdown")}
              {activeTab === "zones" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.75 bg-primary rounded-full"
                />
              )}
            </button>
          </div>

          {activeTab === "wings" ? (
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>{t("துணைப் பிரிவுகள்", "Specialized Wings")}</span>
              </div>
              
              <h1 className="mt-3 font-display text-2xl md:text-4xl font-bold text-slate-800 leading-tight max-w-3xl">
                {t("வணிகர்களின் சங்கமத்தின் 34 பிரிவுகள்", "34 Organizational Wings")}
              </h1>
              
              <p className="mt-4 text-xs md:text-sm text-slate-500 max-w-2xl font-tamil leading-relaxed">
                {t(
                  "உங்கள் வணிகத்தின் தன்மைக்கு ஏற்ற பிரிவைத் தேர்ந்தெடுத்து, அதற்கான சிறப்புச் சலுகைகள், சட்ட ஆலோசனைகள் மற்றும் தொழில் கூட்டுறவு வாய்ப்புகளைப் பெறுங்கள்.",
                  "Choose the wing that fits your business type to access specialized support, trade benefits, advisory services, and specific networking channels."
                )}
              </p>

              {/* Search bar */}
              <div className="mt-8 max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("பிரிவைத் தேடுக... (எ.கா: மகளிர், IT, உணவகம்)", "Search wings... (e.g. Women, IT, Restaurant)")}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-xs md:text-sm transition duration-300 min-h-[44px]"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="mt-6 flex gap-2 flex-wrap pb-1 overflow-x-auto">
                <button
                  onClick={() => setSelectedDept("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer min-h-[36px] border ${
                    selectedDept === "all" 
                      ? "bg-primary text-white border-primary shadow-xs" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t("அனைத்துப் பிரிவுகளும்", "All Departments")}
                </button>
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer min-h-[36px] border ${
                      selectedDept === dept.id 
                        ? "bg-primary text-white border-primary shadow-xs" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {language === "ta" ? dept.nameTa : dept.nameEn}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{t("புவியியல் கவரேஜ்", "Geographical Coverage")}</span>
              </div>
              
              <h1 className="mt-3 font-display text-2xl md:text-4xl font-bold text-slate-800 leading-tight max-w-3xl">
                {t("தமிழக மண்டல மற்றும் தொகுதி வாரியான பகுப்பாய்வு", "Tamil Nadu Zone & Constituency Breakdown")}
              </h1>
              
              <p className="mt-4 text-xs md:text-sm text-slate-500 max-w-2xl font-tamil leading-relaxed">
                {t(
                  "தமிழ்நாடு வணிகர்களின் சங்கமம் அமைப்பின் கீழ் செயல்படும் அதிகாரப்பூர்வ மண்டலங்கள், மாவட்டங்கள் மற்றும் சட்டமன்ற தொகுதிகளின் முழு விவரங்கள்.",
                  "Explore the full regional coverage of our association, mapped strictly by regional zones, covered districts, and corresponding legislative assembly constituencies."
                )}
              </p>

              {/* Statistics Panel */}
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-xs">
                  <div className="text-xl md:text-2xl font-bold text-primary tabular-nums">{statsZonesCount}</div>
                  <div className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mt-1">
                    {t("அதிகாரப்பூர்வ மண்டலங்கள்", "Regional Zones")}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-xs">
                  <div className="text-xl md:text-2xl font-bold text-primary tabular-nums">{statsDistrictsCount}</div>
                  <div className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mt-1">
                    {t("உள்ளடக்கிய மாவட்டங்கள்", "Districts Covered")}
                  </div>
                </div>
              </div>

              {/* Zone Filter pills */}
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Constituency Search */}
                <div className="w-full md:max-w-md relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={zoneQuery}
                    onChange={(e) => {
                      setZoneQuery(e.target.value);
                    }}
                    placeholder={t("தொகுதி, மாவட்டம் அல்லது மண்டலம் தேடுக...", "Search constituency, district or zone...")}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-xs md:text-sm transition duration-300 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Zone Selector tabs */}
              <div className="mt-6 flex gap-2 flex-wrap pb-1 overflow-x-auto">
                <button
                  onClick={() => {
                    setSelectedZone("all");
                    setSelectedDistrict("all");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer min-h-[36px] border ${
                    selectedZone === "all" 
                      ? "bg-primary text-white border-primary shadow-xs" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t("அனைத்து மண்டலங்களும்", "All Zones")}
                </button>
                {uniqueZones.map(zone => (
                  <button
                    key={zone}
                    onClick={() => {
                      setSelectedZone(zone);
                      setSelectedDistrict("all");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer min-h-[36px] border ${
                      selectedZone === zone 
                        ? "bg-primary text-white border-primary shadow-xs" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              {/* District pills based on selected zone */}
              <div className="mt-4 flex gap-1.5 flex-wrap pb-1 overflow-x-auto">
                <button
                  onClick={() => setSelectedDistrict("all")}
                  className={`px-3 py-1.5 rounded-full text-xxs font-bold transition cursor-pointer border ${
                    selectedDistrict === "all" 
                      ? "bg-slate-800 border-slate-800 text-white shadow-xs" 
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-250"
                  }`}
                >
                  {t("அனைத்து மாவட்டங்களும்", "All Districts")}
                </button>
                {availableDistricts.map(district => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`px-3 py-1.5 rounded-full text-xxs font-bold transition cursor-pointer border ${
                      selectedDistrict === district 
                        ? "bg-slate-800 border-slate-800 text-white shadow-xs" 
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-250"
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Section className="py-8">
        {activeTab === "wings" ? (
          <div>
            {filteredWings.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-250/60 rounded-2xl p-6 shadow-xs max-w-md mx-auto">
                <div className="text-slate-400 text-sm font-semibold">{t("பிரிவுகள் எதுவும் காணப்படவில்லை.", "No matching wings found.")}</div>
                <button onClick={() => setQuery("")} className="mt-3 text-xs text-primary font-bold hover:underline">
                  {t("அனைத்தையும் காட்டு", "Clear Search & View All")}
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {DEPARTMENTS.filter(d => selectedDept === "all" || selectedDept === d.id).map(dept => {
                  const deptWings = filteredWings.filter(w => dept.wings.includes(w.id));
                  if (deptWings.length === 0) return null;

                  return (
                    <div key={dept.id} className="space-y-6">
                      <div className="border-b border-slate-200/80 pb-3">
                        <h2 className="font-display text-lg md:text-xl font-bold text-slate-800 leading-snug">
                          {language === "ta" ? dept.nameTa : dept.nameEn}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-tamil">
                          {language === "ta" ? dept.descTa : dept.descEn}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                          {deptWings.map((w, index) => {
                            const Icon = w.icon;
                            return (
                              <motion.div
                                key={w.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.15) }}
                                className="card-base card-interactive group p-5 md:p-6 flex flex-col justify-between min-h-[190px]"
                              >
                                <div className="space-y-3">
                                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary grid place-items-center transition duration-300 group-hover:bg-primary group-hover:text-white">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <h3 className="font-display font-bold text-sm md:text-base text-slate-800 leading-snug">
                                    {language === "ta" ? w.nameTa : w.nameEn}
                                  </h3>
                                  <p className="text-xs text-slate-500 leading-relaxed font-tamil">
                                    {language === "ta" ? w.descriptionTa : w.descriptionEn}
                                  </p>
                                </div>
                                
                                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                                  <Link
                                    to="/membership"
                                    search={{ wing: w.id }}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline transition-all cursor-pointer min-h-[30px]"
                                  >
                                    {t("இணைவு / Join", "Join Wing")} <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {isTreeEmpty ? (
              <div className="text-center py-16 bg-white border border-slate-250/60 rounded-2xl p-6 shadow-xs max-w-md mx-auto">
                <div className="text-slate-400 text-sm font-semibold">{t("முடிவுகள் எதுவும் காணப்படவில்லை.", "No matching results found.")}</div>
                <button 
                  onClick={() => {
                    setZoneQuery("");
                    setSelectedZone("all");
                    setSelectedDistrict("all");
                  }} 
                  className="mt-3 text-xs text-primary font-bold hover:underline"
                >
                  {t("வடிகட்டிகளை நீக்கு", "Clear Filters & View All")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {treeData.map(({ zoneName, districts }) => {
                  const zoneKey = `zone:${zoneName}`;
                  if (!isVisible(zoneKey)) return null;

                  const zoneExpanded = isExpanded(zoneKey);
                  const districtCount = districts.length;

                  return (
                    <div
                      key={zoneKey}
                      className={`bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden transition-all duration-300 ${
                        zoneExpanded ? "ring-4 ring-primary/5 border-primary/40 shadow-md" : "hover:border-slate-350"
                      }`}
                    >
                      {/* Zone Header */}
                      <button
                        onClick={() => handleToggle(zoneKey)}
                        className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl transition-all duration-200 ${zoneExpanded ? "bg-primary text-white shadow-xs" : "bg-slate-100 text-slate-500"}`}>
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-sm md:text-base text-slate-800 tracking-wide">
                              {zoneName}
                            </h3>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                              {t(`${districtCount} மாவட்டங்கள்`, `${districtCount} Districts Covered`)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xxs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {t("மண்டலம்", "Zone")}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                              zoneExpanded ? "transform rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Zone Content: Districts */}
                      <AnimatePresence initial={false}>
                        {zoneExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-150/80 px-4 py-4 md:px-6 md:py-6 bg-white space-y-4 relative overflow-hidden"
                          >
                            {/* Vertical connector line for tree blueprint */}
                            <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-slate-100" />

                            {districts.map((district) => {
                              const distKey = `dist:${zoneName}:${district}`;
                              if (!isVisible(distKey)) return null;

                              const distExpanded = isExpanded(distKey);

                              return (
                                <div key={distKey} className="relative pl-6">
                                  {/* Horizontal line connector */}
                                  <div className="absolute left-0 top-5 w-5 h-0.5 bg-slate-200" />

                                  <div className={`border rounded-xl shadow-xxs transition duration-200 ${
                                    distExpanded ? "border-slate-300 shadow-sm bg-slate-50/20" : "border-slate-200 hover:border-slate-350 bg-white"
                                  }`}>
                                    {/* District Header */}
                                    <button
                                      onClick={() => handleToggle(distKey)}
                                      className="w-full text-left px-4 py-3.5 flex items-center justify-between cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <MapPin className={`w-4 h-4 ${distExpanded ? "text-primary" : "text-slate-400"}`} />
                                        <span className="font-display font-bold text-xs md:text-sm text-slate-700 uppercase tracking-wide">
                                          {district}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                                          {t("மாவட்டம்", "District")}
                                        </span>
                                        <ChevronDown
                                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                            distExpanded ? "transform rotate-180" : ""
                                          }`}
                                        />
                                      </div>
                                    </button>

                                    {/* District Content: Departments */}
                                    {distExpanded && (
                                      <div className="border-t border-slate-150 p-4 space-y-3 bg-white/60 relative">
                                        {/* Inner Vertical line connector */}
                                        <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-slate-100" />

                                        {DEPARTMENTS.map((dept) => {
                                          const deptKey = `dept:${zoneName}:${district}:${dept.id}`;
                                          if (!isVisible(deptKey)) return null;

                                          const deptExpanded = isExpanded(deptKey);
                                          const deptWingsList = WINGS.filter(w => dept.wings.includes(w.id));

                                          // Color mapping for departments
                                          const deptColors: Record<string, { bg: string, text: string, accent: string, border: string }> = {
                                            professional: { bg: "bg-violet-50/70", text: "text-violet-750", accent: "bg-violet-600", border: "border-violet-100" },
                                            agricultural: { bg: "bg-emerald-50/70", text: "text-emerald-750", accent: "bg-emerald-600", border: "border-emerald-100" },
                                            industrial: { bg: "bg-amber-50/70", text: "text-amber-750", accent: "bg-amber-600", border: "border-amber-100" },
                                            public: { bg: "bg-blue-50/70", text: "text-blue-750", accent: "bg-blue-600", border: "border-blue-100" }
                                          };
                                          const colors = deptColors[dept.id] || { bg: "bg-slate-50", text: "text-slate-750", accent: "bg-slate-650", border: "border-slate-100" };

                                          return (
                                            <div key={deptKey} className="relative pl-6">
                                              {/* Horizontal connector to Department */}
                                              <div className="absolute left-0 top-5.5 w-5 h-0.5 bg-slate-200" />

                                              <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                                                deptExpanded ? "border-slate-250 shadow-xxs bg-white" : "border-slate-150 bg-white"
                                              }`}>
                                                {/* Department Header */}
                                                <button
                                                  onClick={() => handleToggle(deptKey)}
                                                  className={`w-full text-left px-3.5 py-3 flex items-center justify-between cursor-pointer ${colors.bg}`}
                                                >
                                                  <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-5 rounded-full ${colors.accent}`} />
                                                    <span className={`font-display font-extrabold text-xs leading-none ${colors.text}`}>
                                                      {language === "ta" ? dept.nameTa : dept.nameEn}
                                                    </span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white/80 text-slate-550 border border-slate-200/50 rounded-md">
                                                      {t(`${deptWingsList.length} பிரிவுகள்`, `${deptWingsList.length} Wings`)}
                                                    </span>
                                                    <ChevronDown
                                                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                                        deptExpanded ? "transform rotate-180" : ""
                                                      }`}
                                                    />
                                                  </div>
                                                </button>

                                                {/* Department Content: Wings */}
                                                {deptExpanded && (
                                                  <div className="p-3.5 space-y-2 bg-white relative">
                                                    {/* Deep connector line */}
                                                    <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-slate-100" />

                                                    {deptWingsList.map((wing) => {
                                                      const wingKey = `wing:${zoneName}:${district}:${dept.id}:${wing.id}`;
                                                      if (!isVisible(wingKey)) return null;

                                                      const wingExpanded = isExpanded(wingKey);
                                                      const WingIcon = wing.icon;

                                                      return (
                                                        <div key={wingKey} className="relative pl-6">
                                                          {/* Horizontal connector to Wing */}
                                                          <div className="absolute left-0 top-5 w-5 h-0.5 bg-slate-200" />

                                                          <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                                                            wingExpanded ? "border-primary/30 bg-primary/2.5" : "border-slate-150 bg-white hover:bg-slate-50/20"
                                                          }`}>
                                                            {/* Wing Title Header */}
                                                            <button
                                                              onClick={() => handleToggle(wingKey)}
                                                              className="w-full text-left px-3 py-2.5 flex items-center justify-between cursor-pointer"
                                                            >
                                                              <div className="flex items-center gap-2.5">
                                                                <div className={`w-7 h-7 rounded-lg grid place-items-center transition-all ${
                                                                  wingExpanded ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                                                                }`}>
                                                                  <WingIcon className="w-3.5 h-3.5" />
                                                                </div>
                                                                <h4 className="font-display font-bold text-xxs md:text-xs text-slate-750">
                                                                  {language === "ta" ? wing.nameTa : wing.nameEn}
                                                                </h4>
                                                              </div>
                                                              <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                                                                  {t("3 அதிகாரிகள்", "3 Officers")}
                                                                </span>
                                                                <ChevronDown
                                                                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-250 ${
                                                                    wingExpanded ? "transform rotate-180" : ""
                                                                  }`}
                                                                />
                                                              </div>
                                                            </button>

                                                            {/* Wing Content: Active Officers */}
                                                            {wingExpanded && (
                                                              <div className="p-3 bg-slate-50/30 border-t border-slate-100">
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                  {generateOfficers(district, wing.id, wing.nameEn, wing.nameTa).map((officer, oIdx) => (
                                                                    <div
                                                                      key={`${wingKey}-officer-${oIdx}`}
                                                                      className="flex flex-col justify-between p-3 border border-slate-200/80 rounded-xl bg-white hover:border-slate-300 transition shadow-xxs relative overflow-hidden"
                                                                    >
                                                                      {/* Accent bar by role */}
                                                                      <div className={`absolute top-0 left-0 right-0 h-1 ${
                                                                        oIdx === 0 ? "bg-blue-500" : oIdx === 1 ? "bg-emerald-500" : "bg-amber-500"
                                                                      }`} />

                                                                      <div className="flex items-start gap-2.5 mt-1">
                                                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-extrabold text-[10px] tracking-wide shrink-0 border shadow-xxs ${officer.avatarColor}`}>
                                                                          {officer.initials}
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                          <div className="flex items-center gap-1">
                                                                            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                                                                              oIdx === 0 
                                                                                ? "bg-blue-50 text-blue-600 border border-blue-100" 
                                                                                : oIdx === 1 
                                                                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                                                                  : "bg-amber-50 text-amber-600 border border-amber-100"
                                                                            }`}>
                                                                              {language === "ta" ? officer.roleTa : officer.roleEn}
                                                                            </span>
                                                                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-50 animate-pulse" />
                                                                          </div>
                                                                          <h5 className="font-display font-bold text-xxs md:text-xs text-slate-800 mt-1 truncate animate-fade-in" title={language === "ta" ? officer.nameTa : officer.nameEn}>
                                                                            {language === "ta" ? officer.nameTa : officer.nameEn}
                                                                          </h5>
                                                                        </div>
                                                                      </div>

                                                                      {/* Contact Details with custom-designed micro-buttons */}
                                                                      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                                                                        <a
                                                                          href={`tel:${officer.phone.replace(/\s+/g, "")}`}
                                                                          className="flex items-center gap-1.5 text-[10px] text-slate-550 hover:text-primary transition font-semibold"
                                                                        >
                                                                          <Phone className="w-3 h-3 text-slate-400" />
                                                                          <span className="tabular-nums truncate">{officer.phone}</span>
                                                                        </a>
                                                                        <a
                                                                          href={`mailto:${officer.email}`}
                                                                          className="flex items-center gap-1.5 text-[10px] text-slate-550 hover:text-primary transition font-semibold"
                                                                        >
                                                                          <Mail className="w-3 h-3 text-slate-400" />
                                                                          <span className="truncate" title={officer.email}>{officer.email}</span>
                                                                        </a>
                                                                      </div>
                                                                    </div>
                                                                  ))}
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Section>

      {/* Coordinator CTA section */}
      <Section className="py-12 border-t border-slate-200/80 bg-white">
        <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-gold/25 border border-gold/15 text-gold text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">நிர்வாகியாக இணைய</span>
            <h2 className="font-display text-2xl font-bold leading-tight">தலைமை ஏற்கத் தயாரா?</h2>
            <p className="text-xs md:text-sm text-slate-350 max-w-xl font-tamil leading-relaxed">
              உங்கள் பரிந்துரை லிங்க் மூலம் 25 வணிகர்களை ஒன்றிணைத்து, தமிழ்நாடு வணிகர்களின் சங்கமத்தில் 'ஒருங்கிணைப்பாளர்' பொறுப்பை பெற்றிடுங்கள்!
            </p>
          </div>
          <Link
            to="/dashboard"
            className="bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 rounded-xl font-bold text-xs transition shadow-md shrink-0 inline-flex items-center gap-1.5 min-h-[44px]"
          >
            {t("டாஷ்போர்டுக்கு செல்க", "Go to Dashboard")} <ArrowRight className="w-4 h-4 text-slate-900" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
