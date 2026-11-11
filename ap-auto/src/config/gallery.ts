export type GalleryPhoto = {
  src: string;
  title: string;
  alt: string;
  caption: string;
  category: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery/workshop-floor.webp",
    title: "A view across the workshop floor",
    alt: "Workshop interior with a worker beside equipment and a material trolley.",
    caption: "A view through the workshop entrance toward the work area.",
    category: "Infrastructure",
  },
  {
    src: "/images/gallery/machining-work.webp",
    title: "At work in the workshop",
    alt: "Worker at machinery in a workshop, viewed through a red metal frame.",
    caption: "An operator at work among the workshop machinery.",
    category: "Manufacturing Activities",
  },
];
