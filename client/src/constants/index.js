import {
  createParking,
  dashboard,
  profile,
  listEvents,
  email,
  github,
  linkedin,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "add parking",
    imgUrl: createParking,
    link: "/add-parking",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "events",
    imgUrl: listEvents,
    link: "/events",
  },
];

export const socialLinks = [
  {
    id: 1,
    href: "https://www.linkedin.com/in/isacco-bertoli-10aa16252/",
    label: "Linkedin Profile",
    img: linkedin,
  },
  {
    id: 2,
    href: "https://github.com/Isacco-B",
    label: "GitHub Profile",
    img: github,
  },
  {
    id: 3,
    href: "mailto:info@isaccobertoli.com",
    label: "Email",
    img: email,
  },
];
