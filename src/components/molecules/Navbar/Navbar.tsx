"use client";

/* eslint-disable react/display-name */
import { NavbarItem } from "@/components/client.mod";
import { ItemType } from "@/components/mod";
import { SetterType, store, useHeaderStore, useUserSession } from "@/store/mod";
import { ForwardedRef, forwardRef, useEffect } from "react";

export const Navbar = forwardRef(
  (_, ref: ForwardedRef<HTMLDivElement | null>) => {
    const session = useUserSession((state) => state.session);
    const [items, setItems] = store(useHeaderStore, "items", "setItems") as [
      ItemType[],
      SetterType<ItemType[]>,
    ];

    useEffect(() => {
      if (session) {
        const index = items.findIndex(
          (item) => item.textContent === "Connexion",
        );

        if (index >= 0) {
          items[index] = {
            textContent: "Déconnexion",
            url: "",
            isFormConnexion: true,
          };
          setItems(items);
        }
      }
    }, [session, items, setItems]);

    return (
      <nav ref={ref} className="nav none">
        <svg height="16" width="22" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,16 8,0 22,16" />
        </svg>
        <ul>
          {items.map(({ textContent, url, isFormConnexion }, index) => (
            <NavbarItem
              key={`${textContent}-${index + 1}`}
              textContent={textContent}
              isFormConnexion={isFormConnexion}
              url={url}
            />
          ))}
        </ul>
      </nav>
    );
  },
);
