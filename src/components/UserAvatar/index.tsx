import { FC } from "react";
import BoringAvatar from "boring-avatars";
import colors from "../../style/colors";

interface UserAvatarPropType {
  size?: number;
  className?: string;
  username: string;
}

const avatarColors = [
  colors.white,
  colors.blue,
  colors.blue,
  colors.blue,
  colors.black,
  colors.green,
  colors.green,
  colors.green,
  colors.purple,
  colors.purple,
  colors.purple,
  ...Object.values(colors.gray),
];

export const UserAvatar: FC<UserAvatarPropType> = ({
  size = 24,
  username,
  className,
}) => (
  <span
    className={[
      className,
      "inline-block align-middle rounded-full border border-gray-50",
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ width: size + 1, height: size + 1 }}
  >
    <BoringAvatar
      name={username}
      size={size}
      variant='pixel'
      colors={avatarColors}
    />
  </span>
);
