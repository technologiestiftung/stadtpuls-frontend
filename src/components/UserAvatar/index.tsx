import { FC } from "react";
import colors from "../../style/colors";

interface UserAvatarPropType {
  size?: number;
  className?: string;
  username: string;
  colors?: string[];
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
].map(c => c.replace("#", ""));

export const UserAvatar: FC<UserAvatarPropType> = ({
  size = 24,
  username,
  className,
  colors = avatarColors,
}) => {
  const colorsString = colors.join(",");
  return (
    <span
      className={[
        className,
        "inline-block align-middle rounded-full border border-gray-50",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: size + 1, height: size + 1 }}
      role='img'
    >
      <img
        src={`https://source.boringavatars.com/pixel/${size}/${encodeURIComponent(
          username
        )}?colors=${colorsString}`}
        width={size}
        height={size}
        alt={`Avatar of ${username}`}
      />
    </span>
  );
};
