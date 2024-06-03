import { useState } from "react";
import { ChatCircle, Heart, ShareFat } from "@phosphor-icons/react";
import cs from "classnames";

type PostInteractionButtonProps = {
  id: string;
};

export const PostInteractionButtonAtom = ({
                                            id
                                          }: PostInteractionButtonProps) => {
  const icons = [Heart, ChatCircle, ShareFat];
  const [iconState, toggleIconState] = useState<boolean[]>([
    false,
    false,
    false
  ]);

  const likeButtonHandler = (id: string, state: boolean) => {
    console.log("likeButtonHandler", id);
  };
  const commentButtonHandler = (id: string, state: boolean) => {
    console.log("commentButtonHandler", id);
  };
  const shareButtonHandler = (id: string, state: boolean) => {
    console.log("shareButtonHandler", id);
  };

  const buttonToggleHandlers = (index: number) => {
    toggleIconState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });

    switch (index) {
      case 0:
        likeButtonHandler(id, iconState[index] || false);
        break;
      case 1:
        commentButtonHandler(id, iconState[index] || false);
        break;
      case 2:
        shareButtonHandler(id, iconState[index] || false);
        break;
    }
  };

  return (
    <div className="flex cursor-pointer gap-2 px-2 py-4">
      {icons.map((icon, index) => {
        const Icon = icon;
        return (
          <div
            key={index}
            onClick={() => {
              buttonToggleHandlers(index);
            }}
            className={cs(
              "rounded-full bg-white/20 p-1",
              "group hover:bg-white",
              {
                "bg-white/80": iconState[index]
              },
              "transition-all duration-300 ease-in-out"
            )}>
            <Icon
              size={20}
              weight={iconState[index] ? "fill" : "regular"}
              className={cs(
                {
                  "group-hover:text-red-500": index === 0,
                  "group-hover:text-gray-600": index !== 0
                },
                {
                  "text-red-500": iconState[index] && index === 0,
                  "text-gray-600": iconState[index] && index !== 0
                },
                "transition-all duration-300 ease-in-out"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
