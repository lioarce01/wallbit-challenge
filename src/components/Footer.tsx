import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center border-t border-neutral-800 mt-6 pt-4">
      <p className="flex items-center space-x-2 font-semibold">
        <span>Made with</span>
        <Heart size={20} className="text-red-600" />
        <span>
          by{" "}
          <a
            href="https://github.com/lioarce01"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-red-400 hover:underline"
          >
            Lio
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
