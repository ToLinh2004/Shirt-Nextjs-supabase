"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  id: number;
  url: string;
  title: string;
  description: string;
};

const items = [
  {
    id: 1,
    url: "/ao-thun-9.png",
    title: "Áo Thun Đen Graffiti",
    description: "Phong cách đường phố, cá tính và nổi bật.",
  },
  {
    id: 2,
    url: "/ao-thun-7.png",
    title: "Áo Thun Trắng Tối Giản",
    description: "Thiết kế thanh lịch, phù hợp mọi hoàn cảnh.",
  },
  {
    id: 3,
    url: "/ao-thun-8.png",
    title: "Áo Thun Họa Tiết",
    description: "Họa tiết độc đáo, thể hiện chất riêng.",
  },
  {
    id: 4,
    url: "/ao-thun.png",
    title: "Áo Thun Cổ Điển",
    description: "Sự lựa chọn không bao giờ lỗi mốt.",
  },
  {
    id: 5,
    url: "/ao-thun-4.png",
    title: "Áo Thun Thể Thao",
    description: "Thoáng mát, năng động cho ngày dài.",
  },
];

const articleVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

interface GalleryProps {
  items: Item[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

function Gallery({ items, setIndex, index }: GalleryProps) {
  return (
    <div className="w-fit mx-auto flex gap-2 pb-20">
      {items.slice(0, 5).map((item, i) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-xl overflow-hidden ${
            index === i ? "w-[450px]" : "w-[60px]"
          } h-[400px] flex-shrink-0 transition-[width] duration-500 ease-in-out cursor-pointer`}
          onClick={() => setIndex(i)}
          onMouseEnter={() => setIndex(i)}
        >
          <motion.img
            src={item.url}
            alt={item.title}
            className={`w-full h-full object-contain cursor-pointer`}
          />
         
          <AnimatePresence mode="wait">
            {index === i && (
              <motion.article
                variants={articleVariant}
                initial="hidden"
                animate="show"
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/60 to-transparent"
              >
                <motion.h1
                  variants={articleVariant}
                  className="text-2xl font-semibold"
                >
                  {item.title}
                </motion.h1>
                <motion.p variants={articleVariant} className="text-sm">
                  {item.description}
                </motion.p>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function BannerMotion() {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative px-4">
      <Gallery items={items} index={index} setIndex={setIndex} />
    </div>
  );
}
