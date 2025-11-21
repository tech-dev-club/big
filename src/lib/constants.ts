// Comprehensive Indian Cities Database with coordinates
export const INDIAN_CITIES = [
  // Tier 1 Metro Cities
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, population: 20411000 },
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, population: 16787941 },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: 12326532 },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, population: 10004000 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: 8450000 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: 10971108 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: 14850066 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: 7764000 },
  
  // Tier 2 Major Cities
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, population: 6081000 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: 3887000 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: 3382000 },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, population: 3067000 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, population: 2497777 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, population: 3276697 },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781, population: 1890000 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: 2371061 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, population: 2035922 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, population: 2049156 },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, population: 2065771 },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, population: 1729000 },
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, population: 1618879 },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, population: 1746467 },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, population: 1562769 },
  { name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, population: 1404653 },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, population: 1424908 },
  { name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, population: 1390933 },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: 1435113 },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, population: 1273312 },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lng: 75.3433, population: 1175116 },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, population: 1162472 },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, population: 1183705 },
  { name: "Navi Mumbai", state: "Maharashtra", lat: 19.0330, lng: 73.0297, population: 1120547 },
  { name: "Allahabad", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, population: 1216719 },
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, population: 1126741 },
  { name: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636, population: 1077075 },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, population: 1696000 },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, population: 1267564 },
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828, population: 1101981 },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, population: 1048240 },
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, population: 1137815 },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, population: 1561129 },
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, population: 1122555 },
  { name: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648, population: 1001694 },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, population: 1055450 },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: 963429 },
  { name: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064, population: 951558 },
  { name: "Hubli-Dharwad", state: "Karnataka", lat: 15.3647, lng: 75.1240, population: 943857 },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, population: 920550 },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, population: 916857 },
  { name: "Bareilly", state: "Uttar Pradesh", lat: 28.3670, lng: 79.4304, population: 903668 },
  { name: "Aligarh", state: "Uttar Pradesh", lat: 27.8974, lng: 78.0880, population: 872575 },
  { name: "Tiruppur", state: "Tamil Nadu", lat: 11.1085, lng: 77.3411, population: 877778 },
  { name: "Moradabad", state: "Uttar Pradesh", lat: 28.8389, lng: 78.7378, population: 887871 },
  { name: "Jalandhar", state: "Punjab", lat: 31.3260, lng: 75.5762, population: 873725 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, population: 885363 },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, population: 896195 },
  { name: "Warangal", state: "Telangana", lat: 17.9784, lng: 79.6000, population: 811844 },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, population: 957730 },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, population: 743354 },
  { name: "Bhiwandi", state: "Maharashtra", lat: 19.2972, lng: 73.0631, population: 709665 },
  { name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9680, lng: 77.5460, population: 705478 },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732, population: 674246 },
  { name: "Bikaner", state: "Rajasthan", lat: 28.0229, lng: 73.3119, population: 647804 },
  { name: "Amravati", state: "Maharashtra", lat: 20.9320, lng: 77.7523, population: 647370 },
  { name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.3910, population: 642381 },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, population: 629659 },
  { name: "Bhilai", state: "Chhattisgarh", lat: 21.2094, lng: 81.4294, population: 625700 },
  { name: "Cuttack", state: "Odisha", lat: 20.4625, lng: 85.8828, population: 606007 },
  { name: "Firozabad", state: "Uttar Pradesh", lat: 27.1591, lng: 78.3957, population: 603797 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, population: 677381 },
  { name: "Bhavnagar", state: "Gujarat", lat: 21.7645, lng: 72.1519, population: 593768 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, population: 714223 },
  { name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, population: 581409 },
  { name: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524, population: 563917 },
  { name: "Nanded", state: "Maharashtra", lat: 19.1383, lng: 77.3210, population: 550564 },
  { name: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433, population: 561841 },
  { name: "Ajmer", state: "Rajasthan", lat: 26.4499, lng: 74.6399, population: 551101 },
  { name: "Gulbarga", state: "Karnataka", lat: 17.3297, lng: 76.8343, population: 543147 },
  { name: "Jamnagar", state: "Gujarat", lat: 22.4707, lng: 70.0577, population: 529308 },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, population: 515215 },
  { name: "Loni", state: "Uttar Pradesh", lat: 28.7500, lng: 77.2900, population: 512296 },
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, population: 513264 },
  { name: "Jhansi", state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685, population: 507293 },
  { name: "Mangalore", state: "Karnataka", lat: 12.9141, lng: 74.8560, population: 488968 },
  { name: "Erode", state: "Tamil Nadu", lat: 11.3410, lng: 77.7172, population: 498129 },
  { name: "Belgaum", state: "Karnataka", lat: 15.8497, lng: 74.4977, population: 488157 },
  { name: "Ambattur", state: "Tamil Nadu", lat: 13.1143, lng: 80.1548, population: 466205 },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, population: 474838 },
  { name: "Malegaon", state: "Maharashtra", lat: 20.5579, lng: 74.5287, population: 471312 },
  { name: "Gaya", state: "Bihar", lat: 24.7914, lng: 85.0002, population: 470839 },
  { name: "Jalgaon", state: "Maharashtra", lat: 21.0077, lng: 75.5626, population: 460468 },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, population: 451100 },
  { name: "Maheshtala", state: "West Bengal", lat: 22.5096, lng: 88.2476, population: 448317 },
];

// Comprehensive Business Categories for India
export const BUSINESS_CATEGORIES = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    subcategories: ["Restaurant", "Cloud Kitchen", "Café", "Sweet Shop", "Fast Food", "Catering", "Bakery", "Ice Cream Parlor", "Juice Bar", "Food Truck", "Pizzeria", "Biryani House", "Street Food Stall", "Tiffin Service", "Vegan Restaurant", "Fine Dining", "Bar & Lounge", "Pub", "Dhaba", "Multi-Cuisine Restaurant"],
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    subcategories: ["Grocery Store", "Fashion Boutique", "Electronics Store", "Pharmacy", "Bookstore", "Jewelry Shop", "Mobile Store", "Cosmetics Shop", "Footwear Store", "Sports Goods", "Toy Store", "Pet Store", "Gift Shop", "Stationery Store", "Home Appliances", "Furniture Store", "Organic Store", "Supermarket", "Department Store", "Convenience Store"],
  },
  {
    id: "technology",
    name: "Technology & IT Services",
    subcategories: ["Software Development", "Digital Marketing Agency", "IT Consulting", "Mobile App Development", "Web Development", "Cloud Services", "Cybersecurity", "Data Analytics", "AI/ML Solutions", "Blockchain Development", "E-commerce Solutions", "SaaS Products", "IT Support", "Tech Startup", "IoT Solutions"],
  },
  {
    id: "tech-ai-ml",
    name: "AI & Machine Learning (Tech Hubs)",
    subcategories: ["AI Consulting", "ML Model Development", "Computer Vision Solutions", "NLP Services", "AI Chatbot Development", "Predictive Analytics", "Deep Learning Solutions", "AI Training Services", "AutoML Platforms", "AI Research Lab"],
  },
  {
    id: "tech-fintech",
    name: "Fintech (Tech Hubs)",
    subcategories: ["Digital Payments", "Lending Platform", "Insurance Tech", "Wealth Management App", "Crypto Exchange", "Personal Finance App", "RegTech Solutions", "Payment Gateway", "Robo-Advisory", "Blockchain Finance"],
  },
  {
    id: "tech-edtech",
    name: "EdTech (Tech Hubs)",
    subcategories: ["Online Learning Platform", "Skill Assessment Tools", "Virtual Classroom", "EdTech SaaS", "Coding Bootcamp", "Test Prep Platform", "Language Learning App", "Corporate Training", "K-12 EdTech", "Higher Ed Solutions"],
  },
  {
    id: "tech-healthtech",
    name: "HealthTech (Tech Hubs)",
    subcategories: ["Telemedicine Platform", "Health Records Management", "Diagnostic AI", "Fitness App", "Mental Health App", "Pharmacy Tech", "Medical Device Software", "Healthcare Analytics", "Patient Management System", "Health Insurance Tech"],
  },
  {
    id: "education",
    name: "Education & Training",
    subcategories: ["Coaching Center", "Online Courses", "Skill Development", "Language Institute", "Pre-School", "Daycare", "Competitive Exam Coaching", "Music Classes", "Dance Academy", "Art Classes", "Spoken English", "Computer Training", "Vocational Training", "Professional Certification", "MBA/CAT Coaching", "Engineering Entrance Coaching", "Medical Entrance Coaching", "Study Abroad Consultancy"],
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    subcategories: ["Gym & Fitness", "Yoga Studio", "Clinic", "Spa & Salon", "Physiotherapy", "Dental Clinic", "Diagnostic Center", "Pharmacy", "Ayurveda Center", "Homeopathy Clinic", "Mental Wellness", "Nutrition Counseling", "Beauty Parlor", "Unisex Salon", "Meditation Center", "Acupuncture", "Naturopathy", "Rehabilitation Center", "Sports Injury Clinic", "Wellness Retreat"],
  },
  {
    id: "services",
    name: "Professional Services",
    subcategories: ["Real Estate", "Legal Services", "Accounting", "Event Management", "Photography", "Videography", "Wedding Planning", "Interior Design", "Architecture", "Consulting", "HR Services", "Tax Advisory", "Financial Planning", "Insurance Brokerage", "Travel Agency", "Recruitment Agency", "Security Services", "Cleaning Services", "Pest Control", "Home Services"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Production",
    subcategories: ["Textile Manufacturing", "Food Processing", "Packaging", "Handicrafts", "Electronics Assembly", "Garment Manufacturing", "Leather Goods", "Furniture Making", "Plastic Products", "Metal Fabrication", "Automobile Parts", "Chemical Production", "Pharmaceutical Manufacturing", "Paper Products", "Rubber Products", "Ceramic Manufacturing", "Glass Products", "Wooden Crafts"],
  },
  {
    id: "logistics",
    name: "Logistics & Transport",
    subcategories: ["Delivery Service", "Warehouse", "Freight Forwarding", "Courier Service", "Cab Service", "Truck Rental", "Moving Services", "Cold Storage", "3PL Services", "Last Mile Delivery", "Cargo Services", "Supply Chain", "Fleet Management", "Bike Taxi", "Auto Rickshaw Service"],
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    subcategories: ["Hotel", "Guest House", "Resort", "Homestay", "Hostel", "Serviced Apartments", "Travel Tours", "Adventure Tourism", "Heritage Tourism", "Eco-Tourism", "Destination Wedding", "Tourism Consultancy", "Car Rental", "Cruise Services", "Travel Guide Services"],
  },
  {
    id: "automotive",
    name: "Automotive Services",
    subcategories: ["Car Repair", "Bike Service", "Auto Parts Store", "Car Wash", "Car Detailing", "Tire Shop", "Auto Accessories", "EV Charging Station", "Vehicle Insurance", "Car Rental", "Two-Wheeler Rental", "Garage", "Body Shop", "Car Modification"],
  },
  {
    id: "agriculture",
    name: "Agriculture & Agri-Tech",
    subcategories: ["Organic Farming", "Agri Input Store", "Cold Storage", "Agri-Tech Solutions", "Dairy Farming", "Poultry Farm", "Fishery", "Horticulture", "Agri Equipment Rental", "Seed Store", "Fertilizer Shop", "Agri Consultancy", "Food Processing", "Farm Management Software", "Hydroponics", "Vertical Farming"],
  },
  {
    id: "finance",
    name: "Financial Services",
    subcategories: ["Microfinance", "NBFC", "Investment Advisory", "Mutual Fund Distributor", "Stock Broking", "Insurance Agent", "Financial Planner", "Loan Services", "Gold Loan", "Credit Counseling", "Wealth Management", "Tax Filing Services", "Accounting Services", "Auditing Services"],
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    subcategories: ["Production House", "Recording Studio", "Event Management", "Artist Management", "Digital Content Creation", "YouTube Studio", "Podcast Studio", "Film Distribution", "Music Label", "Theatre", "Gaming Lounge", "Streaming Platform", "Radio Station", "Print Media", "Advertising Agency"],
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    subcategories: ["Beauty Salon", "Barber Shop", "Spa", "Makeup Studio", "Nail Salon", "Hair Transplant", "Laser Treatment", "Tattoo Studio", "Skin Care Clinic", "Cosmetic Surgery", "Beauty Academy", "Bridal Makeup", "Men's Grooming", "Tanning Studio", "Eyebrow Threading"],
  },
  {
    id: "real-estate",
    name: "Real Estate & Construction",
    subcategories: ["Real Estate Brokerage", "Property Management", "Construction Company", "Interior Design", "Architecture Firm", "Civil Engineering", "Home Renovation", "Builders", "Property Consulting", "Real Estate Investment", "Modular Kitchen", "False Ceiling", "Painting Services", "Plumbing Services", "Electrical Services"],
  },
  {
    id: "sports-fitness",
    name: "Sports & Recreation",
    subcategories: ["Sports Academy", "Cricket Coaching", "Football Academy", "Badminton Court", "Swimming Pool", "Tennis Academy", "Sports Equipment Store", "Fitness Center", "CrossFit Gym", "Boxing Academy", "Martial Arts", "Dance Studio", "Adventure Sports", "Golf Course", "Sports Complex"],
  },
  {
    id: "home-lifestyle",
    name: "Home & Lifestyle",
    subcategories: ["Furniture Store", "Home Decor", "Kitchenware", "Bedding & Linen", "Garden Store", "Pet Shop", "Aquarium Store", "Plants Nursery", "Flower Shop", "Gift Store", "Handicrafts", "Antique Store", "Art Gallery", "Painting Store", "Home Automation"],
  },
  {
    id: "legal-compliance",
    name: "Legal & Compliance",
    subcategories: ["Law Firm", "Notary Services", "Legal Documentation", "Corporate Law", "Criminal Law", "Civil Law", "Property Law", "Tax Law", "Immigration Consultancy", "Patent Services", "Trademark Registration", "Compliance Advisory", "Arbitration Services", "Legal Tech Solutions"],
  },
];

// Tier classification for Indian cities
export const CITY_TIERS = {
  tier1: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune"],
  tier2: ["Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Visakhapatnam", "Bhopal", "Thane", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Rajkot", "Meerut", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh"],
  tier3: ["Guwahati", "Solapur", "Hubli-Dharwad", "Mysore", "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur", "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"],
};

// Tech Hub Cities (for tech-specific sectors)
export const TECH_HUB_CITIES = [
  "Bangalore", "Hyderabad", "Pune", "Gurgaon", "Noida", "Chennai", "Mumbai", "Delhi", "Kolkata", "Ahmedabad", "Chandigarh", "Indore", "Kochi", "Coimbatore", "Jaipur", "Thiruvananthapuram"
];

// Helper to get city tier
export const getCityTier = (cityName: string): 1 | 2 | 3 => {
  if (CITY_TIERS.tier1.includes(cityName)) return 1;
  if (CITY_TIERS.tier2.includes(cityName)) return 2;
  return 3;
};
