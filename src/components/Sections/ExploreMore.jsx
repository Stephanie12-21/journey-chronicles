"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPinIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { id } from "date-fns/locale";

const places = [
  {
    id: 1,
    name: "Mt. Malinao",
    location: "Malinao, Philippines",
    price: "€ 340",
    image: "/image (1).jpg",
    reviews: 4.5,
  },
  {
    id: 2,
    name: "Statue of Liberty",
    location: "New York, USA",
    price: "€ 340",
    image: "/image (2).jpg",
    reviews: 5,
  },
  {
    id: 3,
    name: "Thousand Island",
    location: "North Vietnam",
    price: "€ 340",
    image: "/image (3).jpg",
    reviews: 4,
  },
  {
    id: 4,
    name: "Basilica Sacre",
    location: "Paris, France",
    price: "€ 340",
    image: "/image (4).jpg",
    reviews: 3.5,
  },
  {
    id: 5,
    name: "Mt. Malinao",
    location: "Malinao, Philippines",
    price: "€ 340",
    image: "/image (1).jpg",
    reviews: 4.5,
  },
  {
    id: 6,
    name: "Statue of Liberty",
    location: "New York, USA",
    price: "€ 340",
    image: "/image (2).jpg",
    reviews: 5,
  },
  {
    id: 7,
    name: "Thousand Island",
    location: "North Vietnam",
    price: "€ 340",
    image: "/image (3).jpg",
    reviews: 4,
  },
  {
    id: 8,
    name: "Basilica Sacre",
    location: "Paris, France",
    price: "€ 340",
    image: "/image (4).jpg",
    reviews: 3.5,
  },
];

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center space-x-1 text-yellow-400 text-xl">
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <span key={`full-${index}`}>&#9733;</span>
        ))}

      {hasHalfStar && <span>&#9734;</span>}

      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            &#9733;
          </span>
        ))}
    </div>
  );
};

export default function ExploreMore() {
  const router = useRouter();
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: (i) => ({
      opacity: 0,
      y: 50,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleReservation = () => {
    router.push("/Reservations");
  };

  const handleCardClick = (place) => {
    router.push(`/Destinations/Info/${place.id}`);
  };

  const handleSeeMore = () => {
    router.push("/Destinations");
  };

  return (
    <section className="py-16 mt-10 px-6">
      <div className="flex  items-center justify-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Notre catalogue</h2>
      </div>
      <div className="md:hidden">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {places.map((place, index) => (
              <CarouselItem key={index}>
                <Card
                  onClick={() => handleCardClick(place)}
                  className="overflow-hidden"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-teal-600 px-3 py-1">
                    <StarRating rating={place.reviews} />
                  </Badge>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1 text-teal-500" />
                      {place.location}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl text-teal-500">
                        {place.price}
                      </span>
                    </div>

                    <Button
                      onClick={handleReservation}
                      className="text-white bg-teal-500 hover:bg-teal-500 hover:text-white"
                    >
                      Réserver maintenant
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-2 mt-4">
            {places.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  current === index ? "bg-teal-500" : "bg-gray-300"
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      <div className="hidden md:flex flex-wrap justify-between gap-6">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-between w-full"
          initial="hidden"
          animate={controls}
        >
          {places.map((place, index) => (
            <motion.div key={index} custom={index} variants={cardVariants}>
              <Card
                onClick={() => handleCardClick(place)}
                key={index}
                className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 transform"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-white/90 text-teal-600 px-3 py-1">
                  <StarRating rating={place.reviews} />
                </Badge>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1 text-teal-500" />
                    {place.location}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-teal-500">
                      {place.price}
                    </span>
                  </div>
                  <Button
                    onClick={handleReservation}
                    className="text-white bg-teal-500 hover:bg-teal-500 hover:text-white"
                  >
                    Réserver maintenant
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Button
            onClick={handleSeeMore}
            className="mt-12 px-8 py-6 bg-gradient-to-r  from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Voir plus de destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
