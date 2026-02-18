import config from "@/config/config.json";
import themeConfig from "@/config/theme.json";
import { markdownify } from "@/lib/utils/textConverter";
import React, { useEffect, useState } from "react";

const { enable, content, expire_days } = config.announcement;
const primaryColor = themeConfig.colors.default.theme_color.primary;

const Cookies = {
  set: (name: string, value: string, options: any = {}) => {
    if (typeof document === "undefined") return;

    const defaults = { path: "/" };
    const opts = { ...defaults, ...options };

    if (typeof opts.expires === "number") {
      opts.expires = new Date(Date.now() + opts.expires * 864e5);
    }
    if (opts.expires instanceof Date) {
      opts.expires = opts.expires.toUTCString();
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (let key in opts) {
      if (!opts[key]) continue;
      cookieString += `; ${key}`;
      if (opts[key] !== true) {
        cookieString += `=${opts[key]}`;
      }
    }

    document.cookie = cookieString;
  },

  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  },

  remove: (name: string, options: any = {}) => {
    Cookies.set(name, "", { ...options, expires: -1 });
  },
};

const Announcement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (enable && content && !Cookies.get("announcement-close")) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    Cookies.set("announcement-close", "true", {
      expires: expire_days,
    });
    setIsVisible(false);
  };

  if (!enable || !content || !isVisible) {
    return null;
  }

  return (
    <div
      className="relative z-999 shadow-md px-4 py-2 md:px-6 md:py-3 pr-10 transition-all duration-300 animate-slideDown"
      style={{
        backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)`,
      }}
    >
      <div className="container flex items-center justify-between gap-3">
        <div className="flex-1">
          <p
            className="text-white text-xs md:text-sm font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: markdownify(content) }}
          />
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl transition-all duration-200 hover:scale-110"
          aria-label="Close announcement"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Announcement;
