export const siteConfig = {
  name: "Never Ending Captures",
  whatsappNumber: "918179545985",
  phone: "+91 81795 45985",
  whatsappMessage:
    "Hi Never Ending Captures! I would like to enquire about a photography / film project.",
  instagramUrl: "https://instagram.com/neverendingcaptures",
  email: "neverendingcaptures@gmail.com",
  location: "Hyderabad, Telangana",
} as const;

export const imagePath = (filename: string) => `/images/${filename}`;
