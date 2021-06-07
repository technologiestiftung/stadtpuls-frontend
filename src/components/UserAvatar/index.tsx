import { FC } from "react";
import BoringAvatar from "boring-avatars";

interface UserAvatarPropType {
  size?: number;
  className?: string;
  username: string;
}

const avatarColors = ["#E40134", "#213A8F", "#3192D0", "#63B9E9", "#FFFFFF"];

export const UserAvatar: FC<UserAvatarPropType> = ({
  size = 24,
  username,
  className,
}) => (
  <span
    className={[
      className,
      "inline-block align-middle rounded-full border border-blue-50",
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ width: size + 1, height: size + 1 }}
  >
    <BoringAvatar
      name={username}
      size={size}
      variant='beam'
      colors={avatarColors}
    />
  </span>
);
